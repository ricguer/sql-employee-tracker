                                                                /* ===================== IMPORTS ====================== */
const express = require("express");
const mysql = require("mysql2");


                                                                /* ============== EXPRESS INITIALIZATION ============== */
const PORT = process.env.PORT || 3001;                          /* Define Express server port                           */
const app = express();                                          /* Initialize express framework                         */

                                                                /* Define middleware to use for server                  */
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

                                                                /* Create connection to employee tracker database       */
const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "mysql",
        database: "employeeTracker_db"
    }
)

                                                                /* Have server listen to dedicated port                 */
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});