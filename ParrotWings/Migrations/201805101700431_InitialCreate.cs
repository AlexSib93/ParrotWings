namespace ParrotWings.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
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
                        Login = c.String(),
                        Birthday = c.DateTime(),
                    })
                .PrimaryKey(t => t.ID);
            
            CreateTable(
                "dbo.Transactions",
                c => new
                    {
                        ID = c.Guid(nullable: false),
                        Number = c.String(),
                        Amount = c.String(),
                        DateTime = c.DateTime(nullable: false),
                        Poeple_ID = c.Guid(),
                        Recepient_ID = c.Guid(),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.People", t => t.Poeple_ID)
                .ForeignKey("dbo.People", t => t.Recepient_ID)
                .Index(t => t.Poeple_ID)
                .Index(t => t.Recepient_ID);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Transactions", "Recepient_ID", "dbo.People");
            DropForeignKey("dbo.Transactions", "Poeple_ID", "dbo.People");
            DropIndex("dbo.Transactions", new[] { "Recepient_ID" });
            DropIndex("dbo.Transactions", new[] { "Poeple_ID" });
            DropTable("dbo.Transactions");
            DropTable("dbo.People");
        }
    }
}
