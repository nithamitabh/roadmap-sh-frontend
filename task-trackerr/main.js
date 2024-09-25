let tasks = [];

// Select DOM elements
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const addTaskBtn = document.getElementById('addTaskBtn');
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Function to render tasks
function renderTasks() {
  // Clear current task list
  taskList.innerHTML = '';

  // Sort tasks: Pending tasks first, then completed ones
  const sortedTasks = tasks.sort((a, b) => a.completed - b.completed);

  // Render each task
  sortedTasks.forEach((task, index) => {
    // Create task item
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');
    if (task.completed) {
      taskItem.classList.add('completed');
    }

    // Checkbox for marking task as complete
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.classList.add('checkbox');
    checkbox.addEventListener('click', () => toggleTaskCompletion(index));

    // Task description
    const taskText = document.createElement('span');
    taskText.classList.add('task-text');
    taskText.textContent = task.description;

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm3.46-9.88l1.42-1.42L12 9.17l1.12-1.12 1.42 1.42L13.42 12l1.12 1.12-1.42 1.42L12 14.83l-1.12 1.12-1.42-1.42L10.58 12l-1.12-1.12z" fill="black"/></svg>`;
    deleteBtn.addEventListener('click', () => deleteTask(index));

    // Append elements to task item
    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskText);
    taskItem.appendChild(deleteBtn);

    // Append task item to task list
    taskList.appendChild(taskItem);
  });
}

// Function to add a new task
function addTask() {
  const taskDescription = taskInput.value.trim();

  if (taskDescription) {
    tasks.push({ description: taskDescription, completed: false });
    taskInput.value = '';
    renderTasks();
  }
}

// Function to delete a task
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// Function to toggle task completion
function toggleTaskCompletion(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

// Add task on button click
addTaskBtn.addEventListener('click', addTask);

// Add task on pressing Enter
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTask();
  }
});

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
  body.classList.toggle('theme-light');
  body.classList.toggle('theme-dark');
});