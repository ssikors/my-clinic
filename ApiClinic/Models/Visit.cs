using System.ComponentModel.DataAnnotations;

namespace ApiClinic.Models
{
    public class Visit
    {
        [Required]
        public Guid Id { get; set; }

        [Required]
        [DataType(DataType.Date)]
        public DateTime VisitDate { get; set; }

        [Required]
        [DataType(DataType.Time)]
        public TimeSpan StartTime { get; set; }

        [Required]
        [Display(Name = "End Time")]
        [DataType(DataType.Time)]
        public TimeSpan EndTime { get; set; }

        [Required]
        public Doctor? Doctor { get; set; } = null;


        [StringLength(512)]
        public string? Description { get; set; }

        public Patient? Patient { get; set; }

        

        //[Timestamp]
        //public byte[] RowVersion { get; set; }

    }
}
