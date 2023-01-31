import { CdkDragDrop,moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { Entry } from 'src/app/models/entry-model';
import { List } from 'src/app/models/list-model';
import { HtmlService } from 'src/app/services/html/html.service';
import { LocalService } from 'src/app/services/local/local.service';
import { ToDoListsService } from 'src/app/services/to-do-lists.service';

@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.component.html',
  styleUrls: ['./view-list.component.css'],
})

export class ViewListComponent implements OnInit {

  listDetails: List = {
    name: "",
    entries: [],
    id: ""
  }

  entryDetails: Entry = {
    id: '',
    name: '',
    description: '',
    date: new Date(),
    isCompleted: false,
    priorityLevel: ''
  }

  newEntryDetails: Entry = {
    id: '',
    name: '',
    description: '',
    date: new Date(),
    isCompleted: false,
    priorityLevel: 'LOW'
  }

  flag: boolean = false;

  showEditEntry:boolean=false;
  showAddEntry: boolean = false;

  icon:string= 'add'
  icon2:string ='edit'

  activeFilter: string ='alphabetic'

  startupFilter: string='startup'
  

  editedEntryDetails: Entry = {
    id: '',
    name: '',
    description: '',
    date: new Date(),
    isCompleted: false,
    priorityLevel: ''

  }

  priorityMap = new Map<string, number>([
    ["HIGH", 3],
    ["MEDIUM", 2],
    ["LOW", 1],]);


  constructor(private listService: ToDoListsService, private route: ActivatedRoute,
    public htmlService: HtmlService,
    private localStore:LocalService) {}



  

