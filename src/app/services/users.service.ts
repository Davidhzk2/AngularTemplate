import { Injectable, inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public env :string;


  private http  = inject(HttpClient);
  constructor() { 
    this.env = environment.APP_URL;
  }

  listarUsers(): Observable<any> {
    return this.http.get<any>(this.env + 'users');
  }
}
