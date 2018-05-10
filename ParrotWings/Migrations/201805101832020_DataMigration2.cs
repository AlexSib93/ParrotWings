namespace ParrotWings.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class DataMigration2 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Transactions", "People_ID1", "dbo.People");
            DropIndex("dbo.Transactions", new[] { "People_ID1" });
            DropColumn("dbo.Transactions", "People_ID1");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Transactions", "People_ID1", c => c.Guid());
            CreateIndex("dbo.Transactions", "People_ID1");
            AddForeignKey("dbo.Transactions", "People_ID1", "dbo.People", "ID");
        }
    }
}
