window.addEventListener('DOMContentLoaded', loadTasks);

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// -------------------------
// ADD TASK
// -------------------------
addBtn.addEventListener("click", async function () {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    // Send task to backend
    const res = await fetch("https://to-do-task-ssai.onrender.com/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: taskText })
    });

    const newTask = await res.json();

    addTaskToUI(newTask); // Add to UI
    taskInput.value = ""; // Clear input
});

// -------------------------
// ADD TASK TO UI
// -------------------------
function addTaskToUI(task) {
    const li = document.createElement("li");

    const textSpan = document.createElement("span");
    textSpan.textContent = task.title;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("deleteBtn");

    // Delete from backend + UI
    deleteBtn.addEventListener("click", async function () {
        await fetch(`https://to-do-task-ssai.onrender.com/tasks/${task._id}`, {
            method: "DELETE"
        });

        li.remove(); // remove from UI
    });

    li.appendChild(textSpan);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

// -------------------------
// LOAD ALL TASKS FROM BACKEND
// -------------------------
async function loadTasks() {
    const res = await fetch("https://to-do-task-ssai.onrender.com/tasks");
    const tasks = await res.json();

    taskList.innerHTML = ""; // Clear UI
    tasks.forEach(task => addTaskToUI(task));
}
