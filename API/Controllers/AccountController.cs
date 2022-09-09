using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using API.Persistence;
using API.DTOs;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace API.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly TokenService _tokenService;
        private readonly MaterialService _materialService;
        private readonly DataContext _dataContext;

        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, 
        TokenService tokenService, DataContext dataContext, MaterialService materialService)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _tokenService = tokenService;
            _dataContext = dataContext;
            _materialService = materialService;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _dataContext.Users
            .Include(user => user.PlayerData)
            .Include(user => user.PlayerData.Materials)
            .Include(user => user.PlayerData.LastWoodsSearchMaterials)
            .FirstOrDefaultAsync(user => user.UserName == loginDto.Username);

            if (user == null) return Unauthorized();

            var userId = new Guid(user.Id);
            var crafts = await _dataContext.Crafts.Where(craft => craft.Owner == userId).ToListAsync();

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (result.Succeeded)
            {
                return new UserDto
                {
                    PlayerData = user.PlayerData,
                    Token = _tokenService.CreateToken(user),
                    UserName = user.UserName,
                    Crafts = crafts
                };
            }

            return Unauthorized();
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await _userManager.Users.AnyAsync(u => u.UserName == registerDto.Username))
            {
                ModelState.AddModelError("error", "Username Taken");
                return ValidationProblem();
            }
            if (registerDto.Password.Length < 6)
            {
                ModelState.AddModelError("error", "Password Too Short");
                return ValidationProblem();
            }

            var user = new AppUser
            {
                UserName = registerDto.Username,
                PlayerData = new PlayerData()
                {
                    Id = Guid.NewGuid(),
                    Materials = _materialService.GenerateMaterialData(20),
                    Money = 10
                }
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (result.Succeeded)
            {
                return new UserDto
                {
                    PlayerData = user.PlayerData,
                    Token = _tokenService.CreateToken(user),
                    UserName = user.UserName
                };
            }

            return BadRequest("Problem registering user.");
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var userName = User.FindFirstValue(ClaimTypes.Name);
            var user = await _dataContext.Users
            .Include(user => user.PlayerData)
            .Include(user => user.PlayerData.Materials)
            .Include(user => user.PlayerData.LastWoodsSearchMaterials)
            .FirstOrDefaultAsync(user => user.UserName == userName);

            if (user == null) return Unauthorized();

            var userId = new Guid(user.Id);
            var crafts = await _dataContext.Crafts.Where(craft => craft.Owner == userId).ToListAsync();

            return new UserDto
            {
                PlayerData = user.PlayerData,
                Token = _tokenService.CreateToken(user),
                UserName = user.UserName,
                Crafts = crafts
            };
        }
    }
}