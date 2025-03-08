import { NgClass } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { Todo } from '../../interface';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [NgClass],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  public todo = input.required<Todo>()
  public index = input.required<number>()
  public onComplete = output<number>()
  public onDeleted = output<number>()

  onCompleted(id:number){
    this.onComplete.emit(id)
  }

  onDelete(id:number){
    this.onDeleted.emit(id)
  }
}
