const todosArray = [
  {
    index: 0, description: 'Learning html',
  },
  { index: 1, description: 'Learning css' },
  { index: 2, description: 'Ruby' },
];

export default class StorageLocal {
  constructor() {
    this.index = this.getTodosFromLocal().length + 1;
    todosArray.forEach((todo) => this.addTodo(todo));
  }

    getTodosFromLocal = () => {
      if (localStorage.getItem('todos') === null) {
        this.todos = [];
      } else {
        this.todos = JSON.parse(localStorage.getItem('todos'));
      }

      return this.todos;
    }

    addTodo = (todo) => {
      const newTodo = {
        description: todo.description,
        completed: todo.completed,
        index: this.index,
      };

      const todos = this.getTodosFromLocal();
      todos.push(newTodo);
      localStorage.setItem('todos', JSON.stringify(todos));
      this.index += 1;
    }
}

export const store = new StorageLocal();