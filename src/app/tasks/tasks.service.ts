import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { catchError, map, Observable, retry, Subject, throwError } from 'rxjs';
import { Todo } from '../interface';

@Injectable({
  providedIn: 'root',
})
export class TasksService implements OnInit {
  private http = inject(HttpClient);
  public tasks = new Subject<Todo[]>();
  // public tasksDemo:Todo[] = []

  constructor() {}

  ngOnInit(): void {}


  getTodos() {
    return this.http.get('http://localhost:3000/taskroute/v1').pipe(retry(2),map((res:any) => res.tasks),catchError(err => throwError(()=>err)))
  }

  updateTodo(id:number,data:{completed:boolean}){
    return this.http.put(`http://localhost:3000/taskroute/v1/${id}`,data)
  }

  addTodo(todo:Todo){
    return this.http.post('http://localhost:3000/taskroute/v1',todo)
  }

  deleteTodo(id:number){
    return this.http.delete(`http://localhost:3000/taskroute/v1/${id}`)
  }
}
