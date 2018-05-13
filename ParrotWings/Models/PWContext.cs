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

        public DbSet<People> Peoples { get; set; }

        public DbSet<Country> Countries { get; set; }
    }
}