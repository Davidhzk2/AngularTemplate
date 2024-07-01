import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Login, Signup } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private http = inject(HttpClient);
  private baserUrl = 'http://localhost:5265/api';

  constructor() { }


  login(user: Login){

    return this.http.post<any>(`${this.baserUrl}/auth/login`, user);
  }


  signup(user: Signup){
    return this.http.post<any>(`${this.baserUrl}/auth/signup`, user);
  }


}
