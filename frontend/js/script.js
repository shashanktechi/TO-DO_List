// ==========================
// TASKFLOW SCRIPT.JS
// ==========================

// Logged-in user
const user =
JSON.parse(localStorage.getItem("user"));

// If user not logged in
if (!user) {

    window.location.href =
    "login.html";
}

// Backend URL
const API_URL =
"http://localhost:3000/tasks";


// ==========================
// LOAD TASKS
// ==========================

async function loadTasks() {

    try {

        const response =
        await fetch(
            `${API_URL}/${user.id}`
        );

        const tasks =
        await response.json();

        const taskList =
        document.getElementById("taskList");

        taskList.innerHTML = "";

        // No Tasks
        if(tasks.length === 0){

            taskList.innerHTML = `
            <div class="task-card">
                <h3>No Tasks Found</h3>
                <p>Create your first task.</p>
            </div>
            `;

            return;
        }

        tasks.forEach(task => {

            let timeLeft =
            "No Due Date";

            // Calculate countdown
            if(task.due_date){

                const dueDate =
                new Date(task.due_date);

                const now =
                new Date();

                const diff =
                dueDate - now;

                if(diff > 0){

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

                }else{

                    timeLeft =
                    "⚠️ Overdue";
                }
            }

            taskList.innerHTML += `

            <div class="task-card">

                <h3>
                    ${task.title}
                </h3>

                <p class="description">
                    ${task.description || "No Description"}
                </p>

                <br>

                <p>
                    🔥 Priority:
                    <span class="
                    priority-${(task.priority || "Low").toLowerCase()}
                    ">
                    ${task.priority || "Low"}
                    </span>
                </p>

                <p>
                    📌 Status:
                    <span class="
                    ${
                        task.status === "Completed"
                        ? "completed"
                        : "pending"
                    }
                    ">
                    ${task.status}
                    </span>
                </p>

                <p class="timer">
                    ⏰ ${timeLeft}
                </p>

                <div class="task-actions">

                    <button
                    class="complete-btn"
                    onclick="completeTask(${task.id})">

                        Complete

                    </button>

                    <button
                    class="delete-btn"
                    onclick="deleteTask(${task.id})">

                        Delete

                    </button>

                </div>

            </div>
            `;
        });

    } catch(error){

        console.error(error);

        alert(
            "Failed to load tasks"
        );
    }
}


// ==========================
// ADD TASK
// ==========================

async function addTask() {

    const title =
    document.getElementById(
        "taskInput"
    ).value.trim();

    const description =
    document.getElementById(
        "description"
    ).value.trim();

    const priority =
    document.getElementById(
        "priority"
    ).value;

    const due_date =
    document.getElementById(
        "dueDate"
    ).value;

    // Validation
    if(!title){

        alert(
            "Task Title Required"
        );

        return;
    }

    try {

        await fetch(
            API_URL,
            {
                method:"POST",

                headers:{
                    "Content-Type":
                    "application/json"
                },

                body:JSON.stringify({

                    title,
                    description,
                    priority,
                    due_date,

                    // Save task for current user
                    user_id:user.id
                })
            }
        );

        // Clear form
        document.getElementById(
            "taskInput"
        ).value = "";

        document.getElementById(
            "description"
        ).value = "";

        document.getElementById(
            "dueDate"
        ).value = "";

        loadTasks();

    } catch(error){

        console.error(error);

        alert(
            "Unable to add task"
        );
    }
}


// ==========================
// COMPLETE TASK
// ==========================

async function completeTask(id){

    try {

        await fetch(
            `${API_URL}/${id}`,
            {
                method:"PUT",

                headers:{
                    "Content-Type":
                    "application/json"
                },

                body:JSON.stringify({
                    status:"Completed"
                })
            }
        );

        loadTasks();

    } catch(error){

        console.error(error);
    }
}


// ==========================
// DELETE TASK
// ==========================

async function deleteTask(id){

    const confirmDelete =
    confirm(
        "Delete this task?"
    );

    if(!confirmDelete){
        return;
    }

    try {

        await fetch(
            `${API_URL}/${id}`,
            {
                method:"DELETE"
            }
        );

        loadTasks();

    } catch(error){

        console.error(error);
    }
}


// ==========================
// INITIAL LOAD
// ==========================

loadTasks();


// Refresh every 1 minute
setInterval(
    loadTasks,
    60000
);