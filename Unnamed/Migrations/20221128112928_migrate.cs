using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Unnamed.Migrations
{
    /// <inheritdoc />
    public partial class migrate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Entry_ToDoLists_listId",
                table: "Entry");

            migrationBuilder.RenameColumn(
                name: "listId",
                table: "Entry",
                newName: "ListId");

            migrationBuilder.RenameIndex(
                name: "IX_Entry_listId",
                table: "Entry",
                newName: "IX_Entry_ListId");

            migrationBuilder.AddForeignKey(
                name: "FK_Entry_ToDoLists_ListId",
                table: "Entry",
                column: "ListId",
                principalTable: "ToDoLists",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Entry_ToDoLists_ListId",
                table: "Entry");

            migrationBuilder.RenameColumn(
                name: "ListId",
                table: "Entry",
                newName: "listId");

            migrationBuilder.RenameIndex(
                name: "IX_Entry_ListId",
                table: "Entry",
                newName: "IX_Entry_listId");

            migrationBuilder.AddForeignKey(
                name: "FK_Entry_ToDoLists_listId",
                table: "Entry",
                column: "listId",
                principalTable: "ToDoLists",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
