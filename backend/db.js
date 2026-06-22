const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Dany@8712",
  database: "todo_app"
});

db.connect((err) => {
  if (err) {
    console.log("Database Connection Failed");
    return;
  }

  console.log("MySQL Connected");
});

module.exports = db;