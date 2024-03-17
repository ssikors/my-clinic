namespace ApiClinic.Models
{
    public class DoctorUserDto
    {
        public required string EmailAddress { get; set; }
        public required string Password { get; set; }
        public required string FullName { get; set; }
        public required string Specialization { get; set;}
    }
}
