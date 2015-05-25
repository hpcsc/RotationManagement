using RotationManagement.Models;
using System.Data.Entity;

namespace RotationManagement.Data
{
    public class RotationDbContext : DbContext
    {
        static RotationDbContext()
        {
            Database.SetInitializer<RotationDbContext>(null);
        }

        public RotationDbContext()
            : base("RotationMgmtConnection")
        {
            base.Configuration.LazyLoadingEnabled = false;
        }

        public DbSet<Rotation> Rotations { get; set; }
        public DbSet<Resident> Residents { get; set; }
        public DbSet<Assignment> Assignments { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new RotationMap());
            modelBuilder.Configurations.Add(new ResidentMap());
            modelBuilder.Configurations.Add(new AssignmentMap());
        }
    }
}
