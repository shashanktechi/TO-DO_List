const express = require("express");

const app = express();

app.use(express.json());

let tasks = [
  { id: 1, title: "Learn Node.js", status: "Pending" },
  { id: 2, title: "Build To-Do API", status: "Completed" }
];

// Home Route
app.get("/", (req, res) => {
  res.send("TO-DO API Running Successfully");
});

// Get All Tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Add New Task
app.post("/tasks", (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    status: "Pending"
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});