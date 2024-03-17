namespace ApiClinic.Models
{
    public class UserDto
    {
        public required string EmailAddress { get; set; }
        public required string Password { get; set; }
        public required string FullName { get; set; }
        public string Role {  get; set; }
        public string IsActivated { get; set; }
    }
}
