import { Injectable } from '@angular/core';
import { enviroment } from './enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  logIn(form: any) : Observable<any>{
    return this.http.post<any>(`${enviroment.url}`, { username :form.username ,password:  form.password })
  }
}
