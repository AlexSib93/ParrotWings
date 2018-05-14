namespace ParrotWings.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class migration : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Transactions", "CorrespondentResultBalance_ID", c => c.Guid());
            AddColumn("dbo.Transactions", "PeopleResultBalance_ID", c => c.Guid());
            CreateIndex("dbo.Transactions", "CorrespondentResultBalance_ID");
            CreateIndex("dbo.Transactions", "PeopleResultBalance_ID");
            AddForeignKey("dbo.Transactions", "CorrespondentResultBalance_ID", "dbo.Balances", "ID");
            AddForeignKey("dbo.Transactions", "PeopleResultBalance_ID", "dbo.Balances", "ID");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Transactions", "PeopleResultBalance_ID", "dbo.Balances");
            DropForeignKey("dbo.Transactions", "CorrespondentResultBalance_ID", "dbo.Balances");
            DropIndex("dbo.Transactions", new[] { "PeopleResultBalance_ID" });
            DropIndex("dbo.Transactions", new[] { "CorrespondentResultBalance_ID" });
            DropColumn("dbo.Transactions", "PeopleResultBalance_ID");
            DropColumn("dbo.Transactions", "CorrespondentResultBalance_ID");
        }
    }
}
