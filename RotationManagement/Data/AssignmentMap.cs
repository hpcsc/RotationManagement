using RotationManagement.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace RotationManagement.Data
{
    public class AssignmentMap : EntityTypeConfiguration<Assignment>
    {
        public AssignmentMap()
        {
            Property(c => c.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            HasRequired(c => c.Resident).WithMany().HasForeignKey(c => c.ResidentId);
            HasRequired(c => c.Rotation).WithMany().HasForeignKey(c => c.RotationId);
        }
    }
}
