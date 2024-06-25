import { Component } from '@angular/core';
import { NgFor, NgIf} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatDialogModule} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

import { UsersService } from '../../services/users.service';

import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatDialogModule, MatIconModule, MatFormFieldModule, HttpClientModule, NgFor, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    errorMessage ="";
    public usersData : any [];
    public loginData : any;
    //public usersService: UsersService;

    constructor(private user: UsersService) {
        this.usersData = [];
    }
    ngOnInit(): void {

      this.loadData();
    }
    
    
    loadData(){ 
      
      this.user.listarUsers().subscribe(
       (res)=>{
         console.log(res);
         this.usersData = res.data;
       },
       (err) =>{
         console.log("Error: " + err);
         
       }
      )
    }

    login(){

    
    }

    close(){}
}
