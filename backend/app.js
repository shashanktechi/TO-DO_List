const express = require("express");
<<<<<<< HEAD

const app = express();

app.use(express.json());

let tasks = [
  { id: 1, title: "Learn Node.js", status: "Pending" },
  { id: 2, title: "Build To-Do API", status: "Completed" }
];

=======
const db = require("./db");

const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

>>>>>>> frontend
// Home Route
app.get("/", (req, res) => {
  res.send("TO-DO API Running Successfully");
});

<<<<<<< HEAD
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

=======
// GET ALL TASKS
app.get("/tasks/:userId", (req, res) => {

    const userId = req.params.userId;

    db.query(
        `
        SELECT *
        FROM tasks1
        WHERE user_id = ?
        ORDER BY created_at DESC
        `,
        [userId],
        (err, results) => {

            if(err){
                return res.status(500).json(err);
            }

            res.json(results);
        }
    );
});
// ADD TASK
app.post("/tasks", (req, res) => {

    const {
        title,
        description,
        priority,
        due_date,
        user_id
    } = req.body;

    db.query(
        `
        INSERT INTO tasks1
        (
            title,
            description,
            priority,
            due_date,
            status,
            reminder_hours,
            user_id
        )
        VALUES
        (
            ?,?,?,?,
            'Pending',
            5,
            ?
        )
        `,
        [
            title,
            description,
            priority,
            due_date,
            user_id
        ],
        (err, result) => {

            if(err){
                console.log(err);
                return res.status(500).json(err);
            }

            res.json({
                message:"Task Added Successfully"
            });
        }
    );
});
// UPDATE TASK
app.put("/tasks/:id", (req, res) => {

    const id = req.params.id;
    const status = req.body.status;

    db.query(
        "UPDATE tasks1 SET status=? WHERE id=?",
        [status, id],
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
});// DELETE TASK
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
app.post("/register", (req, res) => {

    const {
        name,
        dob,
        gender,
        email,
        mobile,
        username,
        password
    } = req.body;

    db.query(
        `INSERT INTO users
        (name,dob,gender,email,mobile,username,password)
        VALUES(?,?,?,?,?,?,?)`,
        [
            name,
            dob,
            gender,
            email,
            mobile,
            username,
            password
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Registration Successful"
            });
        }
    );
});
app.post("/login", (req, res) => {

    const { login, password } = req.body;

    db.query(
        `SELECT * FROM users
         WHERE (username=? OR email=?)
         AND password=?`,
        [login, login, password],
        (err, results) => {

            if (err) {
                return res.status(500).json(err);
            }

            if (results.length === 0) {
                return res.status(401).json({
                    message: "Invalid Credentials"
                });
            }

            res.json({
                message: "Login Successful",
                user: results[0]
            });
        }
    );
});
app.put("/users/:id", (req, res) => {

    const id = req.params.id;

    const {
        name,
        email,
        mobile,
        dob,
        gender
    } = req.body;

    db.query(
        `
        UPDATE users
        SET
        name=?,
        email=?,
        mobile=?,
        dob=?,
        gender=?
        WHERE id=?
        `,
        [
            name,
            email,
            mobile,
            dob,
            gender,
            id
        ],
        (err,result)=>{

            if(err){

                console.log(err);

                return res.status(500)
                .json(err);
            }

            res.json({
                message:
                "Profile Updated"
            });

        }
    );

});

app.put("/change-password/:id",(req,res)=>{

    const id = req.params.id;

    const {
        oldPassword,
        newPassword
    } = req.body;

    db.query(
        "SELECT * FROM users WHERE id=?",
        [id],
        (err,result)=>{

            if(err)
                return res.status(500).json(err);

            if(result.length===0){

                return res.json({
                    message:"User not found"
                });
            }

            if(
                result[0].password !==
                oldPassword
            ){

                return res.json({
                    message:
                    "Current password incorrect"
                });
            }

            db.query(
                "UPDATE users SET password=? WHERE id=?",
                [newPassword,id],
                (err)=>{

                    if(err)
                        return res.status(500)
                        .json(err);

                    res.json({
                        message:
                        "Password Updated Successfully"
                    });

                }
            );
        }
    );
});
>>>>>>> frontend
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});