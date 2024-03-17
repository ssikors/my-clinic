using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ApiClinic.Models;

namespace ApiClinic.Data
{
    public class ApiClinicContext : DbContext
    {
        public ApiClinicContext (DbContextOptions<ApiClinicContext> options)
            : base(options)
        {
        }

        public DbSet<ApiClinic.Models.User> User { get; set; } = default!;
        public DbSet<ApiClinic.Models.Patient> Patient { get; set; } = default!;
        public DbSet<ApiClinic.Models.Doctor> Doctor { get; set; } = default!;

        public DbSet<ApiClinic.Models.Visit> Visit { get; set; } = default!;
    }
}
