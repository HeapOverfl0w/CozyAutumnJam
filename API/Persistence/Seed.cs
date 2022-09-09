using Microsoft.AspNetCore.Identity;
using API.Services;

namespace API.Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager, MaterialService materialService)
        {
            if (!userManager.Users.Any())
            {
                var defaultPlayerData1 = new PlayerData()
                {
                    Id = Guid.NewGuid(),
                    Materials = materialService.GenerateMaterialData(20),
                    Money = 0
                };
                var defaultPlayerData2 = new PlayerData()
                {
                    Id = Guid.NewGuid(),
                    Materials = materialService.GenerateMaterialData(20),
                    Money = 0
                };
                var defaultPlayerData3 = new PlayerData()
                {
                    Id = Guid.NewGuid(),
                    Materials = materialService.GenerateMaterialData(20),
                    Money = 0
                };

                var users = new List<AppUser>
                {
                    new AppUser{UserName = "Bob", PlayerData = defaultPlayerData1},
                    new AppUser{UserName = "Tom", PlayerData = defaultPlayerData2},
                    new AppUser{UserName = "Jane", PlayerData = defaultPlayerData3}
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "password");
                }
            }

            await context.SaveChangesAsync();
        }
    }
}