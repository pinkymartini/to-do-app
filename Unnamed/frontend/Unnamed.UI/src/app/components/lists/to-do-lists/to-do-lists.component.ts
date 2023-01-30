import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Entry } from 'src/app/models/entry-model';
import { List } from 'src/app/models/list-model';
import { ToDoListsService } from 'src/app/services/to-do-lists.service';
import { TokenHandlerService } from 'src/app/services/tokenHandler/token-handler.service';

@Component({
  selector: 'app-to-do-lists',
  templateUrl: './to-do-lists.component.html',
  styleUrls: ['./to-do-lists.component.css']
})


export class ToDoListsComponent implements OnInit {

  list_entries: Entry[] = [];

  lists: List[] = [];

  errorMessage: string = ""

  newList: List = {
    id: '',
    name: '',
    entries: []
  }

  editedList: List = {
    id: '',
    name: '',
    entries: []
  }

  constructor(private listService: ToDoListsService, private tokenHandlerService: TokenHandlerService) { }
  ngOnInit(): void {
    this.listService.getLists()
      .subscribe({
        next: (lists) => {
          console.log(lists);
          this.lists = lists

        },
        error: (response) => {

          console.log("you arent authorized");
          console.log("Bearer is " + this.tokenHandlerService.bearerToken)

        }
      });

  }

  addNewList(list: List) {
    console.log(list)
    this.listService.addNewList(list).subscribe({
      next: () => {
        this.listService.getLists().subscribe({
          next: (response) => {
            this.lists = response;
            this.newList.name = ''
          }
        })
      }
    })
  }

  deleteList(id: string) {
    this.listService.deleteList(id).subscribe({
      next: () => {
        this.listService.getLists().subscribe({
          next: (response) => {
            this.lists = response;

            
          }
        })
      },
      error: (err) => {
        this.errorMessage= "you are not authorized to do that action"
      }
    })
  }

  updateList(id: string, updatedList: List) {

    this.listService.updateList(id, updatedList).subscribe({
      next: () => {
        this.listService.getLists().subscribe({
          next: (response) => {
            this.lists = response
            this.editedList.name = ''
          }
        })
      },
      error: (err) => {
        this.errorMessage= "you are not authorized to do that action"
      }
    })


  }

  fillForm(id: string) {

    this.listService.getSingleList(id).subscribe({
      next: (response) => {
        this.editedList = response
      }
    })

  }




}
