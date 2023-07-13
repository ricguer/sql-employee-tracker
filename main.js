                                                                /* ===================== IMPORTS ====================== */
const mysql = require("mysql2");
const inquirer = require("inquirer");


                                                                /* ================= GLOBAL VARIABLES ================= */

                                                                /* ------------------ TABLE NAMES --------------------- */
const  employeeTableName       =  "employee";
const  roleTableName           =  "role";
const  departmentTableName     =  "department";

                                                                /* -------------------- MAIN MENU --------------------- */

                                                                /* =============== MYSQL INITIALIZATION =============== */

                                                                /* Create connection to employee tracker database       */
const connection = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "mysql",
        database: "employeetracker_db"
    }
);


                                                                /* ===================== FUNCTIONS ==================== */

function viewTable(tableName) {
    const query = `SELECT * FROM ${tableName};`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu();
    });
};

function addEmployee() {
    connection.query(`SELECT * FROM ${roleTableName};`, (err, roles) => {
        if (err) throw err;

        connection.query(`SELECT * FROM ${employeeTableName};`, (err, employees) => {
            if (err) throw err;

            inquirer.prompt([
                {
                    type: "input",
                    message: "What is the employee's first name?",
                    name: "first_name",
                },
                {
                    type: "input",
                    message: "What is the employee's last name?",
                    name: "last_name",
                },
                {
                    type: "list",
                    message: "What is the employee's role?",
                    name: "role_id",
                    choices: roles.map(role => ({
                            name: role.title,
                            value: role.id
                        })
                    )
                },
                {
                    type: "list",
                    message: "Who is the employee's manager?",
                    name: "manager_id",
                    choices: employees.map(employee => ({
                            name: `${employee.first_name} ${employee.last_name}`,
                            value: employee.id
                        })
                    )
                }
            ]).then(response => {
                const insertQuery = `INSERT INTO ${employeeTableName} (first_name, last_name, role_id, manager_id) VALUES ("${response.first_name}", "${response.last_name}", ${response.role_id}, ${response.manager_id});`;
                connection.query(insertQuery, (err, res) => {
                    if (err) throw err;
                    console.log(`Added ${response.first_name} ${response.last_name} to the database.`);
                    mainMenu();
                });
            });
        });
    });
};

function mainMenu() {
    const  inq_viewAllEmployees    =  "View All Employees";
    const  inq_updateEmployeeRole  =  "Update Employee Role";
    const  inq_addEmployee         =  "Add Employee";
    const  inq_viewAllRoles        =  "View All Roles";
    const  inq_addRole             =  "Add Role";
    const  inq_viewAllDepartments  =  "View All Departments";
    const  inq_addDepartment       =  "Add Department";
    const  inq_Quit                =  "Quit";

    inquirer.prompt([
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
    ]).then(response => {
        if (response.mainSelection != inq_Quit) {
            switch (response.mainSelection) {
                case inq_viewAllEmployees:
                    viewTable(employeeTableName);
                    break;
                case inq_addEmployee:
                    addEmployee();
                    break;
                case inq_updateEmployeeRole:
                    console.log("Update Employee Role");
                    // TODO: Send corresponding SQL query for updating an employee's role
                    break;
                case inq_viewAllRoles:
                    viewTable(roleTableName);
                    break;
                case inq_addRole:
                    console.log("Add Role");
                    // TODO: Send corresponding SQL query for adding a role
                    break;
                case inq_viewAllDepartments:
                    viewTable(departmentTableName);
                    break;
                case inq_addDepartment:
                    console.log("Add Department");
                    // TODO: Send corresponding SQL query for adding a department
                    break;
                default:
                    break;
            }
        }
    });
};

mainMenu();
