import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/env';





@Injectable({
  providedIn: 'root'
})
export class LoginService {



  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { 
  }

  getLoginPage(): Observable<string>
  {
    return this.http.get<string>(this.baseApiUrl+ '/Login');

    
    //return this.http.get<string>('https://unnamed.azurewebsites.net/Login');

    
  }

  
  login(loginrequest: User): Observable<User>
  {
    return this.http.post<User>(this.baseApiUrl+ '/Login', loginrequest);

  }

  
}
