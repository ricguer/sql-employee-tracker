INSERT INTO department (name)
VALUES ('Sales'), 
       ('Marketing'), 
       ('HR'), 
       ('IT'), 
       ('Finance');

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Lead', 100000, 1), 
       ('Salesperson', 80000, 1), 
       ('Lead Engineer', 150000, 4), 
       ('Software Engineer', 120000, 4), 
       ('Account Manager', 125000, 3), 
       ('Accountant', 85000, 5), 
       ('Legal Team Lead', 250000, 2), 
       ('Lawyer', 190000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, NULL), 
       ('Mike', 'Chan', 2, 1), 
       ('Ashley', 'Rodriguez', 3, NULL), 
       ('Kevin', 'Tupik', 4, 3), 
       ('Malia', 'Brown', 5, NULL), 
       ('Sarah', 'Lourd', 6, 5), 
       ('Tom', 'Allen', 7, NULL), 
       ('Jason', 'Wu', 8, 7), 
       ('Robert', 'Brown', 2, 1), 
       ('Michelle', 'Rodriguez', 3, NULL), 
       ('Josh', 'Brown', 4, 3), 
       ('Fiona', 'Woolf', 5, NULL), 
       ('Kunal', 'Singh', 6, 5), 
       ('Nathan', 'Young', 7, NULL), 
       ('Diane', 'Wu', 8, 7);
