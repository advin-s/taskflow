import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserLogin } from '../interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = environment.apiUrl
  private http = inject(HttpClient)

  constructor() { }

  onLogin(userLogin:UserLogin):Observable<any>{
    return this.http.post(`${this.apiUrl}/login`,userLogin)
  }
}
