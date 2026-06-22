// Get logged in user
const user = JSON.parse(
    localStorage.getItem("user")
);

// Redirect if not logged in
if (!user) {
    window.location.href = "login.html";
}

// Show username
document.getElementById("welcome").innerText =
    `Welcome, ${user.name} 👋`;

document.getElementById("profileName").innerText =
    user.name;


// Load Dashboard Statistics
async function loadStats() {

    try {

        // Get only current user's tasks
        const response = await fetch(
            `http://localhost:3000/tasks/${user.id}`
        );

        const tasks = await response.json();

        console.log("Tasks:", tasks);

        // Statistics
        const totalTasks = tasks.length;

        const completedTasks = tasks.filter(
            task => task.status === "Completed"
        ).length;

        const pendingTasks = tasks.filter(
            task => task.status === "Pending"
        ).length;

        const overdueTasks = tasks.filter(task => {

            if (!task.due_date) return false;

            return (
                new Date(task.due_date) < new Date() &&
                task.status !== "Completed"
            );

        }).length;

        // Display Statistics
        document.getElementById("totalTasks").innerText =
            totalTasks;

        document.getElementById("completedTasks").innerText =
            completedTasks;

        document.getElementById("pendingTasks").innerText =
            pendingTasks;

        // Optional card
        const overdueElement =
            document.getElementById("overdueTasks");

        if (overdueElement) {
            overdueElement.innerText =
                overdueTasks;
        }

        // Recent Tasks
        const recentTasks =
            document.getElementById("recentTasks");

        recentTasks.innerHTML = "";

        tasks
            .sort(
                (a, b) =>
                    new Date(b.created_at) -
                    new Date(a.created_at)
            )
            .slice(0, 5)
            .forEach(task => {

                let timeLeft = "No Due Date";

                if (task.due_date) {

                    const dueDate =
                        new Date(task.due_date);

                    const now =
                        new Date();

                    const diff =
                        dueDate - now;

                    if (diff > 0) {

                        const days =
                            Math.floor(
                                diff /
                                (1000 * 60 * 60 * 24)
                            );

                        const hours =
                            Math.floor(
                                (
                                    diff %
                                    (1000 * 60 * 60 * 24)
                                ) /
                                (1000 * 60 * 60)
                            );

                        timeLeft =
                            `${days} Days ${hours} Hours Left`;

                    } else {

                        timeLeft =
                            "⚠️ Overdue";
                    }
                }

                recentTasks.innerHTML += `
                    <div class="task-row">

                        <div>

                            <strong>
                                ${task.title}
                            </strong>

                            <br>

                            <small>
                                ${timeLeft}
                            </small>

                        </div>

                        <span class="${
                            task.status === "Completed"
                                ? "completed"
                                : "pending"
                        }">

                            ${task.status}

                        </span>

                    </div>
                `;
            });

    } catch (error) {

        console.error(
            "Dashboard Error:",
            error
        );

    }
}


// Logout
function logout() {

    localStorage.removeItem("user");

    window.location.href =
        "login.html";
}


// Load Dashboard
loadStats();