using ParrotWings.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Microsoft.AspNet.Identity;
using System.Data.Entity;

namespace ParrotWings
{
    public class TransactionController : ApiController
    {
        private PWContext db = new PWContext();

        // GET api/<controller>
        public IEnumerable<Transaction> Get()
        {
            return db.Transactions;
        }

        // GET api/<controller>/5
        [ResponseType(typeof(Transaction))]
        public IHttpActionResult Get(Guid id)
        {
            Transaction transaction = db.Transactions.Find(id);
            if (transaction == null)
            {
                return NotFound();
            }

            return Ok(transaction);
        }

        // POST: api/Transaction
        [ResponseType(typeof(Transaction))]
        public IHttpActionResult PostTransaction(CreateTransactionBindingModel transaction)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var people = db.Peoples.Find(new Guid("9988BF03-1F29-48EA-9599-090A8217EFBE"));

            Transaction newTransaction = new Transaction() {
                Recepient = db.Peoples.Find(transaction.RecepientID),
                People = people,
                Amount = transaction.Amount,
                DateTime = DateTime.Now
            };

            db.Entry(newTransaction.Recepient).State = EntityState.Unchanged;
            db.Entry(newTransaction.People).State = EntityState.Unchanged;

            db.Transactions.Add(newTransaction);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException e)
            {
                    return InternalServerError();
            }

            return Ok();
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }

        #region Helpers

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TransactionExists(Guid id)
        {
            return db.Transactions.Count(e => e.ID == id) > 0;
        }

        public People GetCurrentPeople()
        {
            return db.Peoples.Find(User.Identity.GetUserId());
        }

        #endregion Helpers
    }
}