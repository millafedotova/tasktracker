// App state
let tasks = [];
let currentFilter = 'all';
let currentTaskId = null;

// Initialize app
function init() {
    tasks = Storage.load();
    setupEventListeners();
    route();
    
    // Handle hash changes
    window.addEventListener('hashchange', route);
}

// Routing logic
function route() {
    const hash = window.location.hash || '#/tasks';
    const parts = hash.split('/').filter(Boolean);
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === hash);
    });
    
    if (hash === '#/tasks') {
        renderTasks();
    } else if (hash === '#/add') {
        renderForm();
    } else if (parts[0] === 'tasks' && parts[1]) {
        renderDetails(parts[1]);
    } else if (parts[0] === 'edit' && parts[1]) {
        renderForm({ id: parts[1] }, true);
    } else {
        window.location.hash = '#/tasks';
    }
}

// Render functions
function renderTasks() {
    const html = UI.tasksView({ tasks, filter: currentFilter });
    document.getElementById('app').innerHTML = html;
}

function renderDetails(id) {
    const task = tasks.find(t => t.id == id);
    const html = UI.detailsView({ task });
    document.getElementById('app').innerHTML = html;
}

function renderForm(task = {}, isEdit = false) {
    if (isEdit) {
        currentTaskId = task.id;
        const editingTask = tasks.find(t => t.id == task.id);
        task = editingTask || {};
    }
    const html = UI.formView({ task, isEdit });
    document.getElementById('app').innerHTML = html;
}

// Event delegation
function setupEventListeners() {
    document.addEventListener('click', handleClick);
    document.addEventListener('submit', handleSubmit);
    document.addEventListener('change', handleChange);
}

function handleClick(e) {
    const target = e.target;
    
    // Navigation
    if (target.matches('.nav-link')) {
        e.preventDefault();
        return;
    }
    
    // Task actions
    if (target.matches('[data-action="toggle"]')) {
        const id = target.dataset.taskId;
        toggleTask(id);
        route();
    }
    
    if (target.matches('[data-action="delete"]')) {
        if (confirm('Are you sure you want to delete this task?')) {
            deleteTask(target.dataset.taskId);
            route();
        }
    }
    
    // Filters
    if (target.matches('[data-filter]')) {
        currentFilter = target.dataset.filter;
        document.querySelectorAll('[data-filter]').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === currentFilter);
        });
        renderTasks();
    }
}

function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const title = formData.get('title');
    const priority = formData.get('priority');
    
    if (!title.trim()) {
        renderForm({}, window.location.hash.includes('edit'));
        return;
    }
    
    if (window.location.hash.includes('edit')) {
        updateTask(currentTaskId, title, priority);
    } else {
        addTask(title, priority);
    }
    
    window.location.hash = '#/tasks';
}

function handleChange(e) {
    if (e.target.matches('.task-checkbox')) {
        toggleTask(e.target.dataset.taskId);
        route();
    }
}

// Task operations
function addTask(title, priority) {
    const newTask = {
        id: Date.now().toString(),
        title: title.trim(),
        completed: false,
        priority,
        created: new Date().toISOString()
    };
    tasks.unshift(newTask);
    saveTasks();
}

function updateTask(id, title, priority) {
    const task = tasks.find(t => t.id == id);
    if (task) {
        task.title = title.trim();
        task.priority = priority;
        saveTasks();
    }
}

function toggleTask(id) {
    const task = tasks.find(t => t.id == id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id != id);
    saveTasks();
}

function saveTasks() {
    Storage.save(tasks);
}

// Start the app
init();
