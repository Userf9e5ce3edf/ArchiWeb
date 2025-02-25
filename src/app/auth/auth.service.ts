import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api'; 

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/utilisateurs/login`, {email, password});
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/utilisateurs/register`, user);
  }
}
