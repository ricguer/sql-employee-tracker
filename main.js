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

/**
 * View any table from the database.
 * @param {*} tableName name of the table to view
 */
function viewTable(tableName) {
    const query = `SELECT * FROM ${tableName};`;                /* Create query to view table                           */

                                                                /* Use query on given table                             */
    connection.query(query, (err, res) => {
        if (err) throw err;                                     /* Throw error if query returns error                   */
        console.table(res);                                     /* Print result of query as a table                     */
        mainMenu();                                             /* Bring up main menu once query returns response       */
    });
};


/**
 * Add an employee to the employee table of the database.
 */
function addEmployee() {
                                                                /* Query database for roles from roles table            */
    connection.query(`SELECT * FROM ${roleTableName};`, (err, roles) => {

        if (err) throw err;                                     /* Throw error if query returns error                   */

                                                                /* Query database for employees from employees table    */
        connection.query(`SELECT * FROM ${employeeTableName};`, (err, employees) => {

            if (err) throw err;                                 /* Throw error if query returns error                   */

                                                                /* Use inquirer to collect employee information         */
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
                                                                /* Create query to insert new employee into database    */
                const insertQuery = `INSERT INTO ${employeeTableName} (first_name, last_name, role_id, manager_id) VALUES ("${response.first_name}", "${response.last_name}", ${response.role_id}, ${response.manager_id});`;

                                                                /* Use query to insert new employee into database       */
                connection.query(insertQuery, (err, res) => {

                    if (err) throw err;                         /* Throw error if query returns error                   */

                                                                /* Log successful insertion of new employee in database */
                    console.log(`Added ${response.first_name} ${response.last_name} to the database.`);

                    mainMenu();                                 /* Bring up main menu once query returns response       */
                });
            });
        });
    });
};


/**
 * Update an employee's role in the employee table of the database.
 */
function updateEmployeeRole() {
                                                                /* Query database for roles from roles table            */
    connection.query(`SELECT * FROM ${roleTableName};`, (err, roles) => {

        if (err) throw err;                                     /* Throw error if query returns error                   */

                                                                /* Query database for employees from employees table    */
        connection.query(`SELECT * FROM ${employeeTableName};`, (err, employees) => {

            if (err) throw err;                                 /* Throw error if query returns error                   */

                                                                /* Use inquirer to collect employee information         */
            inquirer.prompt([
                {
                    type: "list",
                    message: "Which employee's role would you like to update?",
                    name: "employee_id",
                    choices: employees.map(employee => ({
                            name: `${employee.first_name} ${employee.last_name}`,
                            value: employee.id
                        })
                    )
                },
                {
                    type: "list",
                    message: "What is the employee's new role?",
                    name: "role_id",
                    choices: roles.map(role => ({
                            name: role.title,
                            value: role.id
                        })
                    )
                }
            ]).then(response => {
                                                                /* Create query to update employee's role in database   */
                const updateQuery = `UPDATE ${employeeTableName} SET role_id = ${response.role_id} WHERE id = ${response.employee_id};`;

                                                                /* Use query to update employee's role in database      */
                connection.query(updateQuery, (err, res) => {

                    if (err) throw err;                         /* Throw error if query returns error                   */
                    console.log(`Updated employee's role.`);    /* Log successful update of employee's role in database */
                    mainMenu();                                 /* Bring up main menu once query returns response       */
                });
            });
        });
    });
}


/**
 * Add a role to the role table of the database.
 */
function addRole() {
                                                                /* Query database for departments from departments table*/
    connection.query(`SELECT * FROM ${departmentTableName};`, (err, departments) => {

        if (err) throw err;                                     /* Throw error if query returns error                   */

                                                                /* Use inquirer to collect role information             */
        inquirer.prompt([
            {
                type: "input",
                message: "What is the title of the role?",
                name: "title",
            },
            {
                type: "input",
                message: "What is the salary of the role?",
                name: "salary",
            },
            {
                type: "list",
                message: "What is the department of the role?",
                name: "department_id",
                choices: departments.map(department => ({
                        name: department.name,
                        value: department.id
                    })
                )
            }
        ]).then(response => {
                                                                /* Create query to insert new role into database        */
            const insertQuery = `INSERT INTO ${roleTableName} (title, salary, department_id) VALUES ("${response.title}", ${response.salary}, ${response.department_id});`;

                                                                /* Use query to insert new role into database           */
            connection.query(insertQuery, (err, res) => {

                if (err) throw err;                             /* Throw error if query returns error                   */

                                                                /* Log successful insertion of new role in database     */
                console.log(`Added ${response.title} to the database.`);

                mainMenu();                                     /* Bring up main menu once query returns response       */
            });
        });
    });
}


/**
 * Add a department to the department table of the database.
 */
function addDepartment() {
    connection.query(`SELECT * FROM ${departmentTableName};`, (err, departments) => {
        if (err) throw err;

        inquirer.prompt([
            {
                type: "input",
                message: "What is the name of the department?",
                name: "name",
            }
        ]).then(response => {
            const insertQuery = `INSERT INTO ${departmentTableName} (name) VALUES ("${response.name}");`;
            connection.query(insertQuery, (err, res) => {
                if (err) throw err;
                console.log(`Added ${response.name} to the database.`);
                mainMenu();
            });
        });
    });
};


/**
 * Generate the main menu of the application.
 */
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
        switch (response.mainSelection) {
            case inq_viewAllEmployees:
                viewTable(employeeTableName);
                break;
            case inq_addEmployee:
                addEmployee();
                break;
            case inq_updateEmployeeRole:
                console.log("Update Employee Role");
                updateEmployeeRole();
                break;
            case inq_viewAllRoles:
                viewTable(roleTableName);
                break;
            case inq_addRole:
                console.log("Add Role");
                addRole();
                break;
            case inq_viewAllDepartments:
                viewTable(departmentTableName);
                break;
            case inq_addDepartment:
                console.log("Add Department");
                addDepartment();
                break;
            case inq_Quit:
            default:
                console.log("Quitting");
                connection.end();                               /* End connection to database                           */
                break;
            }
    });
};

mainMenu();                                                     /* Generate main menu                                    */
