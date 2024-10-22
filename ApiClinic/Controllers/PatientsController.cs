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
    [Authorize(Roles = "admin, patient")]
    public class PatientsController : ControllerBase
    {
        private readonly ApiClinicContext _context;

        public PatientsController(ApiClinicContext context)
        {
            _context = context;
        }

        // GET: api/Patients
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Patient>>> GetPatient()
        {
            return await _context.Patient.ToListAsync();
        }

        // GET: api/Patients/5
        [HttpGet("{email}"), Authorize]
        public async Task<ActionResult<Patient>> GetPatient(string email)
        {

            var mailClaim = User?.Claims.Where(c => c.Type == ClaimTypes.Email).First();

            if (mailClaim == null)
            {
                return Unauthorized();
            }

            if (mailClaim.Value == email)
            {
                var user = await _context.User.Where(u => u.EmailAddress == email).FirstOrDefaultAsync();
                if (user == null)
                {
                    return NotFound(email);
                }
                var patient = await _context.Patient.Where(p => p.UserId == user.Id.ToString()).Include(p => p.Visits)!.ThenInclude(v => v.Doctor).FirstOrDefaultAsync();
                if (patient == null)
                {
                    return NotFound();
                }
                return patient;
            } else
            {
                return Unauthorized();
            }

        }

        // PUT: api/Patients/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPatient(Guid id, Patient patient)
        {
            if (id != patient.Id)
            {
                return BadRequest();
            }

            _context.Entry(patient).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PatientExists(id))
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

        // POST: api/Patients
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Patient>> PostPatient(Patient patient)
        {
            _context.Patient.Add(patient);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPatient", new { id = patient.Id }, patient);
        }

        // DELETE: api/Patients/5
        [Authorize(Roles = "admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePatient(Guid id)
        {

            var user = await _context.User.FindAsync(id);
            if (user == null)
            {
                return NotFound("user");
            }

            var patient = _context.Patient.FirstOrDefault(x => x.UserId == id.ToString());
            if (patient == null)
            {
                return NotFound();
            }

            _context.Patient.Remove(patient);
            _context.User.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PatientExists(Guid id)
        {
            return _context.Patient.Any(e => e.Id == id);
        }
    }
}
