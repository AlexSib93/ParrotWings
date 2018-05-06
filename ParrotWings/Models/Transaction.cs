using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ParrotWings.Models
{
    public class Transaction
    {
        public Guid ID { get; set; }

        public People Poeple { get; set; }

        public People Recepient { get; set; }

        public string Number { get; set; }

        public string Amount { get; set; }

        public DateTime DateTime { get; set; }

    }
}