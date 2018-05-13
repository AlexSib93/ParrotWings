using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace ParrotWings.Models
{
    public class People : BaseModel
    {
        public override Guid ID { get; set;}

        public Guid IdentityId { get; set; }

        public string Name { get; set; }

        public string LastName { get; set; }

        public string MiddleName { get; set; }

        public string Email { get; set; }

        public Country Country { get; set; }

        public DateTime? Birthday { get; set; }
        
        public People () : base()
        {

        }

        public People(string identityId, string userName) : base()
        {
            this.IdentityId = new Guid(identityId);
            this.Name = userName;
        }

        [NotMapped]
        public decimal Balance
        {
            get
            {
                using (PWContext db = new PWContext())
                {
                    return db.Balances.OrderByDescending(x => x.DtCreaate).FirstOrDefault().Value;
                }
            }
            private set { }
        }

    }
}