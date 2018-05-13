using System.Data.Entity;

namespace ParrotWings.Models
{
    public class PWContext : DbContext
    {
        public DbSet<Transaction> Transactions { get; set; }

        public DbSet<People> Peoples { get; set; }

        public DbSet<Country> Countries { get; set; }

        public DbSet<Balance> Balances { get; set; }
    }
}