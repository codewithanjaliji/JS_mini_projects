document.addEventListener("DOMContentLoaded", function () {
    // Get tasks from localStorage on page load
    const tasks = getData("tasks") || [];

    // Display tasks on the page
    displayTasks(tasks);

    // Add task button click event
    document.getElementById("addButton").addEventListener("click", function () {
        const taskInput = document.getElementById("taskInput");
        const taskText = taskInput.value.trim();

        if (taskText !== "") {
            // Add task to the tasks array
            tasks.push(taskText);

            // Save tasks to localStorage
            setData("tasks", tasks);

            // Display updated tasks on the page
            displayTasks(tasks);

            // Clear the input field
            taskInput.value = "";
        }
    });

    // Function to display tasks on the page
    function displayTasks(tasks) {
        const taskList = document.getElementById("taskList");
        taskList.innerHTML = "";

        if (tasks.length === 0) {
            taskList.innerHTML = "<p>No tasks yet. Add a task above.</p>";
        } else {
            tasks.forEach(function (task, index) {
                const listItem = document.createElement("li");
                listItem.className = "list-group-item";
                listItem.innerHTML = `
                    ${task}
                    <button type="button" class="close" aria-label="Close" data-index="${index}">
                        <span aria-hidden="true">&times;</span>
                    </button>
                `;
                taskList.appendChild(listItem);
            });

            // Add click event to remove tasks
            taskList.querySelectorAll(".close").forEach(function (closeButton) {
                closeButton.addEventListener("click", function () {
                    const indexToRemove = parseInt(this.getAttribute("data-index"), 10);

                    // Remove task from tasks array
                    tasks.splice(indexToRemove, 1);

                    // Save updated tasks to localStorage
                    setData("tasks", tasks);

                    // Display updated tasks on the page
                    displayTasks(tasks);
                });
            });
        }
    }

    // Function to get data from localStorage
    function getData(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }

    // Function to set data to localStorage
    function setData(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }
});
