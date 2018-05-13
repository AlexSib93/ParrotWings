using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ParrotWings.Models
{
    public class PeopleBindingModel
    {
        public Guid id { get; set; }
        public string value { get; set; }
    }

    public class PeopleStateBindingModel
    {
        public string PeopleName { get; set; }

        public decimal Balance { get; set; }
    }
}