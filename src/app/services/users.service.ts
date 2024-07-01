import { Injectable, inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public env :string; //variable de entorno con la url


  private http = inject(HttpClient); //inyeccion del modulo de HTTP 

  //constructor para inicializar le env
  constructor() { 
    this.env = environment.APP_URL;
  }


  //Listar todos los usuarios de 
  listarUsers(): Observable<any> {
    return this.http.get<any>(this.env + 'users');
  }

  //crear un nuevo elemento POST 
  crearUser(user:any): Observable<any> {
    return this.http.post<any>(this.env + 'users', user);
  }

  //update de un item PUT
  updateUser(user:any): Observable<any> {
    return this.http.put<any>(this.env + 'users', user);
  }

}
