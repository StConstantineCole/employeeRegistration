using Microsoft.EntityFrameworkCore.Migrations;

namespace employeeRegistrationAPI.Migrations
{
    public partial class ChangeKeyName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Employees",
                newName: "EmployeeID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "EmployeeID",
                table: "Employees",
                newName: "Id");
        }
    }
}
