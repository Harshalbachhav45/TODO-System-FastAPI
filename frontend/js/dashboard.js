let editTaskId = null;

// Create Task

function createTask() {

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const priority = document.getElementById("priority").value;
    const status = document.getElementById("status").value;

    fetch("http://127.0.0.1:8000/tasks", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            title: title,
            description: description,
            priority: priority,
            status: status
        })

    })

    .then(response => response.json())

    .then(data => {

        alert(data.message);

        clearForm();

        getTasks();

    })

    .catch(error => console.log(error));

}



// Load All Tasks

function getTasks() {

    fetch("http://127.0.0.1:8000/tasks")

    .then(response => response.json())

    .then(data => {

        let output = "";

        data.tasks.forEach(task => {

            output += `
            <div class="task-card">

                <h3>${task.title}</h3>

                <p>${task.description}</p>

                <p><strong>Priority:</strong> ${task.priority}</p>

                <p><strong>Status:</strong> ${task.status}</p>

                <button onclick="editTask(${task.id})">
                    Edit
                </button>

                <button onclick="deleteTask(${task.id})">
                    Delete
                </button>

                <hr>

            </div>
            `;

        });

        document.getElementById("taskList").innerHTML = output;

    })

    .catch(error => console.log(error));

}



// Edit Task
function editTask(id) {

    fetch(`http://127.0.0.1:8000/tasks/${id}`)
    .then(response => response.json())
    .then(task => {

    console.log(task);

    alert(JSON.stringify(task));

    document.getElementById("title").value = task.title;
    document.getElementById("description").value = task.description;
    document.getElementById("priority").value = task.priority;
    document.getElementById("status").value = task.status;

    editTaskId = task.id;

    document.getElementById("taskButton").innerText = "Update Task";

})
}
// Save Task

function saveTask() {

    if(editTaskId == null){

        createTask();

    }

    else{

        updateTask();

    }

}



// Update Task

function updateTask() {

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const priority = document.getElementById("priority").value;
    const status = document.getElementById("status").value;

    fetch(`http://127.0.0.1:8000/tasks/${editTaskId}`, {

        method: "PUT",

        headers: {
            "Content-Type":"application/json"
        },

        body: JSON.stringify({

            title:title,
            description:description,
            priority:priority,
            status:status

        })

    })

    .then(response => response.json())

    .then(data => {

        alert(data.message);

        editTaskId = null;

        document.getElementById("taskButton").innerText = "Add Task";

        clearForm();

        getTasks();

    })

    .catch(error => console.log(error));

}



// Delete Task

function deleteTask(id) {

    if(!confirm("Delete this task?")){

        return;

    }

    fetch(`http://127.0.0.1:8000/tasks/${id}`,{

        method:"DELETE"

    })

    .then(response=>response.json())

    .then(data=>{

        alert(data.message);

        getTasks();

    })

    .catch(error=>console.log(error));

}



// Clear Form

function clearForm(){

    document.getElementById("title").value="";
    document.getElementById("description").value="";
    document.getElementById("priority").value="low";
    document.getElementById("status").value="pending";

}



// Load Tasks

getTasks();