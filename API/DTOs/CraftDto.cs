using API.Persistence;

namespace API.DTOs
{
    public class CraftDto
    {
        public string Name { get; set; }
        public string Data { get; set; }
        public MaterialData Materials { get; set; }
    }
}