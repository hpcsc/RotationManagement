
namespace RotationManagement.ViewModels
{
    public class UpdateScheduleInputModel
    {
        public int AssignmentId { get; set; }
        public int ResidentId { get; set; }
        public int RotationId { get; set; }
        public int FromMonth { get; set; }
        public int ToMonth { get; set; }
    }
}
