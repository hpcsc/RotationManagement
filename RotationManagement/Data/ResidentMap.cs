using RotationManagement.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace RotationManagement.Data
{
    public class ResidentMap : EntityTypeConfiguration<Resident>
    {
        public ResidentMap()
        {
            Property(c => c.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
        }
    }
}
