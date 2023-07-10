INSERT INTO department (id, name)
VALUES (1, 'Sales'), 
       (2, 'Marketing'), 
       (3, 'HR'), 
       (4, 'IT'), 
       (5, 'Finance');

INSERT INTO role (id, title, salary, department_id)
VALUES (1, 'Sales Lead', 100000, 1), 
       (2, 'Salesperson', 80000, 1), 
       (3, 'Lead Engineer', 150000, 4), 
       (4, 'Software Engineer', 120000, 4), 
       (5, 'Account Manager', 125000, 3), 
       (6, 'Accountant', 85000, 5), 
       (7, 'Legal Team Lead', 250000, 2), 
       (8, 'Lawyer', 190000, 2);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, 'John', 'Doe', 1, NULL), 
       (2, 'Mike', 'Chan', 2, 1), 
       (3, 'Ashley', 'Rodriguez', 3, NULL), 
       (4, 'Kevin', 'Tupik', 4, 3), 
       (5, 'Malia', 'Brown', 5, NULL), 
       (6, 'Sarah', 'Lourd', 6, 5), 
       (7, 'Tom', 'Allen', 7, NULL), 
       (8, 'Jason', 'Wu', 8, 7), 
       (9, 'Robert', 'Brown', 2, 1), 
       (10, 'Michelle', 'Rodriguez', 3, NULL), 
       (11, 'Josh', 'Brown', 4, 3), 
       (12, 'Fiona', 'Woolf', 5, NULL), 
       (13, 'Kunal', 'Singh', 6, 5), 
       (14, 'Nathan', 'Young', 7, NULL), 
       (15, 'Diane', 'Wu', 8, 7);
```
