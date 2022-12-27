import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login/login.service';
import { TokenHandlerService } from 'src/app/services/tokenHandler/token-handler.service';
import { ToDoListsComponent } from '../../lists/to-do-lists/to-do-lists.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  message: string = "";

  user: User = {
    userName: "",
    password: ""
  };

  constructor(private loginService: LoginService, private tokenHandlerService: TokenHandlerService, private router: Router) {
  }

  ngOnInit(): void {
    this.loginService.getLoginPage()
    .subscribe({
      next: (message) => {
        this.message = message;
        console.log(message)
      }
    });
  }

  login() {
    this.loginService.login(this.user).subscribe({
      next: (message) => {
        //this.bearerToken=message.toString();
        this.tokenHandlerService.bearerToken=message.toString();
        console.log(message)
       
        this.router.navigate(['todolists'])
        

        
      },
      error: (err) => {
        this.message= "Username / password incorrect"
      }
    });
  }



}
