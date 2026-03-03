const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// 1. Initialize App: Load data from LocalStorage
document.addEventListener('DOMContentLoaded', loadTasks);

// 2. Add Task Logic
function addTask() {
    const text = taskInput.value.trim();
    if (!text) return;

    const taskObj = { text: text, completed: false };
    
    renderTask(taskObj);
    saveToLocal(taskObj);

    taskInput.value = "";
    taskInput.focus();
}

// 3. Render Task to DOM
function renderTask(taskObj) {
    const li = document.createElement('li');
    li.className = `task-item ${taskObj.completed ? 'is-done' : ''}`;
    
    li.innerHTML = `
        <span>${taskObj.text}</span>
        <button class="delete-btn"><i class="fas fa-trash"></i></button>
    `;

    // Toggle Complete (Bonus Logic)
    li.addEventListener('click', (e) => {
        if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'I') {
            li.classList.toggle('is-done');
            updateLocalStatus(taskObj.text);
        }
    });

    // Delete Logic
    li.querySelector('.delete-btn').addEventListener('click', () => {
        li.remove();
        removeFromLocal(taskObj.text);
    });

    taskList.appendChild(li);
}

// --- LOCAL STORAGE TOOLS ---

function saveToLocal(task) {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks.forEach(task => renderTask(task));
}

function removeFromLocal(text) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks = tasks.filter(t => t.text !== text);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateLocalStatus(text) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach(t => { if(t.text === text) t.completed = !t.completed; });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Event Listeners
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') addTask(); });
