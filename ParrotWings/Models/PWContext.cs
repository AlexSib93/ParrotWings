using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace ParrotWings.Models
{
    public class PWContext : DbContext
    {
        public DbSet<Transaction> Transactions { get; set; }

        public DbSet<ApplicationUser> Peoples { get; set; }
    }
}