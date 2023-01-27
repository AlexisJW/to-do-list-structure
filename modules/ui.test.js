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
    const todo = new Todo(1, 'Todo 1', false);
    store.addTodo(todo);
    store.editTodo('Edited Todo');
    const todos = store.getTodosFromLocal();
    expect(todos[0].description).toBe('Edited Todo');
    store.removeTodo(1);
  });
});

describe('isCheckedTodo', () => {
  test('should set completed to true when checkbox is checked', () => {
    const todoo = new Todo(1, 'Todo false', false);
    store.addTodo(todoo);
    const todosArrayLocal = store.getTodosFromLocal();
    const todo = todosArrayLocal.find((todo) => todo.index === 1);
    todo.completed = true;
    localStorage.setItem('todos', JSON.stringify(todosArrayLocal));

    // Assert that the todo item's completed property is true
    expect(todosArrayLocal[0].completed).toBe(true);
  });

  test('should set completed to false when checkbox is unchecked', () => {
    const todoo = new Todo(1, 'Todo false', true);
    store.addTodo(todoo);
    const todosArrayLocal = store.getTodosFromLocal();
    const todo = todosArrayLocal.find((todo) => todo.index === 1);
    todo.completed = false;
    localStorage.setItem('todos', JSON.stringify(todosArrayLocal));

    // Assert that the todo item's completed property is false
    expect(todosArrayLocal[0].completed).toBe(false);
  });
});

describe('clear all checked todos', () => {
  it('clear all checked todos in local storage', () => {
    const todoUnchecked = new Todo(1, 'Todo unchecked', false);
    const todo1 = new Todo(2, 'Todo checked', true);
    const todo2 = new Todo(3, 'Todo checked', true);
    const todoArr = [todoUnchecked, todo1, todo2];
    store.addTodo(todoArr);
    store.clearAllCheckedTodosInStorage();
    expect(store.getTodosFromLocal()).toHaveLength(1);
  });
});
