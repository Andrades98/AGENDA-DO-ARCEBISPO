// Objetos
var taskList = [];
var taskForm = document.getElementById('add-task-form');
var taskInput = document.getElementById('task-name');
var categoryInput = document.getElementById('task-category');
var dateInput = document.getElementById('task-date');
var tasksUL = document.getElementById('tasks');

// Adicionar tarefa
function addTask(event) {
    event.preventDefault();
    var taskName = taskInput.value;
    var taskCategory = categoryInput.value;
    var taskDate = dateInput.value;
    var task = { name: taskName, category: taskCategory, date: taskDate, status: 'pending' };
    taskList.push(task);
    saveTaskList();
    renderTaskList();
    taskForm.reset();
    }
    
    // Excluir tarefa
    function removeTask(event) {
    if (event.target.tagName === 'BUTTON') {
    var li = event.target.parentNode;
    var index = Array.prototype.indexOf.call(tasksUL.children, li);
    taskList.splice(index, 1);
    saveTaskList();
    renderTaskList();
    }
    }
    
    // Alterar status da tarefa
    function toggleTaskStatus(event) {
    if (event.target.tagName === 'LI') {
    var li = event.target;
    var index = Array.prototype.indexOf.call(tasksUL.children, li);
    var task = taskList[index];
    if (task.status === 'pending') {
    task.status = 'completed';
    } else {
    task.status = 'pending';
    }
    saveTaskList();
    renderTaskList();
    }
    }
    
    // Salvar lista de tarefas no localStorage
    function saveTaskList() {
    localStorage.setItem('taskList', JSON.stringify(taskList));
    }
    
    // Recuperar lista de tarefas do localStorage
    function loadTaskList() {
    var savedTaskList = localStorage.getItem('taskList');
    if (savedTaskList) {
    taskList = JSON.parse(savedTaskList);
    }
    }
    
    // Renderizar lista de tarefas
    function renderTaskList() {
    tasksUL.innerHTML = '';
    taskList.sort(function(a, b) {
    return new Date(a.date) - new Date(b.date);
    });
    taskList.forEach(function(task, index) {
    var li = document.createElement('li');
    li.textContent = task.name;
    li.classList.add(task.status);
    var spanCategory = document.createElement('span');
    spanCategory.textContent = task.category;
    spanCategory.classList.add('task-category');
    li.appendChild(spanCategory);
    var spanDate = document.createElement('span');
    spanDate.textContent = task.date;
    spanDate.classList.add('task-date');
    li.appendChild(spanDate);
    var button = document.createElement('button');
    button.textContent = 'Excluir';
    li.appendChild(button);
    tasksUL.appendChild(li);
    });
    }
    
    // Adicionar eventos
    taskForm.addEventListener('submit', addTask);
    tasksUL.addEventListener('click', removeTask);
    tasksUL.addEventListener('click', toggleTaskStatus);
    
    // Inicializar aplicação
    loadTaskList();
    renderTaskList();