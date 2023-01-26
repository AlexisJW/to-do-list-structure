/**
 * @jest-environment jsdom
 */
import Todo from './todo.js';
import { store } from './storageLocal.js';

describe('tasks', () => {
  test('check the array for adding elements', () => {
    const todo = new Todo(1, 'Todo 1', false);
    store.addTodo(todo);
    expect(store.getTodosFromLocalForUi()).toHaveLength(1);
  });

  test('check the array for removing elements', () => {
    store.removeTodo(1);
    expect(store.getTodosFromLocalForUi()).toHaveLength(0);
  });
});
