import { Component, inject } from '@angular/core';
import { NgFor, NgIf} from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';


import { UsersService } from '../../services/users.service';

import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Login } from '../../interfaces/interfaces';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, NgFor, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private authService =  inject(AuthService);  //inyectamos el servicio 
  private router = inject(Router); //inyectamos el router para poder redireccionar 
  private formBuild = inject(FormBuilder); //nos permite crear el formulario

  //estructura del formulario
  public formLogin = this.formBuild.group({
      username: [Validators.required],
      email: [Validators.required],
      password: [Validators.required]
  })


    errorMessage ="";
    public itemData : any;
    public usersData : any [];
    public loginData : any;
    //public usersService: UsersService;

    constructor(private user: UsersService) {
        this.itemData = {};
        this.usersData = [];  
    }
    ngOnInit(): void {

      this.loadData();
    }
    
    //lista los usuario!
    loadData(){ 
      
      this.user.listarUsers().subscribe({
        next:(res) => {
          console.log(res);
          this.usersData = res.data;
        }
      }
      //  (res)=>{
      //    console.log(res);
      //    this.usersData = res.data;
      //  },
      //  (err) =>{
      //    console.log("Error: " + err);
         
      //  }
      )
    }

    //registar un nuevo item
    // registerItem(){
    //   this.user.crearUser(this.itemData).subscribe(
    //     (response)=>{

    //       console.log(response);
    //       console.log(this.itemData);
    //     }
    //   )
    // }

    login(){

      if(this.formLogin.invalid) return;

      const data: Login ={
        username: "this.formLogin.value.username",
        email: "this.formLogin.value.email",
        password: "this.formLogin.value.password"
      }

      //consumimos el servicio
      this.authService.login(data).subscribe({
        next:(res) => {
          localStorage.setItem("token", res.token); //guardar token en localStorage
          this.router.navigate(['/home']); //redireccionar a la vista 
        },error:(error) => {
          console.log(error.error.message);
        }
      });

    }

    registrarse(){
      this.router.navigate(['/signup']); //redireccionar a la vista
    }
}
