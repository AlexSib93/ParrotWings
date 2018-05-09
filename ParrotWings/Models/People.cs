using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ParrotWings.Models
{
    public class People 
    {
        public ApplicationUser AppUser { get; set; }

        public Guid PeopleId { get; set; }

        public string Name { get; set; }

        public string LastName { get; set; }

        public string MiddleName { get; set; }

        public string Email { get; set; }

        public string Login { get; set; }

        public DateTime? Birthday { get; set; }
    }
}