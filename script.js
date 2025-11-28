const API_URL = "https://to-do-task-js3c.onrender.com";

// Load tasks when page opens
async function loadTasks() {
    const res = await fetch(`${API_URL}/tasks`);
    const tasks = await res.json();

    const list = document.getElementById("task-list");
    list.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.textContent = task.title;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => deleteTask(task._id);

        li.appendChild(deleteBtn);
        list.appendChild(li);
    });
}

// Add new task
async function addTask() {
    const title = document.getElementById("task-input").value.trim();
    if (!title) return alert("Enter a task!");

    await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title })
    });

    document.getElementById("task-input").value = "";
    loadTasks();
}

// Delete task
async function deleteTask(id) {
    await fetch(`${API_URL}/tasks/${id}`, {
        method: "DELETE"
    });

    loadTasks();
}

// Load tasks on page load
window.onload = loadTasks;
