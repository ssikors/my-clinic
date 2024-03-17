using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ApiClinic.Data;
using ApiClinic.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace ApiClinic.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "admin, doctor")]
    public class DoctorsController : ControllerBase
    {
        private readonly ApiClinicContext _context;

        public DoctorsController(ApiClinicContext context)
        {
            _context = context;
        }

        // GET: api/Doctors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Doctor>>> GetDoctor()
        {
            return await _context.Doctor.ToListAsync();
        }

        // GET: api/Doctors/5
        [HttpGet("{email}")]
        public async Task<ActionResult<Doctor>> GetDoctor(string email)
        {
            var mailClaim = User?.Claims.Where(c => c.Type == ClaimTypes.Email).First();
            if (mailClaim == null || mailClaim.Value != email)
            {
                return Unauthorized();
            }

            var user = _context.User.FirstOrDefault(u => u.EmailAddress == email);

            if (user == null)
            {
                return NotFound();
            }

            var doctor = await _context.Doctor.Include(d => d.Visits)!.ThenInclude(v => v.Patient).FirstOrDefaultAsync(d => d.UserId == user.Id.ToString()) ;

            if (doctor == null)
            {
                return NotFound();
            }

            return doctor;
        }

        // GET: api/Doctors/5
        [HttpGet("byUser/{userId}")]
        public async Task<ActionResult<Doctor>> GetUserDoctor(Guid userId)
        {
            var user = await _context.User.FindAsync(userId);

            if (user == null) {
                return NotFound("User not found");
            }

            var doctor = await _context.Doctor.Where(d => d.UserId == user.Id.ToString()).Include(d => d.Visits).FirstOrDefaultAsync();

            if (doctor == null)
            {
                return NotFound("Doctor not found");
            }

            return doctor;
        }

        // PUT: api/Doctors/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDoctor(Guid id, Doctor doctor)
        {
            if (id != doctor.Id)
            {
                return BadRequest();
            }

            _context.Entry(doctor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DoctorExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Doctors
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Doctor>> PostDoctor(Doctor doctor)
        {
            _context.Doctor.Add(doctor);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDoctor", new { id = doctor.Id }, doctor);
        }

        // DELETE: api/Doctors/5
        [Authorize(Roles = "admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDoctor(Guid id)
        {
            var user = await _context.User.FindAsync(id);
            if (user == null)
            {
                return NotFound("user");
            }

            var  doctor = _context.Doctor.FirstOrDefault(x => x.UserId == id.ToString());

            if (doctor == null)
            {
                return NotFound("doc");
            }

            _context.Doctor.Remove(doctor);
            var visits = _context.Visit.Include(v => v.Doctor).Where(v => v.Doctor == doctor);
            _context.Visit.RemoveRange(visits);
            _context.User.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DoctorExists(Guid id)
        {
            return _context.Doctor.Any(e => e.Id == id);
        }
    }
}
