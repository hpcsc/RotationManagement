
using System.Collections.Generic;
namespace RotationManagement.ViewModels
{
    public class DisplayScheduleModel
    {
        public List<DisplayScheduleResidentModel> Residents { get; set; }
    }

    public class DisplayScheduleResidentModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<DisplayScheduleAssignmentModel> Assignments { get; set; }
    }

    public class DisplayScheduleAssignmentModel
    {
        public int AssignmentId { get; set; }
        public int ResidentId { get; set; }
        public int RotationId { get; set; }
        public int FromMonth { get; set; }
        public int ToMonth { get; set; }
        public string Name { get; set; }
        public string Color { get; set; }
    }
}
