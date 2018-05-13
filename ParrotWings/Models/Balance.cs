using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ParrotWings.Models
{
    public class Balance : BaseModel
    {
        public People People { get; set; }

        public decimal Value { get; set; }

        public string Comment { get; set; }

        public Transaction Transaction { get; set; }
    }
}