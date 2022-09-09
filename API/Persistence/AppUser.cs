using Microsoft.AspNetCore.Identity;

namespace API.Persistence
{
    public class AppUser : IdentityUser
    {
        public PlayerData PlayerData { get; set; }
    }
}