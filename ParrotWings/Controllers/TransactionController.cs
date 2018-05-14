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
using System.Diagnostics;

namespace ParrotWings
{
    public class TransactionController : ApiController
    {
        private PWContext db = new PWContext();

        // GET api/<controller>
        //[Authorize]
        [AllowAnonymous]
        public IEnumerable<ShowTransactionBindingModel> Get()
        {
            People user = CurrentPeople();

            IEnumerable<ShowTransactionBindingModel> debetTransactions = db.Transactions
                .Where(x => x.People.ID.Equals(user.ID))
                .Join(db.Balances, 
                    t=> new { transact = t.ID.ToString(), people = t.People.ID.ToString() }, 
                    b => new { transact = b.Transaction.ID.ToString(), people = b.People.ID.ToString() },
                    (t, b) => new ShowTransactionBindingModel
                    {
                        ID = t.ID,
                        RecepientName = t.Correspondent.Name,
                        PeopleName = t.People.Name,
                        DateTime = t.DateTime,
                        Amount = t.Amount,
                        ResultBalance = b.Value
                    });

            IEnumerable<ShowTransactionBindingModel> creditTransactions = db.Transactions
                .Where(x => x.Correspondent.ID.Equals(user.ID))
                    .Join(db.Balances, 
                    t => new { transact = t.ID.ToString(), people = t.Correspondent.ID.ToString() }, 
                    b => new { transact = b.Transaction.ID.ToString(), people = b.People.ID.ToString() },
                    (t,b) => new ShowTransactionBindingModel
                    {
                        ID = t.ID,
                        RecepientName = t.Correspondent.Name,
                        PeopleName = t.People.Name,
                        DateTime = t.DateTime,
                        Amount = t.Amount,
                        ResultBalance = b.Value
                    });

            return debetTransactions.Union(creditTransactions).OrderByDescending(x => x.DateTime);
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
        [Authorize]
        [ResponseType(typeof(Transaction))]
        [Route("api/createTransaction")]
        public IHttpActionResult PostTransaction(CreateTransactionBindingModel transaction)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            People people = CurrentPeople();

            Transaction newTransaction = new Transaction() {
                Correspondent = db.Peoples.Find(transaction.RecepientID),
                People = people,
                Amount = transaction.Amount,
                DateTime = DateTime.Now
            };

            //User balance
            db.Balances.Add(
                new Balance(newTransaction.People, 
                    newTransaction.People.Balance - newTransaction.Amount, 
                    "User transaction", 
                    newTransaction));
            
            //Correspondent balance
            db.Balances.Add(
               new Balance(newTransaction.Correspondent,
                   newTransaction.Correspondent.Balance + newTransaction.Amount,
                   "Correspondent transaction",
                   newTransaction));

            db.Entry(newTransaction.Correspondent).State = EntityState.Unchanged;
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

        public People CurrentPeople()
        {
            Guid ID = new Guid(User.Identity.GetUserId());

            return db.Peoples
                .FirstOrDefault(x => x.IdentityId.Equals(ID));
        }

        #endregion Helpers
    }
}