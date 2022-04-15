const formEl = document.querySelector("#task-form")
const tasksToDoEl = document.querySelector("#tasks-to-do");
const pageContentEl = document.querySelector("#page-content");
const tasksInProgressEl = document.querySelector("#tasks-in-progress");
const tasksCompletedEl = document.querySelector("#tasks-completed");

let tasks = [];

// Sets starting ID for tasks
let taskIdCounter = 0;

// Saves User input as an object in taskDataObj
const taskFormHandler = (event) => {
    event.preventDefault();
    let taskNameInput = document.querySelector("input[name='task-name']").value;
    let taskTypeInput = document.querySelector("select[name='task-type']").value;

    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }

    formEl.reset();

    let isEdit = formEl.hasAttribute("data-task-id");

    // Pass taskDataObj as argument into createTaskEl()
    if (isEdit) {

        let taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    } else {

        let taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput,
            status: "to do"
        };
        
        createTaskEl(taskDataObj);
    };
};

const completeEditTask = (taskName, taskType, taskId) => {

    let taskSelected = document.querySelector(`.task-item[data-task-id='${taskId}']`);

    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        } 
    };

    saveTasks();

    alert("Task Updated!");
    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
}

// Function accepts argument that is used to append li to ul
const createTaskEl = (taskDataObj) => {
    let listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    
    //Assign id to task 
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    let taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = `<h3 class="task-name">${taskDataObj.name}</h3><span class="task-type">${taskDataObj.type}</span>`;

    // Appends div containing task info into li
    listItemEl.appendChild(taskInfoEl);

    taskActionsEl = createTaskActions(taskIdCounter);

    // Appends Edit, Delete, and Task Options
    listItemEl.appendChild(taskActionsEl);

    // Appends li into ul
    tasksToDoEl.appendChild(listItemEl);

    // Adds id to task object
    taskDataObj.id = taskIdCounter;
    tasks.push(taskDataObj);

    saveTasks();

    taskIdCounter++;
};

const createTaskActions = (taskId) => {

    let actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    let editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    let deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);
    
    let statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    const statusChoices = ["To Do", "In Progress", "Completed"];

    for (let i = 0; i < statusChoices.length; i++) {
        let statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        statusSelectEl.appendChild(statusOptionEl);

    };

    actionContainerEl.appendChild(statusSelectEl);

    return actionContainerEl;

};

const taskButtonHandler = (event) => {
    
    let targetEl = event.target;

    if (targetEl.matches(".edit-btn")) {

        let taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);

    } else if (targetEl.matches(".delete-btn")) {

        let taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    };

};

const editTask = (taskId) => {

    let taskSelected = document.querySelector(`.task-item[data-task-id="${taskId}"]`);

    let taskName = taskSelected.querySelector("h3.task-name").textContent;

    let taskType = taskSelected.querySelector("span.task-type").textContent;

    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save Task";
    formEl.setAttribute("data-task-id", taskId);
};

const deleteTask = (taskId) => {
    
    let taskSelected = document.querySelector(`.task-item[data-task-id="${taskId}"]`);
    taskSelected.remove();

    let updatedTaskArr = [];
    
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id !== parseInt(taskId)) {
            updatedTaskArr.push(tasks[i]);
        }
    }

    tasks = updatedTaskArr;
    saveTasks();

};

const taskStatusChangeHandler = (event) => {
    let taskId = event.target.getAttribute("data-task-id");

    let statusValue = event.target.value.toLowerCase();

    let taskSelected = document.querySelector(`.task-item[data-task-id='${taskId}']`);

    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
    } else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
    } else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
    };

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].status = statusValue;
        }
    };

    saveTasks();

};

const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

formEl.addEventListener("submit", taskFormHandler);
pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);