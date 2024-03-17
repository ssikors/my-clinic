using ApiClinic.Data;
using ApiClinic.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace ApiClinic.Controllers
{

    public class VisitCreateDto
    {
        public DateTime VisitDate { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public string? DoctorUserId { get; set; }
    }


    public class DescriptionRequest
    {
        public string description { get; set; }
        public Guid id { get; set; }
    }
    public class VisitRequest
    {
        public string email { get; set; }
        public Guid visitId { get; set; }
    }

    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "admin, patient, doctor")]
    public class VisitsController : ControllerBase
    {
        private readonly ApiClinicContext _context;

        public VisitsController(ApiClinicContext context)
        {
            _context = context;
        }

        [HttpPost("appoint")]
        public async Task<ActionResult<IEnumerable<Visit>>> AppointVisit(VisitRequest request)
        {
            if (request.email == null)
            {
                return NotFound();
            }
            var user = await _context.User.Where(u => u.EmailAddress == request.email).FirstOrDefaultAsync();
            if (user == null)
            {
                return Unauthorized();
            }

            var visit = await _context.Visit.Where(v => v.Id == request.visitId).Include(v => v.Patient).Include(v => v.Doctor).FirstOrDefaultAsync();

            if (visit == null)
            {
                return NotFound();
            }

            if (visit.Patient == null)
            {
                var patient = await _context.Patient.Where(p => p.UserId == user.Id.ToString()).FirstOrDefaultAsync();
                if (patient == null)
                {
                    return NotFound();
                }

                visit.Patient = patient;
                await _context.SaveChangesAsync();

                return Ok(visit);
            }

            if (Guid.Parse(visit.Patient.UserId) == user.Id)
            {
                return BadRequest(visit);
            }
            return NotFound();

        }

        [HttpPost("byEmail")]
        public async Task<ActionResult<IEnumerable<Visit>>> GetVisitWithEmail(VisitRequest request)
        {
            if (request.email == null)
            {
                return NotFound();
            }
            var user = await _context.User.Where(u => u.EmailAddress == request.email).FirstOrDefaultAsync();
            if (user == null)
            {
                return Unauthorized();
            }

            var visit = await _context.Visit.Where(v => v.Id == request.visitId).Include(v=>v.Patient).Include(v=> v.Doctor).FirstOrDefaultAsync();
            
            if (visit == null) {
                return NotFound();
            }

            if (visit.Patient == null)
            {
                return Ok(visit);
            }

            if (Guid.Parse(visit.Patient.UserId) == user.Id)
            {
                return Ok(visit);
            }
            return NotFound();

        }

        [HttpPost("Description")]
        [Authorize(Roles="doctor")]
        public async Task<ActionResult<Visit>> PostDescription(DescriptionRequest req)
        {
            var visit = await _context.Visit.Include(v => v.Doctor).Include(v => v.Patient).FirstOrDefaultAsync( v=> v.Id == req.id);
            if (visit == null)
            {
                return NotFound();
            } else
            {
                visit.Description = req.description;
                await _context.SaveChangesAsync();
                return visit;
            }
        }

        [HttpGet("Visit")]
        public async Task<ActionResult<Visit>> GetVisit(Guid visitId, string email)
        {
            var visit = await _context.Visit.Include(v => v.Doctor).Include(v=>v.Patient).FirstOrDefaultAsync(v => v.Id == visitId);

            if (visit == null)
            {
                return NotFound(visit);
            }

            if (visit.Patient == null)
            {
                return visit;
            } else
            {
                var mailClaim = User?.Claims.Where(c => c.Type == ClaimTypes.Email).First();

                if (mailClaim == null)
                {
                    return Unauthorized();
                } 

                var patientUser = await _context.User.Where(u => u.Id == Guid.Parse(visit.Patient.UserId)).FirstOrDefaultAsync();

                

                var doctorUser = await _context.User.Where(u => u.Id == Guid.Parse(visit.Doctor!.UserId)).FirstOrDefaultAsync();

                if (doctorUser == null)
                {
                    return NotFound("Doctor not found");
                }

                if (mailClaim.Value == doctorUser.EmailAddress | mailClaim.Value == patientUser.EmailAddress )
                {
                    return visit;
                } else
                {
                    return Unauthorized();
                }
            }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Visit>>> GetVisits()
        {
            return await _context.Visit.Where(v => v.VisitDate >= DateTime.Now && v.Patient == null).Include(v => v.Doctor).ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Visit>> PostVisit(VisitCreateDto visitDto)
        {
            var doctor = _context.Doctor.Where(d => d.UserId == visitDto.DoctorUserId!).FirstOrDefault();

            if (doctor == null)
            {
                return NotFound();
            }

            var startTime = TimeSpan.Parse(visitDto.StartTime);
            var endTime = TimeSpan.Parse(visitDto.EndTime);

            if (startTime > endTime)
            {
                return BadRequest();
            }

            while (startTime < endTime)
            {
                Visit visit = new Visit();
                visit.VisitDate = visitDto.VisitDate;
                visit.StartTime = startTime;
                visit.EndTime = startTime + TimeSpan.FromMinutes(15);
                visit.Doctor = doctor;

                _context.Visit.Add(visit);

                startTime += TimeSpan.FromMinutes(15);
                Console.WriteLine(startTime.ToString());
            }
            
            await _context.SaveChangesAsync();

            return CreatedAtAction("PostVisit", "Created");
        }
    }
}
