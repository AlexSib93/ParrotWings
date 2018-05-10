namespace ParrotWings.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class DataMigration1 : DbMigration
    {
        public override void Up()
        {
            RenameColumn(table: "dbo.Transactions", name: "Poeple_ID", newName: "People_ID");
            RenameIndex(table: "dbo.Transactions", name: "IX_Poeple_ID", newName: "IX_People_ID");
            AddColumn("dbo.Transactions", "People_ID1", c => c.Guid());
            CreateIndex("dbo.Transactions", "People_ID1");
            AddForeignKey("dbo.Transactions", "People_ID1", "dbo.People", "ID");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Transactions", "People_ID1", "dbo.People");
            DropIndex("dbo.Transactions", new[] { "People_ID1" });
            DropColumn("dbo.Transactions", "People_ID1");
            RenameIndex(table: "dbo.Transactions", name: "IX_People_ID", newName: "IX_Poeple_ID");
            RenameColumn(table: "dbo.Transactions", name: "People_ID", newName: "Poeple_ID");
        }
    }
}
