using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ApiClinic.Migrations
{
    /// <inheritdoc />
    public partial class nameAndEmail : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Username",
                table: "User",
                newName: "FullName");

            migrationBuilder.AddColumn<string>(
                name: "EmailAddress",
                table: "User",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EmailAddress",
                table: "User");

            migrationBuilder.RenameColumn(
                name: "FullName",
                table: "User",
                newName: "Username");
        }
    }
}
