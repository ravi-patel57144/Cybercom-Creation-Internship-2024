const taskInput = document.getElementById('input-box');
const dueDateInput = document.getElementById('due-date-input');
const prioritySelect = document.getElementById('priority-select');
const listContainer = document.getElementById('task-list');
const filterSelect = document.getElementById('filter-select');
const addTaskButton = document.getElementById('add-task');
const updateTaskButton = document.getElementById('update-task');
let tasks = [];

function addCategory() {
    const categoryInput = document.getElementById('category-input');
    const category = categoryInput.value.trim();
    if (category === '') {
        alert('Please enter a category!');
        categoryInput.value = '';
        return;
    }

    const existingCategories = JSON.parse(localStorage.getItem('categories')) || [];
    if (existingCategories.includes(category)) {
        alert('Category already exists!');
        categoryInput.value = '';
        return;
    }

    const categorySpan = document.createElement('span');
    categorySpan.textContent = category;
    categorySpan.id = 'todo-category';
    document.querySelector('.categoryList-container').appendChild(categorySpan);

    const categoryButton = document.createElement('input');
    categoryButton.type = 'button';
    categoryButton.value = '+';
    categoryButton.onclick = function () { addTaskToCategory(category); };
    document.querySelector('.categoryList-container').appendChild(categoryButton);

    saveCategoryData(category);
    categoryInput.value = '';
}

function saveCategoryData(category) {
    let categories = JSON.parse(localStorage.getItem('categories')) || [];
    categories.push(category);
    localStorage.setItem('categories', JSON.stringify(categories));
}

function renderCategories() {
    const categoryContainer = document.querySelector('.categoryList-container');
    categoryContainer.innerHTML = '';

    const categories = JSON.parse(localStorage.getItem('categories')) || [];

    categories.forEach(category => {
        const categorySpan = document.createElement('span');
        categorySpan.textContent = category;
        categorySpan.id = 'todo-category';
        categoryContainer.appendChild(categorySpan);

        const categoryButton = document.createElement('input');
        categoryButton.type = 'button';
        categoryButton.value = '+';
        categoryButton.onclick = function () { addTaskToCategory(category); };
        categoryContainer.appendChild(categoryButton);
    });
}

function addTask() {
    if (taskInput.value.trim() === '') {
        alert('You must write something!');
        taskInput.value = '';
        return;
    }

    const task = {
        id: Date.now(),
        task: taskInput.value.trim(),
        dueDate: dueDateInput.value,
        createdOn: new Date(),
        status: 'pending',
        priority: prioritySelect.value,
        category: 'TODO'
    };
    tasks.push(task);
    renderTasks();
    taskInput.value = '';
    dueDateInput.value = '';
    saveTaskData();
}

function addTaskToCategory(category) {
    const taskDescription = taskInput.value.trim();
    if (taskDescription === '') {
        alert('Please enter a task description!');
        return;
    }

    const taskId = Date.now();

    const task = {
        id: taskId,
        task: taskDescription,
        dueDate: dueDateInput.value,
        createdOn: new Date(),
        status: 'pending',
        priority: prioritySelect.value,
        category: category
    };
    tasks.push(task);
    renderTasks();
    taskInput.value = '';
    dueDateInput.value = '';
    saveTaskData();

}


function renderTasks() {
    listContainer.innerHTML = '';
    const selectedCategory = filterSelect.value;
    tasks.forEach(task => {
        if ((selectedCategory === 'all' || task.category === selectedCategory) &&
            (task.status === filterSelect.value || filterSelect.value === 'all')) {
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

filterSelect.addEventListener('change', function () {
    renderTasks();
});


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

    updateTaskButton.onclick = function () {
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
renderCategories();
