import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, retry, tap, throwError } from 'rxjs';
import { UserLogin } from '../interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);
  public isLoggedIn = new BehaviorSubject(false);

  constructor() {}

  onLogin(userLogin: UserLogin): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, userLogin).pipe(
      retry(2),
      tap((res:any) => {
        if (res && res.token) {
          this.isLoggedIn.next(true);
          localStorage.setItem('token',res.token)
        }
      }),
      catchError(err => {
        console.error(err)
        return throwError(()=> new Error('Login failed'))
      })
    );
  }
}
