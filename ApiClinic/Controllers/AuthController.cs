using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ApiClinic.Models;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using ApiClinic.Data;
using System.Linq;
using Microsoft.AspNetCore.Authorization;

namespace ApiClinic.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        private readonly IConfiguration _configuration;

        private readonly ApiClinicContext _context;


        public AuthController(IConfiguration configuration, ApiClinicContext context)
        {
            _configuration = configuration;
            _context = context;
        }

        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(UserDto request)
        {
            Console.WriteLine("registering");

            var doesExist = _context.User.Where(u => u.EmailAddress == request.EmailAddress).FirstOrDefault();
            if (doesExist != null) {
                return BadRequest("This user exists");
            }

            if (request.EmailAddress == "" || request.Password.Length < 4)
            {
                return BadRequest("Missing data");
            }

            string passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);


            User newUser = new User();
            newUser.EmailAddress = request.EmailAddress;
            newUser.PasswordHash = passwordHash;
            // newUser.UserRole = "admin";
            newUser.UserRole = "unactivated";
            newUser.FullName = request.FullName;
            // newUser.IsActivated = true;
            newUser.IsActivated = false; 

            _context.User.Add(newUser);
            await _context.SaveChangesAsync();

            return Ok(request);
        }

        [HttpPost("registerDoctor")]
        public async Task<ActionResult<Doctor>> registerDoctor(DoctorUserDto request)
        {
            Console.WriteLine("registering doctor");

            var doesExist = _context.User.Where(u => u.EmailAddress == request.EmailAddress).FirstOrDefault();
            if (doesExist != null)
            {
                return BadRequest("This user exists");
            }

            if (request.EmailAddress == "" || request.Password.Length < 4 || request.FullName == "" || request.Specialization == "")
            {
                return BadRequest("Missing data");
            }

            string passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);


            User newUser = new User();
            newUser.EmailAddress = request.EmailAddress;
            newUser.PasswordHash = passwordHash;
            newUser.UserRole = "doctor";
            newUser.FullName = request.FullName;
            newUser.IsActivated = true;

            _context.User.Add(newUser);

            Doctor doctor = new Doctor();
            doctor.FullName = request.FullName;
            doctor.Specialization = request.Specialization;
            doctor.UserId = newUser.Id.ToString();

            _context.Doctor.Add(doctor);

            await _context.SaveChangesAsync();

            return Ok(request);
        }

        [HttpPut("activate/{id}")]
        [Authorize(Roles="admin")]
        public async Task<IActionResult> ActivateUser(Guid id)
        {
            var user = await _context.User.FindAsync(id);

            if (user == null) { return BadRequest(); }
            
            if (user.IsActivated) { return BadRequest(); }

            user.IsActivated = true;
            user.UserRole = "patient";

            Patient patient = new Patient();
            patient.UserId = user.Id.ToString();
            patient.FullName = user.FullName;
            _context.Patient.Add(patient);
   
            _context.SaveChanges();

            return Ok("Activated");
        }

        [HttpPost("login")]
        public ActionResult<User> Login(LoginDto request)
        {

            var user = _context.User.FirstOrDefault(u => u.EmailAddress == request.EmailAddress);

            if (user == null)
            {
                // searching in the database
                return BadRequest("User not found");
            }

            if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            {
                return BadRequest("Wrong password.");
            }

            string token = CreateToken(user, user.UserRole);

            var loginResponse = new LoginResponse()
            {
                Role = user.UserRole,
                IsActivated = user.IsActivated,
                Token = token
            };

            return Ok(loginResponse);
        }

        private string CreateToken(User user, string role) // roles: admin, unactivated, patient, doctor
        {
            List<Claim> claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Email, user.EmailAddress),
                new Claim(ClaimTypes.Role, role),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value!));
        
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

            var token = new JwtSecurityToken(
                    claims: claims,
                    expires: DateTime.Now.AddHours(1),
                    signingCredentials: cred
                );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }
    }

}
