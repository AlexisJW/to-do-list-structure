export default class StorageLocal {
    getTodosFromLocal = () => {
      if (localStorage.getItem('todos') === null) {
        this.todos = [];
      } else {
        this.todos = JSON.parse(localStorage.getItem('todos'));
      }

      return this.todos;
    };

     getTodosFromLocalForUi = () => {
       if (localStorage.getItem('todos') === null) {
         this.todos = [];
       } else {
         this.todos = JSON.parse(localStorage.getItem('todos'));
       }

       return this.todos;
     };

     addTodo = (todo) => {
       const newTodo = {
         index: this.getTodosFromLocal().length + 1,
         description: todo.description,
         completed: todo.completed,
       };

       const todos = this.getTodosFromLocal();
       todos.push(newTodo);
       localStorage.setItem('todos', JSON.stringify(todos));
       this.index += 1;
     };
}

export const store = new StorageLocal();