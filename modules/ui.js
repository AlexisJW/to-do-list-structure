import { store } from './storageLocal.js';

const todoList = document.querySelector('.container-list-todo');
const inputTodo = document.querySelector('#input-todo-name');

export default class UI {
    static displayTodos = () => {
      const todos = store.getTodosFromLocalForUi();
      todos.forEach((todo) => UI.addTodoList(todo));
    };

    static addTodoList = (todoValue) => {
      const todo = document.createElement('li');
      todo.classList.add('item');
      todo.innerHTML = `
        <div>
        <input id=${todoValue.index} type="checkbox" ${todoValue.completed ? 'checked' : ''}>
        <input type="text" id="todo-${todoValue.index}" class="todo-desc" value="${todoValue.description}">
        </div>
        <svg class="w-6 h-6 ${todoValue.description}" id=${todoValue.index} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>`;
      todoList.appendChild(todo);
    };

    static deleteTodo = () => {
      document.querySelectorAll('.w-6').forEach((item) => {
        if (item) {
          item.addEventListener('click', (e) => {
            let todos = JSON.parse(localStorage.getItem('todos'));
            if (todos.length === 1) {
              todos = [];
              localStorage.setItem('todos', JSON.stringify(todos));
              window.location.reload();
              return;
            }

            const index = e.target.parentElement.id;
            todos = todos.filter((todo) => todo.index !== parseInt(index, 10));
            localStorage.setItem('todos', JSON.stringify(todos));

            todos.forEach((todo, i) => {
              todo.index = i + 1;
            });
            localStorage.setItem('todos', JSON.stringify(todos));
            window.location.reload();
          });
        }
      });
    };

    static getTodoFromInput = () => {
      const todoValue = inputTodo.value;
      inputTodo.value = '';
      return todoValue;
    };

    static editItemTodo = (todosArrayLocal) => {
      document.querySelectorAll('.todo-desc').forEach((item) => {
        if (item) {
          item.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && item.value.trim() !== '') {
              todosArrayLocal = JSON.parse(localStorage.getItem('todos'));
              const todo = todosArrayLocal.find((todo) => todo.index === parseInt(item.id.replace('todo-', ''), 10));
              todo.description = item.value;
              localStorage.setItem('todos', JSON.stringify(todosArrayLocal));
              window.location.reload();
            }
          });
        }
      });
    };

    static isCheckedTodo = (todosArrayLocal) => {
      document.querySelectorAll('input[type="checkbox"]').forEach((item) => {
        item.addEventListener('change', (e) => {
          if (e.target.checked) {
            todosArrayLocal = JSON.parse(localStorage.getItem('todos'));
            const todo = todosArrayLocal.find((todo) => todo.index === parseInt(e.target.id, 10));
            todo.completed = true;
            localStorage.setItem('todos', JSON.stringify(todosArrayLocal));
          } else {
            todosArrayLocal = JSON.parse(localStorage.getItem('todos'));
            const todo = todosArrayLocal.find((todo) => todo.index === parseInt(e.target.id, 10));
            todo.completed = false;
            localStorage.setItem('todos', JSON.stringify(todosArrayLocal));
          }

          window.location.reload();
        });
      });
    };

    static clearAllCheckedTodos = (todosArray) => {
      const checkedTodos = document.querySelectorAll('input[type="checkbox"]:checked');

      if (checkedTodos.length !== 0) {
        let todosFromStorage = JSON.parse(localStorage.getItem('todos'));
        todosFromStorage = todosFromStorage.filter((todo) => todo.completed === false);
        todosArray = todosFromStorage;
        localStorage.setItem('todos', JSON.stringify(todosArray));
        window.location.reload();
      }
    };
}
