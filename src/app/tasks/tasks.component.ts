import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { TasksService } from './tasks.service';
import { Subscription } from 'rxjs';
import { Todo } from '../interface';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, FormsModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent implements OnInit {
  private tasksService = inject(TasksService);
  private subscription!: Subscription;
  public tasks: Todo[] = [];
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.subscription = this.tasksService.getTodos().subscribe({
      next: (res) => {
        this.tasks = res;
        console.log(res);
      },
      error: (err) => console.error(err),
    });
    console.log(this.tasks);
    this.destroyRef.onDestroy(() => {
      this.subscription.unsubscribe();
    });
  }

  onAddTodo(form: NgForm) {
    if (form.invalid) return;
    const id = Math.floor(Math.random() * 100) + 1;
    console.log({ ...form.value, userId: 2, id });
    this.tasks.push({ ...form.value, userId: 2, id })
    this.tasksService.addTodo({ ...form.value, userId: 2, id }).subscribe({
      next: (res) => {
        console.log(res);
        form.resetForm();
      },
      error: (err) => console.log(err),
    });
  }

  onCompleteTodo(id:number){
    this.tasks = this.tasks.map(task => task.id === id ? {...task,completed:true}:task)
    this.tasksService.updateTodo(id,{completed:true}).subscribe(res => console.log(res)
    )
  }

  onDeleteTodo(id:number){
    this.tasks = this.tasks.filter(task => task.id !== id)
    this.tasksService.deleteTodo(id).subscribe(res => console.log(res)
    )
  }
}
