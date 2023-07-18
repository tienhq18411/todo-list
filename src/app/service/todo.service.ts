import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Todo {
  id: number;
  name: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos: Todo[] = []; 

  constructor() {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      this.todos = JSON.parse(storedTodos);
    }
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  getAllTasks(): Observable<Todo[]> {
    return of(this.todos);
  }

  addTask(todoName: string): Observable<Todo[]> {
    if (todoName.trim() !== '') {
      const newTodo: Todo = {
        id: this.todos.length + 1,
        name: todoName,
        completed: false
      };
      this.todos.push(newTodo);
      this.saveToLocalStorage();
    }
    return of(this.todos);
  }

  deleteTask(todo: Todo): Observable<Todo[]> {
    const index = this.todos.findIndex(t => t.id === todo.id);
    if (index >= 0) {
      this.todos.splice(index, 1);
      this.saveToLocalStorage();
    }
    return of(this.todos);
  }

  checked(todo: Todo): Observable<Todo[]> {
    const index = this.todos.findIndex(t => t.id === todo.id);
    if (index >= 0) {
      this.todos[index].completed = !this.todos[index].completed;
      this.saveToLocalStorage();
    }
    return of(this.todos);
  }
}