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
        public IQueryable<People> GetTransactions()
        {
            return db.Peoples;
        }

        // GET: api/People/5
        [ResponseType(typeof(Transaction))]
        public IHttpActionResult GetTransaction(Guid id)
        {
            People people = db.Peoples.Find(id);
            if (people == null)
            {
                return NotFound();
            }

            return Ok(people);
        }

        // POST: api/People
        [ResponseType(typeof(People))]
        public IHttpActionResult PostPeople(People people)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Peoples.Add(people);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (PeopleExists(people.PeopleId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = people.PeopleId }, people);
        }


        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PeopleExists(Guid id)
        {
            return db.Peoples.Count(e => e.PeopleId == id) > 0;
        }
    }
}
