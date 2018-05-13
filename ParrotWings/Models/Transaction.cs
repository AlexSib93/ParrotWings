using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ParrotWings.Models
{
    public class Transaction : BaseModel
    {
        public People People { get; set; }

        public People Recepient { get; set; }

        public string Number { get; set; }

        public decimal Amount { get; set; }

        public DateTime DateTime { get; set; }

    }    
}