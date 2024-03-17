namespace ApiClinic.Models
{
    public class Patient
    {
        public Guid Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string UserId { get; set; } = string.Empty;
        public virtual ICollection<Visit>? Visits { get; set; }
    }

}
