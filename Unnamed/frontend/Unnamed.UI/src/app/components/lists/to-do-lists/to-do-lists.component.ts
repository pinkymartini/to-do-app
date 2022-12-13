import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Entry } from 'src/app/models/entry-model';
import { List } from 'src/app/models/list-model';
import { LoginService } from 'src/app/services/login/login.service';
import { ToDoListsService } from 'src/app/services/to-do-lists.service';

@Component({
  selector: 'app-to-do-lists',
  templateUrl: './to-do-lists.component.html',
  styleUrls: ['./to-do-lists.component.css']
})
export class ToDoListsComponent implements OnInit {

  list_entries : Entry[] = [];


  lists : List[]= [];


  bearerToken: string = "";

   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.bearerToken
    })
  };






  constructor(private todolistsService: ToDoListsService, ){}
  ngOnInit(): void {
   
    this.todolistsService.getLists(this.httpOptions)
    .subscribe({
      next: (lists)=>
      {
        console.log(lists);
        this.lists = lists
      },
      error: (response )=>{

        console.log("you arent authorized");
      } 
    });
    
  }

}
