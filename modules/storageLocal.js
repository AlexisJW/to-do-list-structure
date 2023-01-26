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

    removeTodo = (index) => {
      let todos = JSON.parse(localStorage.getItem('todos'));
      if (todos.length === 1) {
        todos = [];
        localStorage.setItem('todos', JSON.stringify(todos));
        return;
      }

      todos = todos.filter((todo) => todo.index !== parseInt(index, 10));
      localStorage.setItem('todos', JSON.stringify(todos));

      todos.forEach((todo, i) => {
        todo.index = i + 1;
      });
      localStorage.setItem('todos', JSON.stringify(todos));
    };
}

export const store = new StorageLocal();