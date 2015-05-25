using RotationManagement.Data;
using RotationManagement.Models;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace RotationManagement.Controllers
{
    public class RotationController : Controller
    {
        // GET: Rotation
        public ActionResult Index()
        {
            var rotations = FindAllRotations();
            return View(rotations);
        }

        private IEnumerable<Rotation> FindAllRotations()
        {
            using(var db = new RotationDbContext())
            {
                return db.Rotations.ToList();
            }
        }

        public ActionResult Create(string name, string color)
        {
            using (var db = new RotationDbContext())
            {
                db.Rotations.Add(new Rotation
                    {
                        Name = name,
                        Color = color
                    });

                db.SaveChanges();
            }

            return RedirectToAction("index");
        }

        public ActionResult Update(int id, string name, string color)
        {
            using (var db = new RotationDbContext())
            {
                var rotation = db.Rotations.FirstOrDefault(r => r.Id == id);
                rotation.Name = name;
                rotation.Color = color;

                db.SaveChanges();
            }

            return RedirectToAction("index");
        }
    }
}