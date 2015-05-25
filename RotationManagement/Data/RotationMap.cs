using RotationManagement.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace RotationManagement.Data
{
    public class RotationMap : EntityTypeConfiguration<Rotation>
    {
        public RotationMap()
        {
            Property(c => c.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
        }
    }
}
