const formEl = document.querySelector("#task-form")
const tasksToDoEl = document.querySelector("#tasks-to-do");

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

    let taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    // Pass taskDataObj as argument into createTaskEl()
    createTaskEl(taskDataObj);
};

// Function accepts argument that is used to append li to ul
const createTaskEl = (taskDataObj) => {
    let listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    let taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = `<h3 class="task-name">${taskDataObj.name}</h3><span class="task-type">${taskDataObj.type}</span>`;

    // Appends div containing task info into li
    listItemEl.appendChild(taskInfoEl);

    // Appends li into ul
    tasksToDoEl.appendChild(listItemEl);
}

formEl.addEventListener("submit", taskFormHandler);