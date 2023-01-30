import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/env';
import { Entry } from '../models/entry-model';
import { List } from '../models/list-model';
import { TokenHandlerService } from './tokenHandler/token-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ToDoListsService {

  baseApiUrl: string= environment.baseApiUrl;

  constructor(private http: HttpClient, private tokenHandlerService: TokenHandlerService) {}

  getLists(): Observable<List[]>{

  
   var headers= new HttpHeaders({'Authorization': 'Bearer ' + this.tokenHandlerService.bearerToken});


   //return this.http.get<List[]>('https://172.20.10.13:7183/List', {headers: headers});  
   


   //below is localhost
   return this.http.get<List[]>(this.baseApiUrl+ '/List', {headers: headers});  

  // return this.http.get<List[]>('https://unnamed.azurewebsites.net'+ '/List', {headers: headers});  
  }

  getSingleList(id: string): Observable<List>{

    
    var headers= new HttpHeaders({'Authorization': 'Bearer ' + this.tokenHandlerService.bearerToken});
    
    return this.http.get<List>(this.baseApiUrl+ '/List/'+ id, {headers: headers});  

   // return this.http.get<List>('https://172.20.10.13:7183'+ '/List/'+ id, {headers: headers}); 


   }

  //  getPriorityList(id: string): Observable<List>{

    
  //   var headers= new HttpHeaders({'Authorization': 'Bearer ' + this.tokenHandlerService.bearerToken});
    
  //   return this.http.get<List>(this.baseApiUrl+ '/List/'+ id+'/FilterPriority', {headers: headers});  

  //  // return this.http.get<List>('https://172.20.10.13:7183'+ '/List/'+ id, {headers: headers}); 


  //  }

  deleteEntry(id: string) : Observable <Entry>
  {
    var headers= new HttpHeaders({'Authorization': 'Bearer ' + this.tokenHandlerService.bearerToken});
    return this.http.delete<Entry>(this.baseApiUrl+ '/Entry/'+ id, {headers: headers});  
    
  }

  addEntry(id: string, entry: Entry) : Observable <Entry>
  {
    entry.id=  '00000000-0000-0000-0000-000000000000'
    var headers= new HttpHeaders({'Authorization': 'Bearer ' + this.tokenHandlerService.bearerToken});
    return this.http.put<Entry>(this.baseApiUrl+ '/List/'+ id +'/addEntry', entry, {headers: headers});  
    
  }

  editEntry(id: string, entry: Entry) : Observable <Entry>
  {
    //entry.id=  '00000000-0000-0000-0000-000000000000'
    var headers= new HttpHeaders({'Authorization': 'Bearer ' + this.tokenHandlerService.bearerToken});
    return this.http.put<Entry>(this.baseApiUrl+ '/Entry/'+ id , entry, {headers: headers});  
    
  }

  completeTask(id: string, entry: Entry) : Observable <Entry>
  {
    
    console.log(JSON.stringify(entry))

    var headers= new HttpHeaders({'Authorization': 'Bearer ' + this.tokenHandlerService.bearerToken});
    return this.http.put<Entry>(this.baseApiUrl+ '/Entry/'+ id, entry, {headers: headers});  
    
  }

  getEntry(id: string): Observable <Entry>
  {
    var headers= new HttpHeaders({'Authorization': 'Bearer ' + this.tokenHandlerService.bearerToken});
    return this.http.get<Entry>(this.baseApiUrl+ '/Entry/'+ id, {headers: headers});  
  }

  addNewList(list: List) : Observable <List>
  {
    list.id=  '00000000-0000-0000-0000-000000000000'
    var headers= new HttpHeaders({'Authorization': 'Bearer ' + this.tokenHandlerService.bearerToken});
    return this.http.post<List>(this.baseApiUrl +'/List', list, {headers: headers}); 

  }

  
  deleteList(id: string) : Observable <List>
  {
    var headers= new HttpHeaders({'Authorization': 'Bearer ' + this.tokenHandlerService.bearerToken});
    return this.http.delete<List>(this.baseApiUrl+ '/List/'+ id ,{headers: headers}); 

  }

  
  updateList(id: string, list: List) : Observable <List>
  {
   
    var headers= new HttpHeaders({'Authorization': 'Bearer ' + this.tokenHandlerService.bearerToken});
    return this.http.put<List>(this.baseApiUrl+ '/List/'+ id , list, {headers: headers}); 

  }

}
