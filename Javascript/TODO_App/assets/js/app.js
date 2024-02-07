const taskInput = document.getElementById('input-box');
const dueDateInput = document.getElementById('due-date-input');
const prioritySelect = document.getElementById('priority-select');
const listContainer = document.getElementById('task-list');
const filterSelect = document.getElementById('filter-select');
const addTaskButton = document.getElementById('add-task');
const updateTaskButton = document.getElementById('update-task');
let tasks = [];

function addTask() {
    if (taskInput.value.trim() === '') {
        alert('You must write something!');
        return;
    }

    const task = {
        id: Date.now(),
        task: taskInput.value.trim(),
        dueDate: dueDateInput.value,
        createdOn: new Date(),
        status: 'pending',
        priority: prioritySelect.value
    };
    tasks.push(task);
    renderTasks();
    taskInput.value = '';
    dueDateInput.value = '';
    saveTaskData();
}

function renderTasks() {
    listContainer.innerHTML = '';
    tasks.forEach(task => {
        if (filterSelect.value === 'all' || task.status === filterSelect.value) {
            const li = document.createElement('li');
            li.textContent = task.task + " - Due: " + task.dueDate + " - Priority: " + task.priority;
            li.dataset.id = task.id;
            li.dataset.priority = task.priority;
            li.dataset.dueDate = task.dueDate;
            li.classList.add(task.status);
            li.style.color = getPriorityColor(task.priority);
            if (task.status === 'completed') {
                li.classList.add('checked');
            }
            listContainer.appendChild(li);

            let span = document.createElement('span');
            span.innerHTML = "✘";
            li.appendChild(span);

            let editBtn = document.createElement('button');
            editBtn.textContent = "✎";
            editBtn.classList.add('edit-button');
            editBtn.onclick = function () { editTask(task.id) };
            li.appendChild(editBtn);
        }
    });
}

function getPriorityColor(priority) {
    switch (priority) {
        case 'low':
            return 'black';
        case 'medium':
            return 'orange';
        case 'high':
            return 'red';
    }
}


function updateTask(taskIndex) {
    if (taskInput.value.trim() === '') {
        alert('You must write something!');
        return;
    }
    tasks[taskIndex].task = taskInput.value.trim();
    tasks[taskIndex].dueDate = dueDateInput.value;
    tasks[taskIndex].priority = prioritySelect.value;
    renderTasks();
    taskInput.value = '';
    dueDateInput.value = '';
    updateTaskButton.style.display = 'none';
    addTaskButton.style.display = 'inline-block';
    saveTaskData();
}

function editTask(taskId) {
    const taskIndex = tasks.findIndex(task => task.id == taskId);
    const task = tasks[taskIndex];
    taskInput.value = task.task;
    dueDateInput.value = task.dueDate;
    prioritySelect.value = task.priority;

    updateTaskButton.onclick = function() {
        updateTask(taskIndex);
    };

    updateTaskButton.style.display = 'inline-block';
    addTaskButton.style.display = 'none';
}

listContainer.addEventListener('click', function (e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('checked');
        const taskId = e.target.dataset.id;
        const taskIndex = tasks.findIndex(task => task.id == taskId);
        tasks[taskIndex].status = tasks[taskIndex].status === 'pending' ? 'completed' : 'pending';
        saveTaskData();
    } else if (e.target.tagName === 'SPAN') {
        const confirmDelete = confirm("Are you sure you want to delete this task?");
        if (confirmDelete) {
            const taskId = e.target.parentElement.dataset.id;
            const taskIndex = tasks.findIndex(task => task.id == taskId);
            tasks.splice(taskIndex, 1);
            e.target.parentElement.remove();
            saveTaskData();
        }
    }
}, false);

filterSelect.addEventListener('change', function () {
    renderTasks();
});

function saveTaskData() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function showTaskData() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        renderTasks();
    }
}

showTaskData();