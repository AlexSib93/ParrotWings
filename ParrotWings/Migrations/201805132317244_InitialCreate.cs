namespace ParrotWings.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Balances",
                c => new
                    {
                        ID = c.Guid(nullable: false),
                        Value = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Comment = c.String(),
                        DtCreaate = c.DateTime(nullable: false),
                        People_ID = c.Guid(),
                        Transaction_ID = c.Guid(),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.People", t => t.People_ID)
                .ForeignKey("dbo.Transactions", t => t.Transaction_ID)
                .Index(t => t.People_ID)
                .Index(t => t.Transaction_ID);
            
            CreateTable(
                "dbo.People",
                c => new
                    {
                        ID = c.Guid(nullable: false),
                        IdentityId = c.Guid(nullable: false),
                        Name = c.String(),
                        LastName = c.String(),
                        MiddleName = c.String(),
                        Email = c.String(),
                        Birthday = c.DateTime(),
                        DtCreaate = c.DateTime(nullable: false),
                        Country_ID = c.Guid(),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.Countries", t => t.Country_ID)
                .Index(t => t.Country_ID);
            
            CreateTable(
                "dbo.Countries",
                c => new
                    {
                        ID = c.Guid(nullable: false),
                        Name = c.String(),
                        DtCreaate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.ID);
            
            CreateTable(
                "dbo.Transactions",
                c => new
                    {
                        ID = c.Guid(nullable: false),
                        Number = c.String(),
                        Amount = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Comment = c.String(),
                        DateTime = c.DateTime(nullable: false),
                        DtCreaate = c.DateTime(nullable: false),
                        Correspondent_ID = c.Guid(),
                        People_ID = c.Guid(),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.People", t => t.Correspondent_ID)
                .ForeignKey("dbo.People", t => t.People_ID)
                .Index(t => t.Correspondent_ID)
                .Index(t => t.People_ID);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Balances", "Transaction_ID", "dbo.Transactions");
            DropForeignKey("dbo.Transactions", "People_ID", "dbo.People");
            DropForeignKey("dbo.Transactions", "Correspondent_ID", "dbo.People");
            DropForeignKey("dbo.Balances", "People_ID", "dbo.People");
            DropForeignKey("dbo.People", "Country_ID", "dbo.Countries");
            DropIndex("dbo.Transactions", new[] { "People_ID" });
            DropIndex("dbo.Transactions", new[] { "Correspondent_ID" });
            DropIndex("dbo.People", new[] { "Country_ID" });
            DropIndex("dbo.Balances", new[] { "Transaction_ID" });
            DropIndex("dbo.Balances", new[] { "People_ID" });
            DropTable("dbo.Transactions");
            DropTable("dbo.Countries");
            DropTable("dbo.People");
            DropTable("dbo.Balances");
        }
    }
}
