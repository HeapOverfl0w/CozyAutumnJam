namespace API.Persistence
{
    public class Craft
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public Guid Owner { get; set; }

        public string Creator { get; set; }

        public int PlacedX { get; set; }

        public int PlacedY { get; set; }

        public bool IsForSale { get; set; }

        public int Price { get; set; }

        public string Data { get; set; }
    }
}