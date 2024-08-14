// Список задач DOM
const tasksDOM = document.getElementById('tasks');
// Список задач из localStore (если он есть)
const tasks = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : []; 

// Полоска для ввода снизу
const taskText = document.getElementById('setNewTask');
const addNewTask = document.getElementById('addNewTask');

// Удаление задачи
const deleteTask = e => {
    const taskDiv = e.target.parentNode;
    const textHolderDiv = taskDiv.querySelector('div');
    const text = textHolderDiv.innerHTML;

    const index = tasks.findIndex(task => task.text == text)

    if (index !== -1)
        tasks.splice(index, 1);
    else 
        return;

    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskDiv.remove();
}

// Отметить задачу как выполненную
const markDone = e => {
    e.target.classList.toggle('done');

    const text = e.target.innerHTML;

    const index = tasks.findIndex(task => task.text == text)

    if (index !== -1)
        tasks[index].done = !tasks[index].done;
    else 
        return;

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Добавление задачи в список
const createTask = (caption, done, start) => {
    if (!caption) return;

    // Очистка строки ввода
    taskText.value = '';

    // Создание DOM элементов
    const task = document.createElement('div');             
    const text = document.createElement('div');             
    const deleteBtn = document.createElement('input');

    // Классы для контейнеров
    task.classList.add('task');
    text.classList.add('text');

    // Событие выполнения - отметить выполненной
    text.addEventListener('click', e => markDone(e));

    // Текст задачи
    text.appendChild(document.createTextNode(caption));

    // Кнопка справа
    deleteBtn.type = 'button';
    deleteBtn.value = '×';
    deleteBtn.classList.add('btn');
    deleteBtn.classList.add('delete');
    // Событие удаления
    deleteBtn.addEventListener('click', e => deleteTask(e));

    // Добавление DOM элементов 
    task.appendChild(text);
    task.appendChild(deleteBtn);
    tasksDOM.appendChild(task);

    // Если загрузка страницы, то в localStorage писать не надо
    if (!start) {
    // Добавление задачи в список задач, запись в localStorage
        tasks.push({
            text: caption,
            done: false
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    // Если задача уже отмечена выполненной
    if (done)
        text.classList.toggle('done');
}

// Отображает сохраненные задачи
if (tasks.length > 0) 
    tasks.forEach(task => createTask(task["text"], task["done"], true));

// Обработка нажатия на кнопку для добавления
addNewTask.addEventListener('click', e => createTask(taskText.value));