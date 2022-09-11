using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using API.Persistence;
using API.DTOs;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Runtime;
using System;

namespace API.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class GameController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly DataContext _dataContext;

        public GameController(UserManager<AppUser> userManager, DataContext dataContext)
        {
            _userManager = userManager;
            _dataContext = dataContext;
        }

        [Authorize]
        [HttpGet("data")]
        public async Task<ActionResult<UserDtoNoToken>> GetPlayerData([FromQuery]string userName = null)
        {
            //If no user name passed in then just use our current user.
            if (userName == null) {
                userName = User.FindFirstValue(ClaimTypes.Name);
            }
            
            var user = await _dataContext.Users
            .Include(user => user.PlayerData)
            .Include(user => user.PlayerData.Materials)
            .Include(user => user.PlayerData.LastWoodsSearchMaterials)
            .FirstOrDefaultAsync(user => user.UserName == userName);

            if (user == null) return Unauthorized();

            var userId = new Guid(user.Id);
            var crafts = await _dataContext.Crafts.Where(craft => craft.Owner == userId).ToListAsync();

            return Ok(new UserDtoNoToken
            {
                PlayerData = user.PlayerData,
                UserName = user.UserName,
                Crafts = crafts
            });
        }

        [Authorize]
        [HttpGet("buylist")]
        public async Task<ActionResult<IList<Craft>>> GetCraftBuyList([FromQuery]int page = 0)
        {
            var crafts = await _dataContext.Crafts.Where((craft) => craft.IsForSale).Skip(page * 10).Take(10).ToListAsync();

            return Ok(crafts);
        }

        [Authorize]
        [HttpPut("buy")]
        public async Task<ActionResult<Craft>> BuyCraft([FromQuery]Guid craft)
        {
            var userName = User.FindFirstValue(ClaimTypes.Name);
            var user = await _dataContext.Users
            .Include(user => user.PlayerData)
            .FirstOrDefaultAsync(user => user.UserName == userName);
            var craftItem = await _dataContext.Crafts.FirstAsync((item) => item.Id == craft);

            if (!craftItem.IsForSale)
            {
                return BadRequest("Craft is not for sale.");
            }

            if (user.PlayerData.Money < craftItem.Price)
            {
                return BadRequest("Not enough money.");
            }

            user.PlayerData.Money -= craftItem.Price;
            craftItem.Owner = user.PlayerData.Id;

            _dataContext.SaveChanges();

            return Ok(craft);
        }

        [Authorize]
        [HttpPut("toggleForSell")]
        public async Task<ActionResult> ToggleCraftForSale([FromQuery]Guid craft, [FromQuery]int price = 0)
        {
            var userName = User.FindFirstValue(ClaimTypes.Name);
            var user = await _dataContext.Users
            .Include(user => user.PlayerData)
            .FirstOrDefaultAsync(user => user.UserName == userName);
            var craftItem = await _dataContext.Crafts.FirstAsync((item) => item.Id == craft);

            if (user.PlayerData.Id != craftItem.Owner)
            {
                return Unauthorized();
            }

            craftItem.IsForSale = price > 0;
            craftItem.Price = price;

            _dataContext.SaveChanges();

            return Ok();
        }

        [Authorize]
        [HttpPut("delete")]
        public async Task<ActionResult> DeleteCraft([FromQuery]Guid craft)
        {
            var userName = User.FindFirstValue(ClaimTypes.Name);
            var user = await _dataContext.Users
            .Include(user => user.PlayerData)
            .FirstOrDefaultAsync(user => user.UserName == userName);
            var craftItem = await _dataContext.Crafts.FirstAsync((item) => item.Id == craft);

            if (user.PlayerData.Id != craftItem.Owner)
            {
                return Unauthorized();
            }

            _dataContext.Crafts.Remove(craftItem);

            _dataContext.SaveChanges();

            return Ok();
        }

        [Authorize]
        [HttpPut("place")]
        public async Task<ActionResult> PlaceCraft([FromQuery]Guid item, [FromQuery]int x, [FromQuery]int y)
        {
            var userName = User.FindFirstValue(ClaimTypes.Name);
            var user = await _dataContext.Users
            .Include(user => user.PlayerData)
            .FirstOrDefaultAsync(user => user.UserName == userName);
            var craft = await _dataContext.Crafts.FirstAsync((craft) => craft.Id == item);

            if (user.PlayerData.Id != craft.Owner)
            {
                return Unauthorized("You do not own that craft.");
            }

            craft.PlacedX = x;
            craft.PlacedY = y;

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [Authorize]
        [HttpPost("craft")]
        public async Task<ActionResult<Craft>> CreateCraft([FromBody]CraftDto craftDto)
        {
            var userName = User.FindFirstValue(ClaimTypes.Name);
            var user = await _dataContext.Users
            .Include(user => user.PlayerData)
            .Include(user => user.PlayerData.Materials)
            .Include(user => user.PlayerData.LastWoodsSearchMaterials)
            .FirstOrDefaultAsync(user => user.UserName == userName);
            var craftCount = _dataContext.Crafts.Where((craft) => craft.Owner == new Guid(user.Id)).Count();

            if (craftCount >= 30)
            {
                return BadRequest("You own 30 or more crafts. Delete some to get more space.");
            }

            if (!user.PlayerData.Materials.VerifyMaterialRemoval(craftDto.Materials))
            {
                return BadRequest("Not enough materials");
            }

            var craft = new Craft()
            {
                Name = craftDto.Name,
                PlacedX = -1,
                PlacedY = -1,
                Price = 0,
                IsForSale = false,
                Creator = user.UserName,
                Owner = new Guid(user.Id),
                Id = Guid.NewGuid(),
                Data = craftDto.Data
            };

            user.PlayerData.Materials.RemoveMaterials(craftDto.Materials);

            await _dataContext.Crafts.AddAsync(craft);
            _dataContext.SaveChanges();

            return Ok(craft);
        }

        [Authorize]
        [HttpPut("search")]
        public async Task<ActionResult> SearchWoods()
        {
            var userName = User.FindFirstValue(ClaimTypes.Name);
            var user = await _dataContext.Users
            .Include(user => user.PlayerData)
            .FirstOrDefaultAsync(user => user.UserName == userName);

            if (!user.PlayerData.IsSearchingWoods) 
            {
                user.PlayerData.IsSearchingWoods = true;
                user.PlayerData.LastWoodsSearch = DateTime.Now;

                _dataContext.SaveChanges();
                return Ok();
            } 
            else 
            {
                return BadRequest("Already searching...");
            }
        }
    }
}