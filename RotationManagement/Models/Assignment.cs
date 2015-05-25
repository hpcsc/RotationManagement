
namespace RotationManagement.Models
{
    public class Assignment
    {
        public int Id { get; set; }
        public int ResidentId { get; set; }
        public int RotationId { get; set; }
        public int FromMonth { get; set; }
        public int ToMonth { get; set; }

        public Resident Resident { get; set; }
        public Rotation Rotation { get; set; }
    }
}
