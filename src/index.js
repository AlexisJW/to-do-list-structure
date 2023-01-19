import UI from '../modules/ui.js';
import store from '../modules/storageLocal.js';
import Todo from '../modules/todo.js';
import './style.css';

const inputTodo = document.querySelector('#input-todo-name');
const todoList = document.querySelector('.container-list-todo');

inputTodo.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && inputTodo.value.trim() !== '') {
        const indexFromStore = store.index;
        const todoValue = UI.getTodoFromInput();
        const completed = false;
        const todo = new Todo(indexFromStore, todoValue, completed);

        store.addTodo(todo);
        UI.addTodoList(todo);
    }
});

document.querySelector('#container-list-todo').addEventListener('click', (e) => {
    UI.deleteTodo(e.target);
    window.location.reload();
});



document.addEventListener('DOMContentLoaded', UI.displayTodos);