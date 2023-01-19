import UI from '../modules/ui.js';
import { store } from '../modules/storageLocal.js';
import Todo from '../modules/todo.js';
import './style.css';

const inputTodo = document.querySelector('#input-todo-name');
const todoList = document.querySelector('.container-list-todo');
const todosFromLocal = store.getTodosFromLocal();

inputTodo.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && inputTodo.value.trim() !== '') {
    const indexFromStore = store.index;
    const todoValue = UI.getTodoFromInput();
    const completed = false;
    const todo = new Todo(indexFromStore, todoValue, completed);

    store.addTodo(todo);
    UI.addTodoList(todo);
    UI.deleteTodo();
  }
});

window.onload = () => {
  UI.deleteTodo();
};

todoList.addEventListener('DOMSubtreeModified', () => {
  UI.editItemTodo(todosFromLocal);
  UI.isCheckedTodo(todosFromLocal);
});

document.addEventListener('DOMContentLoaded', UI.displayTodos);