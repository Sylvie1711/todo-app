document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById("task-form");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    // 📌 Load tasks from localStorage
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        taskList.innerHTML = ''; // Clear current list
        tasks.forEach(task => {
            const taskItem = createTaskItem(task.text, task.completed);
            taskList.appendChild(taskItem);
        });
    };

    // 📌 Save tasks to localStorage
    const saveTasks = (tasks) => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    // 📌 Create a new task item
    const createTaskItem = (taskText, completed = false) => {
        const taskItem = document.createElement("li");
        taskItem.className = "flex justify-between items-center bg-gray-200 p-2 rounded-md shadow-sm";

        // 📌 Task Text
        const taskSpan = document.createElement("span");
        taskSpan.textContent = taskText;
        taskSpan.className = "text-gray-800 flex-grow";
        if (completed) {
            taskSpan.classList.add("line-through", "text-gray-500");
        }

        // 📌 Complete Button
        const completeButton = document.createElement("button");
        completeButton.textContent = "✔";
        completeButton.className = "bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 mr-2";
        
        completeButton.addEventListener("click", () => {
            taskSpan.classList.toggle("line-through");
            taskSpan.classList.toggle("text-gray-500");
            updateLocalStorage();
        });

        // 📌 Delete Button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "✖";
        deleteButton.className = "bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600";
        
        deleteButton.addEventListener("click", () => {
            taskItem.remove();
            updateLocalStorage();
        });

        // 📌 Append elements
        taskItem.appendChild(taskSpan);
        taskItem.appendChild(completeButton);
        taskItem.appendChild(deleteButton);
        
        return taskItem;
    };

    // 📌 Update localStorage when tasks change
    const updateLocalStorage = () => {
        const tasks = [];
        document.querySelectorAll("#task-list li").forEach(taskItem => {
            const taskText = taskItem.querySelector("span").textContent;
            const isCompleted = taskItem.querySelector("span").classList.contains("line-through");
            tasks.push({ text: taskText, completed: isCompleted });
        });
        saveTasks(tasks);
    };

    // 📌 Handle form submission (Add task)
    taskForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText === "") return;

        const taskItem = createTaskItem(taskText);
        taskList.appendChild(taskItem);
        updateLocalStorage();

        taskInput.value = "";
    });

    // 📌 Load tasks when the page loads
    loadTasks();
});
