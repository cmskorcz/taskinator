const formEl = document.querySelector("#task-form")
const tasksToDoEl = document.querySelector("#tasks-to-do");
const pageContentEl = document.querySelector("#page-content");

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
            type: taskTypeInput
        };
        
        createTaskEl(taskDataObj);
    };
};

const completeEditTask = (taskName, taskType, taskId) => {

    let taskSelected = document.querySelector(`.task-item[data-task-id='${taskId}']`);

    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

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

};

formEl.addEventListener("submit", taskFormHandler);
pageContentEl.addEventListener("click", taskButtonHandler);