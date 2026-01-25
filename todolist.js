//i just learn how to make a todolist usimg javascript
//and i added some css using gpt 
//here is the code with comments
// Wait until the entire HTML page is loaded

document.addEventListener('DOMContentLoaded', () => {

    // Get input field where user types a task
    const todoInput = document.getElementById("todo-input");

    // Get the "Add Task" button
    const addBtn = document.getElementById("add-task-btn");

    // Get the <ul> where tasks will be displayed
    const todoList = document.getElementById("todo-list");

    // Load tasks from localStorage
    // If nothing is stored, use an empty array
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Display all saved tasks when page loads
    tasks.forEach(task => renderTasks(task));

    // When "Add Task" button is clicked
    addBtn.addEventListener("click", () => {

        // Remove extra spaces from input text
        const taskText = todoInput.value.trim();

        // Do nothing if input is empty
        if (taskText === "") return;

        // Create a new task object
        const newtask = {
            id: Date.now(),       // unique id using current time
            text: taskText,       // task text from input
            completed: false      // task initially not completed
        };

        // Add new task to tasks array
        tasks.push(newtask);

        // Save updated tasks to localStorage
        saveTasks();

        // Show the new task on the screen
        renderTasks(newtask);

        // Clear the input box
        todoInput.value = "";
    });

    // Function to create and display a task in the list
    function renderTasks(task) {

        // Create a list item <li>
        const li = document.createElement("li");

        // Store task id inside li (useful for reference)
        li.setAttribute("data-id", task.id);

        // If task was already completed, add completed style
        if (task.completed) {
            li.classList.add("completed");
        }

        // Add task text and delete button
        li.innerHTML = `
            <span>${task.text}</span>
            <button>Delete</button>
        `;

        // Click on task (NOT delete button) → toggle completed
        li.addEventListener("click", (e) => {

            // If delete button is clicked, ignore this
            if (e.target.tagName === "BUTTON") return;

            // Toggle completed value
            task.completed = !task.completed;

            // Toggle completed class for styling
            li.classList.toggle("completed");

            // Save updated status
            saveTasks();
        });

        // Click on Delete button
        li.querySelector("button").addEventListener("click", (e) => {

            // Stop click from triggering li click event
            e.stopPropagation();

            // Remove task from array (IMPORTANT FIX)
            tasks = tasks.filter(t => t.id !== task.id);

            // Remove task from the screen
            li.remove();

            // Save updated tasks to localStorage
            saveTasks();
        });

        // Add the task to the list
        todoList.appendChild(li);
    }

    // Save tasks array to localStorage
    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

});
