import { store } from './storageLocal.js';

const todoList = document.querySelector('.container-list-todo');

export default class UI {
    static displayTodos = () => {
      const todos = store.getTodosFromLocal();
      todos.forEach((todo) => UI.addTodoList(todo));
    }

    static addTodoList = (todoValue) => {
      const todo = document.createElement('li');
      todo.classList.add('item');
      todo.innerHTML = `
        <div>
        <input id=${todoValue.index} type="checkbox" ${todoValue.completed ? 'checked' : ''}>
        <input type="text" id="todo-${todoValue.index}" class="todo-desc" value="${todoValue.description}">
        </div>`;
      todoList.appendChild(todo);
    }
}
