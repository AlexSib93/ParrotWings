using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ParrotWings.Models
{
    public class BalanceHistory : BaseModel
    {
        public People People { get; set; }

        public decimal Balance { get; set; }

        public DateTime DateTime { get; set; }

        public Transaction Transaction { get; set; }
    }
}