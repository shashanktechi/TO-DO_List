const db = require("./db");

db.query("SELECT * FROM tasks1", (err, results) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(results);
});