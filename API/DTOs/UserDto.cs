using API.Persistence;

namespace API.DTOs
{
    public class UserDto
    {
        public string Token { get; set; }
        public string UserName { get; set; }
        public PlayerData PlayerData { get; set; }
        public List<Craft> Crafts { get; set; }
    }

    public class UserDtoNoToken
    {
        public string UserName { get; set; }
        public PlayerData PlayerData { get; set; }
        public List<Craft> Crafts { get; set; }
    }
}