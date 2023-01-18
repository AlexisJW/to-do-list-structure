export default class StorageLocal {
  constructor() {

  }

    getTodosFromLocal = () => {
      if (localStorage.getItem('todos') === null) {
        this.todos = [];
      } else {
        this.todos = JSON.parse(localStorage.getItem('todos'));
      }

      return this.todos;
    }
}

export const store = new StorageLocal();