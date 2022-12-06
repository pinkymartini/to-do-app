using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Unnamed.Migrations
{
    /// <inheritdoc />
    public partial class ThirdMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Entry_List_ListId",
                table: "Entry");

            migrationBuilder.DropPrimaryKey(
                name: "PK_List",
                table: "List");

            migrationBuilder.RenameTable(
                name: "List",
                newName: "ToDoLists");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ToDoLists",
                table: "ToDoLists",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Entry_ToDoLists_ListId",
                table: "Entry",
                column: "ListId",
                principalTable: "ToDoLists",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Entry_ToDoLists_ListId",
                table: "Entry");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ToDoLists",
                table: "ToDoLists");

            migrationBuilder.RenameTable(
                name: "ToDoLists",
                newName: "List");

            migrationBuilder.AddPrimaryKey(
                name: "PK_List",
                table: "List",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Entry_List_ListId",
                table: "Entry",
                column: "ListId",
                principalTable: "List",
                principalColumn: "Id");
        }
    }
}
