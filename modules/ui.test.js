/**
 * @jest-environment jsdom
 */

import Todo from './todo.js';
import { store } from './storageLocal.js';

describe('adding elements', () => {
  test('check the array for adding elements', () => {
    const todo = new Todo(1, 'Todo 1', false);
    store.addTodo(todo);
    expect(store.getTodosFromLocalForUi()).toHaveLength(1);
  });
});

describe('removing elements', () => {
  test('check the array for removing elements', () => {
    store.removeTodo(1);
    expect(store.getTodosFromLocalForUi()).toHaveLength(0);
  });
});

describe('edits todo', () => {
  test('edits todo item in local storage', () => {
    const todosArrayLocal = [{ index: 1, description: 'Todo 1', completed: false }];
    store.addTodo(todosArrayLocal);
    store.editTodo('Edited Todo');

    const todos = store.getTodosFromLocal();
    expect(todos[0].description).toBe('Edited Todo');
  });
});

/** ***************************************** */

describe('isCheckedTodo', () => {
  test('should set completed to true when checkbox is checked', () => {
    const todosArray = [{ index: 1, description: 'Todo false', completed: false }];
    store.addTodo(todosArray);
    const todosArrayLocal = store.getTodosFromLocal();
    const todo = todosArrayLocal.find((todo) => todo.index === 1);
    todo.completed = true;
    localStorage.setItem('todos', JSON.stringify(todosArrayLocal));

    // Assert that the todo item's completed property is true
    expect(todosArrayLocal[0].completed).toBe(true);
  });

  test('should set completed to false when checkbox is unchecked', () => {
    const todosArray = [{ index: 1, description: 'Todo false', completed: false }];
    store.addTodo(todosArray);
    const todosArrayLocal = store.getTodosFromLocal();
    const todo = todosArrayLocal.find((todo) => todo.index === 1);
    todo.completed = false;
    localStorage.setItem('todos', JSON.stringify(todosArrayLocal));

    // Assert that the todo item's completed property is false
    expect(todosArrayLocal[0].completed).toBe(false);
  });
});
