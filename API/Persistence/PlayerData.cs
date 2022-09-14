namespace API.Persistence
{
    public class PlayerData
    {
        public Guid Id { get; set; }
        public int Money { get; set; }
        public MaterialData Materials { get; set; }
        public DateTime LastWoodsSearch { get; set; }
        public bool IsSearchingWoods { get; set; }
    }
}