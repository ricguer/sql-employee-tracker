                                                                /* ================== INITIALIZATION ================== */
DROP DATABASE IF EXISTS employeeTracker_db;                     /* Drop database if database exists                     */
CREATE DATABASE employeeTracker_db;                             /* Create database to track employees                   */
USE employeeTracker_db;                                         /* Use employee tracking database moving forward        */


                                                                /* ============== CREATE REQUIRED TABLES ============== */

                                                                /* ---------------- Table: Department ----------------- */
CREATE TABLE department (
    id              INT          NOT NULL  PRIMARY KEY,
    name            VARCHAR(30)  NOT NULL
);

                                                                /* ------------------- Table: Role -------------------- */
CREATE TABLE role (
    id             INT           NOT NULL  PRIMARY KEY,
    title          VARCHAR(30)   NOT NULL,
    salary         DECIMAL       NOT NULL,
    department_id  INT           NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL
);

                                                                /* ----------------- Table: Employee ------------------ */
CREATE TABLE employee (
    id           INT             NOT NULL  PRIMARY KEY,
    first_name   VARCHAR(30)     NOT NULL,
    last_name    VARCHAR(30)     NOT NULL,
    role_id      INT             NOT NULL,
    manager_id   INT             NOT NULL,
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE SET NULL
);
