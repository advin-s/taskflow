import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { catchError, map, Observable, retry, Subject, throwError } from 'rxjs';
import { Todo } from '../interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TasksService implements OnInit {
  private http = inject(HttpClient);
  public tasks = new Subject<Todo[]>();
  private apiUrl = environment.apiUrl
  // public tasksDemo:Todo[] = []

  constructor() {}

  ngOnInit(): void {}


  getTodos() {
    return this.http.get(this.apiUrl).pipe(retry(2),map((res:any) => res.tasks),catchError(err => throwError(()=>err)))
  }

  updateTodo(id:number,data:{completed:boolean}){
    return this.http.put(`${this.apiUrl}/${id}`,data)
  }

  addTodo(todo:Todo){
    return this.http.post(this.apiUrl,todo)
  }

  deleteTodo(id:number){
    return this.http.delete(`${this.apiUrl}/${id}`)
  }
}
