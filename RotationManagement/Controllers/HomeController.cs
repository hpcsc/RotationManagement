using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using RotationManagement.Data;
using RotationManagement.Models;
using RotationManagement.ViewModels;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web.Mvc;

namespace RotationManagement.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetScheduleData()
        {
            var residents = GetAllResidents();
            var assignments = GetAllAssignments();

            var model = new DisplayScheduleModel
            {
                Residents = residents.Select(r => new DisplayScheduleResidentModel
                {
                    Id = r.Id,
                    Name = r.Name,
                    Assignments = assignments.FindAll(a => a.ResidentId == r.Id)
                                             .Select(a => new DisplayScheduleAssignmentModel
                    {
                        AssignmentId = a.Id,
                        ResidentId = a.ResidentId,
                        RotationId = a.RotationId,
                        Name = a.Rotation.Name,
                        Color = a.Rotation.Color,
                        FromMonth = a.FromMonth,
                        ToMonth = a.ToMonth
                    }).ToList()
                }).ToList()
            };

            return Content(
                JsonConvert.SerializeObject(model,
                                            new JsonSerializerSettings
                                            {
                                                ContractResolver = new CamelCasePropertyNamesContractResolver()
                                            }), "application/json");
        }

        private List<Resident> GetAllResidents()
        {
            using(var db = new RotationDbContext())
            {
                return db.Residents.ToList();
            }
        }

        private List<Assignment> GetAllAssignments()
        {
            using (var db = new RotationDbContext())
            {
                return db.Assignments.Include(a => a.Rotation).ToList();
            }
        }

        public ActionResult GetAvailableRotations()
        {
            var rotations = GetAllRotations();

            return Content(JsonConvert.SerializeObject(rotations.Select(r => new { id = r.Id, text = r.Name, color = r.Color })), "application/json");
        }

        private List<Rotation> GetAllRotations()
        {
            using (var db = new RotationDbContext())
            {
                return db.Rotations.ToList();
            }
        }

        public ActionResult UpdateSchedule(List<UpdateScheduleInputModel> assignments, List<int> deletedIds)
        {
            try
            {
                var idsToGet = new List<int>(deletedIds);
                var updateIds = new List<int>(assignments.Select(s => s.AssignmentId)).Distinct();
                idsToGet.AddRange(updateIds);

                using (var db = new RotationDbContext())
                {
                    var entities = db.Assignments.Where(a => idsToGet.Contains(a.Id)).ToList();

                    entities.Where(e => deletedIds.Contains(e.Id))
                            .ToList()
                            .ForEach(e => db.Assignments.Remove(e));

                    entities.Where(e => updateIds.Contains(e.Id))
                            .ToList()
                            .ForEach(e =>
                            {
                                var input = assignments.FirstOrDefault(s => s.AssignmentId == e.Id);
                                e.ResidentId = input.ResidentId;
                                e.RotationId = input.RotationId;
                                e.FromMonth = input.FromMonth;
                                e.ToMonth = input.ToMonth;
                            });

                    assignments.Where(e => e.AssignmentId == 0)
                            .ToList()
                            .ForEach(e => db.Assignments.Add(new Assignment
                                {
                                    ResidentId = e.ResidentId,
                                    RotationId = e.RotationId,
                                    FromMonth = e.FromMonth,
                                    ToMonth = e.ToMonth
                                }));

                    db.SaveChanges();
                }
            }
            catch(Exception ex)
            {
                return Json(new { success = false, errors = ex.ToString() });
            }


            return Json(new { success = true });
        }
    }
}