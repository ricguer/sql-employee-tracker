                                                                /* ===================== IMPORTS ====================== */
const express = require("express");
const mysql = require("mysql2");


                                                                /* ============== EXPRESS INITIALIZATION ============== */
const PORT = process.env.PORT || 3001;                          /* Define Express server port                           */
const app = express();                                          /* Initialize express framework                         */

                                                                /* Define middleware to use for server                  */
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use((req, res) => res.status(404).end());

                                                                /* Create connection to employee tracker database       */
const connection = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "mysql",
        database: "employeetracker_db"
    },
    console.log("Connected to the employeetracker_db database")
);

                                                                /* ===================== ROUTES ======================= */
                                                                
                                                                /* Route to view all employees                          */
app.get("/api/employees", (req, res) => {
    const sql = `SELECT * FROM employee`;
    connection.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ employees: rows });
    });
});

                                                                /* Have server listen to dedicated port                 */
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});