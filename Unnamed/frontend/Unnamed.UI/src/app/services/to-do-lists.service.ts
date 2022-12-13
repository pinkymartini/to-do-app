import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/env';
import { List } from '../models/list-model';

@Injectable({
  providedIn: 'root'
})
export class ToDoListsService {

  baseApiUrl: string= environment.baseApiUrl;

  

  constructor(private http: HttpClient) {

    

   }

  getLists(httpOptions:Object ): Observable<List[]>{
   return this.http.get<List[]>(this.baseApiUrl+ '/List', httpOptions);
  }

  getListsParams(httpOptions: Object): Observable<List[]>{
    return this.http.get<List[]>(this.baseApiUrl+ '/List', httpOptions);
   }
}
