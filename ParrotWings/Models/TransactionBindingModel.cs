using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ParrotWings.Models
{
    public class CreateTransactionBindingModel
    {
        public Guid RecepientID { get; set; }

        public decimal Amount { get; set; }
    }

    public class ShowTransactionBindingModel
    {
        public Guid ID { get; set; }
        
        public string PeopleName { get; set; }

        public string RecepientName { get; set; }

        public decimal Amount { get; set; }

        public DateTime DateTime { get; set; }

        public decimal ResultBalance { get; set; }
    }
}