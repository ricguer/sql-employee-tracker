                                                                /* ===================== IMPORTS ====================== */
const { response } = require("express");
const inquirer = require("inquirer");

                                                                /* ================= GLOBAL VARIABLES ================= */
const  inq_viewAllEmployees    =  "View All Employees";
const  inq_addEmployee         =  "Add Employee";
const  inq_updateEmployeeRole  =  "Update Employee Role";
const  inq_viewAllRoles        =  "View All Roles";
const  inq_addRole             =  "Add Role";
const  inq_viewAllDepartments  =  "View All Departments";
const  inq_addDepartment       =  "Add Department";
const  inq_Quit                =  "Quit";


const questions = [
    {
        type: "list",
        message: "What would you like to do?",
        name: "mainSelection",
        choices: [
            inq_viewAllEmployees,
            inq_addEmployee,
            inq_updateEmployeeRole,
            inq_viewAllRoles,
            inq_addRole,
            inq_viewAllDepartments,
            inq_addDepartment,
            inq_Quit
        ]
    }
];

function main() {
    inquirer.prompt(questions).then(response => {
        console.log(response.mainSelection);
        if (response.mainSelection != inq_Quit)
        {
            switch (response.mainSelection) {
                case inq_viewAllEmployees:
                    console.log("View All Employees");
                    // TODO: Send corresponding SQL query for viewing all employees
                    fetch("/api/employees");
                    break;
                case inq_addEmployee:
                    console.log("Add Employee");
                    // TODO: Send corresponding SQL query for adding an employee
                    break;
                case inq_updateEmployeeRole:
                    console.log("Update Employee Role");
                    // TODO: Send corresponding SQL query for updating an employee's role
                    break;
                case inq_viewAllRoles:
                    console.log("View All Roles");
                    // TODO: Send corresponding SQL query for viewing all roles
                    break;
                case inq_addRole:
                    console.log("Add Role");
                    // TODO: Send corresponding SQL query for adding a role
                    break;
                case inq_viewAllDepartments:
                    console.log("View All Departments");
                    // TODO: Send corresponding SQL query for viewing all departments
                    break;
                case inq_addDepartment:
                    console.log("Add Department");
                    // TODO: Send corresponding SQL query for adding a department
                    break;
                default:
                    break;
            }

            main();
        }
    });
};

main();
