using API.Persistence;
using timers = System.Timers;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public class WoodsSearchService
    {
        private DataContext _dataContext;
        private timers.Timer _timer;
        private MaterialService _materialService;

        public WoodsSearchService(DataContext dataContext, MaterialService materialService)
        {
            _dataContext = dataContext;
            _timer = new timers.Timer(20000);
            _timer.Elapsed += OnTimedEvent;
            _timer.AutoReset = true;
            _timer.Enabled = true;
            _materialService = materialService;
        }

        private void OnTimedEvent(Object source, timers.ElapsedEventArgs e)
        {
            var now = DateTime.Now;
            foreach(AppUser user in 
                    _dataContext.Users.Include(user => user.PlayerData)
                                      .Include(user => user.PlayerData.Materials)
                                      .Include(user => user.PlayerData.LastWoodsSearchMaterials))
            {
                if (user.PlayerData.IsSearchingWoods)
                {
                    var timeSpan = now - user.PlayerData.LastWoodsSearch;
                    if (timeSpan.TotalMinutes >= 10)
                    {
                        user.PlayerData.IsSearchingWoods = false;
                        var woodsSearchMaterials = _materialService.GenerateMaterialData(10);
                        user.PlayerData.Materials.AddMaterials(woodsSearchMaterials);
                        user.PlayerData.Money += new Random().Next(10);
                        user.PlayerData.LastWoodsSearchMaterials = woodsSearchMaterials;
                    }
                }
            }

            _dataContext.SaveChanges();
        }

    }
}