const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// ===========================
// HOME ROUTE
// ===========================

app.get("/", (req, res) => {
    res.send("TO-DO API Running Successfully");
});

// ===========================
// GET TASKS OF LOGGED USER
// ===========================

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

            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }

            res.json(results);
        }
    );
});

// ===========================
// ADD TASK
// ===========================

app.post("/tasks", (req, res) => {

    const {
        title,
        description,
        priority,
        due_date,
        user_id
    } = req.body;

    const formattedDueDate =
        due_date && due_date.trim() !== ""
            ? due_date
            : null;

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
            formattedDueDate,
            user_id
        ],
        (err, result) => {

            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }

            res.json({
                message: "Task Added Successfully"
            });
        }
    );
});

// ===========================
// UPDATE TASK STATUS
// ===========================

app.put("/tasks/:id", (req, res) => {

    const id = req.params.id;

    const { status } = req.body;

    db.query(
        `
        UPDATE tasks1
        SET status=?
        WHERE id=?
        `,
        [status, id],
        (err, result) => {

            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }

            res.json({
                message: "Task Updated Successfully"
            });
        }
    );
});

// ===========================
// DELETE TASK
// ===========================

app.delete("/tasks/:id", (req, res) => {

    const id = req.params.id;

    db.query(
        `
        DELETE FROM tasks1
        WHERE id=?
        `,
        [id],
        (err, result) => {

            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }

            res.json({
                message: "Task Deleted Successfully"
            });
        }
    );
});

// ===========================
// REGISTER
// ===========================

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
        `
        INSERT INTO users
        (
            name,
            dob,
            gender,
            email,
            mobile,
            username,
            password
        )
        VALUES
        (?,?,?,?,?,?,?)
        `,
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
                console.log(err);
                return res.status(500).json(err);
            }

            res.json({
                message: "Registration Successful"
            });
        }
    );
});

// ===========================
// LOGIN
// ===========================

app.post("/login", (req, res) => {

    const { login, password } = req.body;

    db.query(
        `
        SELECT *
        FROM users
        WHERE (username=? OR email=?)
        AND password=?
        `,
        [login, login, password],
        (err, results) => {

            if (err) {
                console.log(err);
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

// ===========================
// UPDATE PROFILE
// ===========================

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
        (err, result) => {

            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }

            res.json({
                message: "Profile Updated Successfully"
            });
        }
    );
});

// ===========================
// CHANGE PASSWORD
// ===========================

app.put("/change-password/:id", (req, res) => {

    const id = req.params.id;

    const {
        oldPassword,
        newPassword
    } = req.body;

    db.query(
        `
        SELECT *
        FROM users
        WHERE id=?
        `,
        [id],
        (err, result) => {

            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }

            if (result.length === 0) {

                return res.json({
                    message: "User not found"
                });
            }

            if (
                result[0].password !== oldPassword
            ) {

                return res.json({
                    message: "Current password incorrect"
                });
            }

            db.query(
                `
                UPDATE users
                SET password=?
                WHERE id=?
                `,
                [newPassword, id],
                (err, updateResult) => {

                    if (err) {
                        console.log(err);
                        return res.status(500).json(err);
                    }

                    res.json({
                        message:
                        "Password Updated Successfully"
                    });
                }
            );
        }
    );
});

// ===========================
// START SERVER
// ===========================

const PORT = 3000;

app.listen(PORT, () => {

    console.log(
        `Server running on port ${PORT}`
    );

});