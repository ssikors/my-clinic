using System.ComponentModel.DataAnnotations;

namespace ApiClinic.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public bool IsActivated { get; set; } = false;
        public string UserRole { get; set; } = string.Empty;
        public string FullName { get; set; }= string.Empty;

        [EmailAddress]
        [Required]
        public string EmailAddress { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
    }
}
