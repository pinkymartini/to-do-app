import { HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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

  //scroll için çalışmadı
  @ViewChild('target', { static: true }) target: ElementRef;

  icon:string= 'add'
  icon2:string ='edit'


  list_entries: Entry[] = [];

  lists: List[] = [];

  errorMessage: string = ""

  showAddList:boolean = false;
  showEditList: boolean = false;

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
            console.log(this.lists);
            this.showAddForm()
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
            this.showEditList=false;
          }
        })
      },
      error: (err) => {
        this.errorMessage= "you are not authorized to do that action"
      }
    })


  }

  fillForm(id: string) {

    if(!this.showEditList)
    {
      this.showEditList=true;
    }

    this.listService.getSingleList(id).subscribe({
      next: (response) => {
        this.editedList = response
      }
    })

  }


  showAddForm(): void {
    this.showAddList=!this.showAddList
    if(this.showAddList)
    {
      this.icon='cancel'
      return
    }
    
    this.icon='add'
  }

  showEditForm(): void {
    this.showEditList=!this.showEditList
    if(this.showEditList)
    {
     this.icon2='cancel'
      return
    }
    this.icon2='edit'
  }

  scrollToAddForm(el: HTMLElement) {
    el.scrollIntoView({behavior:"smooth"});
}

  scroll(id:string) {
    setTimeout(() => {
      const targetDiv = document.getElementById(id);
      const rect = targetDiv.getBoundingClientRect();
      window.scrollTo({
        top: rect.top + window.pageYOffset,
        behavior: 'smooth'
      });
    }, 0);
  }



}
