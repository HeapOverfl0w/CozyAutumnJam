using API.Persistence;
using timers = System.Timers;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public class WoodsSearchService
    {
        private timers.Timer _timer;
        private MaterialService _materialService;
        private DbContextOptions _dbContextOptions;

        public WoodsSearchService(DbContextOptions dbContextOptions,  MaterialService materialService)
        {
            _dbContextOptions = dbContextOptions;
            _timer = new timers.Timer(20000);
            _timer.Elapsed += OnTimedEvent;
            _timer.AutoReset = true;
            _timer.Enabled = true;
            _materialService = materialService;
        }

        private void OnTimedEvent(Object source, timers.ElapsedEventArgs e)
        {
            var now = DateTime.Now;
            DataContext dataContext = new DataContext(_dbContextOptions);
            foreach(AppUser user in 
                    dataContext.Users.Include(user => user.PlayerData))
            {
                if (user.PlayerData.IsSearchingWoods)
                {
                    var timeSpan = now - user.PlayerData.LastWoodsSearch;
                    if (timeSpan.TotalMinutes >= 10)
                    {
                        var userData = dataContext.Users
                            .Include(user => user.PlayerData)
                            .Include(user => user.PlayerData.Materials)
                            .Include(user => user.PlayerData.LastWoodsSearchMaterials)
                            .First(u => u.UserName == user.UserName);
                        userData.PlayerData.IsSearchingWoods = false;
                        var woodsSearchMaterials = _materialService.GenerateMaterialData(10);
                        userData.PlayerData.Materials.AddMaterials(woodsSearchMaterials);
                        userData.PlayerData.Money += new Random().Next(10);
                        userData.PlayerData.LastWoodsSearchMaterials = woodsSearchMaterials;
                        dataContext.SaveChanges();
                    }
                }
            }
        }

    }
}