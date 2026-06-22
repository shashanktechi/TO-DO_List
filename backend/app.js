const express = require("express");
const db = require("./db");

const app = express();

app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.send("TO-DO API Running Successfully");
});

// GET ALL TASKS
app.get("/tasks", (req, res) => {
  db.query("SELECT * FROM tasks1", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: "Failed to fetch tasks"
      });
    }

    res.json(results);
  });
});

// ADD TASK
app.post("/tasks", (req, res) => {

  if (!req.body || !req.body.title) {
    return res.status(400).json({
      message: "Title is required"
    });
  }

  const title = req.body.title;

  db.query(
    "INSERT INTO tasks1(title) VALUES(?)",
    [title],
    (err, result) => {

      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }

      res.status(201).json({
        message: "Task Added Successfully",
        id: result.insertId
      });
    }
  );
});
// UPDATE TASK
app.put("/tasks/:id", (req, res) => {

  if (!req.body) {
    return res.status(400).json({
      message: "Request body is required"
    });
  }

  const id = req.params.id;
  const title = req.body.title;
  const status = req.body.status;

  db.query(
    "UPDATE tasks1 SET title=?, status=? WHERE id=?",
    [title, status, id],
    (err, result) => {

      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }

      res.json({
        message: "Task Updated Successfully"
      });
    }
  );
});
// DELETE TASK
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM tasks1 WHERE id=?",
    [id],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          message: "Failed to delete task"
        });
      }

      res.json({
        message: "Task Deleted Successfully"
      });
    }
  );
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});