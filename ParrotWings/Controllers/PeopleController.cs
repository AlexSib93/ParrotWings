using Microsoft.AspNet.Identity;
using ParrotWings.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace ParrotWings.Controllers
{
    public class PeopleController : ApiController
    {
        private PWContext db = new PWContext();

        // GET: api/People
        [Route("api/filteredPeoples")]
        [Authorize]
        public List<PeopleBindingModel> GetTPeoples(string filter)
        {
            People user = CurrentPeople();

            List<PeopleBindingModel> peopleBM = new List<PeopleBindingModel>();

            var pp = db.Peoples.Where(p =>
                !p.ID.Equals(user.ID)
                && p.Name.ToLower().Contains(filter.ToLower()));

            foreach (People p in pp)
            {
                peopleBM.Add(new PeopleBindingModel()
                {
                    id = p.ID,
                    value = p.Name
                });
            }

            return peopleBM;
        }

        // GET: api/People/5
        [ResponseType(typeof(Transaction))]
        [Authorize]
        public IHttpActionResult GetPeople(Guid id)
        {
            People people = db.Peoples.Find(id);
            if (people == null)
            {
                return NotFound();
            }

            return Ok(people);
        }

        //// POST: api/People
        //[ResponseType(typeof(People))]
        //public IHttpActionResult PostPeople(People people)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    db.Peoples.Add(people);

        //    try
        //    {
        //        db.SaveChanges();
        //    }
        //    catch (DbUpdateException)
        //    {
        //        if (PeopleExists(people.PeopleId))
        //        {
        //            return Conflict();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return CreatedAtRoute("DefaultApi", new { id = people.PeopleId }, people);
        //}


        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
        
        public People CurrentPeople()
        {
            Guid ID = new Guid(User.Identity.GetUserId());

            return db.Peoples
                .FirstOrDefault(x => x.IdentityId.Equals(ID));
        }

        //private bool PeopleExists(Guid id)
        //{
        //    return db.Peoples.Count(e => e.PeopleId == id) > 0;
        //}
    }
}
