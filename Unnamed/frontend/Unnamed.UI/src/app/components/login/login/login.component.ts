import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login/login.service';
import { ToDoListsService } from 'src/app/services/to-do-lists.service';
import { ToDoListsComponent } from '../../lists/to-do-lists/to-do-lists.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  message: string = "";

  bearerToken : string ="";


  user: User = {
    userName: "",
    password: ""
  };

   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.bearerToken
    })
  };

    

  constructor(private loginService: LoginService, private toc: ToDoListsComponent) {

  }

  ngOnInit(): void {
    this.loginService.getLoginPage().subscribe({
      next: (message) => {
        this.message = message;
        console.log(message)
      }
    });
  }

  login() {
    this.loginService.login(this.user).subscribe({
      next: (message) => {

        this.bearerToken=message.toString();

        //console.log(this.todoService.getLists(this.httpOptions))
       

        

        console.log(message)
      },
      error: (err) => {
        console.log(err)
      }
    });
  }



}
