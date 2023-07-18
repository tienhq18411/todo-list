
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Todo, TodoService } from 'src/app/service/todo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  tasks: string = '';
  todos!: Observable<Todo[]>; // Sửa kiểu dữ liệu của todos từ string[] sang Todo[]
  
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.getAllTasks();
  }

  getAllTasks() {
    this.todos = this.todoService.getAllTasks();
  }

  addTask() {
    this.todoService.addTask(this.tasks).subscribe(() => {
      this.getAllTasks();
      this.tasks = '';
    });
  }

  deleteTask(todo: Todo) {
    if (!todo.completed) {
      this.todoService.deleteTask(todo).subscribe(() => {
        this.getAllTasks();
      });
    }
  }

  checked(todo: Todo) {
    this.todoService.checked(todo).subscribe(() => {
      if (todo.completed) {
        // Nếu todo đã hoàn thành, chờ một lúc và sau đó xoá todo
         this.deleteTask(todo);
      }
    });
  }
}