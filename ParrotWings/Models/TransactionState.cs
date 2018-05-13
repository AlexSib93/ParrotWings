using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ParrotWings.Models
{
    public class TransactionState : BaseModel
    {
        public string Name { get; set; }

        public string Comment { get; set; }
    }
}