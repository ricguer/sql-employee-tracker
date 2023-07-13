                                                                /* ================== INITIALIZATION ================== */
DROP DATABASE IF EXISTS employeetracker_db;                     /* Drop database if database exists                     */
CREATE DATABASE employeetracker_db;                             /* Create database to track employees                   */
USE employeetracker_db;                                         /* Use employee tracking database moving forward        */


                                                                /* ============== CREATE REQUIRED TABLES ============== */

                                                                /* ---------------- Table: Department ----------------- */
CREATE TABLE department (
    id              INT          NOT NULL  AUTO_INCREMENT  PRIMARY KEY,
    name            VARCHAR(30)  NOT NULL
);

                                                                /* ------------------- Table: Role -------------------- */
CREATE TABLE role (
    id             INT           NOT NULL  AUTO_INCREMENT  PRIMARY KEY,
    title          VARCHAR(30)   NOT NULL,
    salary         DECIMAL       NOT NULL,
    department_id  INT,
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL
);

                                                                /* ----------------- Table: Employee ------------------ */
CREATE TABLE employee (
    id           INT             NOT NULL  AUTO_INCREMENT  PRIMARY KEY,
    first_name   VARCHAR(30)     NOT NULL,
    last_name    VARCHAR(30)     NOT NULL,
    role_id      INT,
    manager_id   INT,
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE SET NULL
);
