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
}