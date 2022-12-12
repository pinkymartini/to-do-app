using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Unnamed.Migrations
{
    /// <inheritdoc />
    public partial class AddedIsCompletedandPriorityLeveltotheentry : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsCompleted",
                table: "Entry",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "PriorityLevel",
                table: "Entry",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsCompleted",
                table: "Entry");

            migrationBuilder.DropColumn(
                name: "PriorityLevel",
                table: "Entry");
        }
    }
}