  ngOnInit(): void {

   this.activeFilter=  this.localStore.getData(this.startupFilter)

   console.log(this.localStore.getData(this.startupFilter))
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.listService.getSingleList(id).subscribe({
            next: (response) => {
              
              this.listDetails = response
              this.applyFilter(response,this.activeFilter)              
            }
          })
        }
      }
    })
  }

  deleteEntry(id: string) {
    console.log(id)
    this.listService.deleteEntry(id)

      .subscribe({
        next: () => {
          this.route.paramMap.subscribe({
            next: (params) => {
              const id = params.get('id');

              if (id) {
                this.listService.getSingleList(id).subscribe({
                  next: (response) => {
                    this.listDetails = response
                    
                    this.applyFilter(this.listDetails, this.activeFilter)
                  }
                })
              }
            }
          })
        }
      })
  }

  addEntry(id: string, newEntryDetails: Entry) {
    this.listService.addEntry(id, newEntryDetails).subscribe({
      next: () => {
        this.route.paramMap.subscribe({
          next: (params) => {
            const id = params.get('id');
            if (id) {
              this.listService.getSingleList(id).subscribe({
                next: (response) => {
                  this.listDetails = response
                  newEntryDetails.description = '';
                  newEntryDetails.priorityLevel = '';
                  newEntryDetails.name = '';
                  newEntryDetails.isCompleted =false;
                  newEntryDetails.id=''
                  this.showAddForm()
                  //console.log("active filter after added entry: " + this.activeFilter)
                  this.applyFilter(this.listDetails, this.activeFilter)
                  console.log("flag after add operation::" + this.activeFilter)
                }
              })
            }
          }
        })


      }
    })
  }

  completeTask(id: string, entryDetails: Entry) {
  
    entryDetails.isCompleted = !entryDetails.isCompleted
    this.editedEntryDetails.isCompleted=entryDetails.isCompleted // fixes the bug for update not effect

    this.listService.completeTask(id, entryDetails).subscribe({
      next: () => {
        this.route.paramMap.subscribe({
          next: (params) => {
            const id = params.get('id');
            if (id) {
              this.listService.getSingleList(id).subscribe({
                next: (response) => {
                  this.listDetails = response
                  this.applyFilter(this.listDetails, this.activeFilter)
                }
              })
            }
          }
        })


      }
    })

  }

  editEntry(id: string, entryDetails: Entry) {
    console.log(entryDetails)
    this.listService.editEntry(id, entryDetails).subscribe({
      next: () => {
        this.route.paramMap.subscribe({
          next: (params) => {
            const id = params.get('id');
            if (id) {
              this.listService.getSingleList(id).subscribe({
                next: (response) => {
                  this.listDetails = response
                  this.editedEntryDetails.name = ''
                  this.editedEntryDetails.priorityLevel = ''
                  this.editedEntryDetails.description = ''
                  this.editedEntryDetails.id=''
                  this.editedEntryDetails.isCompleted=false;
                  
                  this.showEditEntry=false
                  this.applyFilter(this.listDetails, this.activeFilter)
                }
              })
            }
          }
        })


      }
    })
  }

  priorityFiltering(entries: Entry[], dummyflag: boolean) {
    this.activeFilter = 'priority'
    this.flag = dummyflag;

    if (this.flag == true) {
      this.listDetails.entries = entries.sort((a, b) => this.priorityMap.get(a.priorityLevel) - this.priorityMap.get(b.priorityLevel));
    }
    else {
      this.listDetails.entries = entries.sort((a, b) => this.priorityMap.get(b.priorityLevel) - this.priorityMap.get(a.priorityLevel));
    }
    this.flag = !this.flag

    this.localStore.saveData(this.startupFilter,this.activeFilter)

    

  }

  alphabeticFiltering(entries: Entry[] ,dummyflag:boolean) {
    this.activeFilter = 'alphabetic'
    this.flag = dummyflag;

    if (this.flag == true) {
      this.listDetails.entries = entries.sort((a, b) => a.name.localeCompare(b.name));
      
    }
    else {
      this.listDetails.entries = entries.sort((a, b) => a.name.localeCompare(b.name)).reverse();
    
    }
    this.flag = !this.flag

    this.localStore.saveData(this.startupFilter,this.activeFilter)

  }

  dateFiltering(entries: Entry[], dummyflag: boolean) {
    this.activeFilter = 'date'
    this.flag = dummyflag;



    if (this.flag == true) {

      this.listDetails.entries = entries.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    }
    else {
      this.listDetails.entries = entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    }
    this.flag = !this.flag
    this.localStore.saveData(this.startupFilter,this.activeFilter)

  }

  completedFiltering(entries: Entry[], dummyflag: boolean) {
    this.activeFilter = 'completed'
    this.flag = dummyflag;



    if (this.flag == true) {

      this.listDetails.entries = entries.sort((a, b) => Number(a.isCompleted) - Number(b.isCompleted) );

    }
    else {
      this.listDetails.entries = entries.sort((a, b) => Number(a.isCompleted) - Number(b.isCompleted) ).reverse();

    }
    this.flag = !this.flag

    this.localStore.saveData(this.startupFilter,this.activeFilter)

  }

  //fill form is used for editing 
  fillForm(id: string) {
    if(!this.showEditEntry)
    {
      this.showEditEntry=true;
    }
    this.listService.getEntry(id).subscribe({
      next: (response) => {
        this.editedEntryDetails = response
      }
    })
  }

  parseDate(date: Date): string {
    var dd= new Date(date).getUTCDate().toString();
    var mm= new Date(date).getUTCMonth().toString();
    var yy= new Date(date).getUTCFullYear().toString();
    const resultDate=(parseInt(dd)+1)+'/'+(parseInt(mm)+1)+ '/' + yy
    return resultDate
    //return new Date(date).getUTCDate();
  }

  showAddForm(): void {

    this.showAddEntry=!this.showAddEntry
    
    if(this.showAddEntry)
    {
      this.icon='cancel'
     return
    }
    this.icon='add'
    
    
    
  }

  showEditForm(): void {
    this.showEditEntry=!this.showEditEntry
    if(this.showEditEntry)
    {
      this.icon2='stop'
      return
    }
    this.icon2='edit'
    
  }

  applyFilter(list:List, filterName:string )
  {
    
    switch(filterName){
      case 'priority':
        this.priorityFiltering(list.entries, !this.flag)
        break;

      case 'alphabetic':
        this.alphabeticFiltering(list.entries, !this.flag)
        break;
          
      case 'date':
        this.dateFiltering(list.entries, !this.flag)
        break;

      case 'completed':
        this.completedFiltering(list.entries, !this.flag)
        break;
      

    }
   

  }


}
