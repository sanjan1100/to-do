window.addEventListener('DOMContentLoaded', loadTasks);

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

addBtn.addEventListener("click", function () {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    addTaskToUI(taskText);
    saveTask(taskText);
    taskInput.value = "";
});

function addTaskToUI(taskText) {
    const li = document.createElement("li");

    const textSpan = document.createElement("span");
    textSpan.textContent = taskText;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("deleteBtn");

    deleteBtn.addEventListener("click", function () {
        li.remove();
        deleteTaskFromStorage(taskText);
    });

    li.appendChild(textSpan);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTaskToUI(task));
}

function deleteTaskFromStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(t => t !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
