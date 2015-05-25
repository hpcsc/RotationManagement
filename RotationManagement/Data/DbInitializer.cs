using RotationManagement.Models;
using System.Collections.Generic;
using System.Data.Entity;

namespace RotationManagement.Data
{
    public class DbInitializer : DropCreateDatabaseAlways<RotationDbContext>
    {
        protected override void Seed(RotationDbContext context)
        {
            var rotations = new List<Rotation>
            {
                new Rotation
                {
                    Name = "Rotation 1",
                    Color = "000000"
                },
                new Rotation
                {
                    Name = "Rotation 2",
                    Color = "ff0000"
                },
                new Rotation
                {
                    Name = "Rotation 3",
                    Color = "0000ff"
                },
                new Rotation
                {
                    Name = "Rotation 4",
                    Color = "008080"
                },
                new Rotation
                {
                    Name = "Rotation 5",
                    Color = "ff7373"
                },
                new Rotation
                {
                    Name = "Rotation 6",
                    Color = "660066"
                },
                new Rotation
                {
                    Name = "Rotation 7",
                    Color = "003366"
                },
                new Rotation
                {
                    Name = "Rotation 8",
                    Color = "999999"
                },
                new Rotation
                {
                    Name = "Rotation 9",
                    Color = "4099ff"
                }
            };

            rotations.ForEach(r => context.Rotations.Add(r));

            var residents = new List<Resident>
            {
                new Resident { Name = "Resident A" },
                new Resident { Name = "Resident B" },
                new Resident { Name = "Resident C" },
                new Resident { Name = "Resident D" }
            };

            residents.ForEach(r => context.Residents.Add(r));

            context.SaveChanges();

            var assignments = new List<Assignment>
            {
                new Assignment { ResidentId = 1, RotationId = 1, FromMonth = 1, ToMonth = 2 },
                new Assignment { ResidentId = 1, RotationId = 2, FromMonth = 5, ToMonth = 5 },
                new Assignment { ResidentId = 1, RotationId = 3, FromMonth = 6, ToMonth = 6 },
                new Assignment { ResidentId = 2, RotationId = 4, FromMonth = 1, ToMonth = 2 },
                new Assignment { ResidentId = 2, RotationId = 5, FromMonth = 5, ToMonth = 5 },
                new Assignment { ResidentId = 3, RotationId = 6, FromMonth = 1, ToMonth = 1 },
                new Assignment { ResidentId = 3, RotationId = 7, FromMonth = 2, ToMonth = 3 },
                new Assignment { ResidentId = 3, RotationId = 8, FromMonth = 4, ToMonth = 4 },
                new Assignment { ResidentId = 4, RotationId = 9, FromMonth = 5, ToMonth = 5 }
            };

            assignments.ForEach(a => context.Assignments.Add(a));

            context.SaveChanges();
        }
    }
}
