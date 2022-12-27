import { Component, OnInit } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { Entry } from 'src/app/models/entry-model';
import { List } from 'src/app/models/list-model';
import { ToDoListsService } from 'src/app/services/to-do-lists.service';

@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.component.html',
  styleUrls: ['./view-list.component.css'],
})

export class ViewListComponent implements OnInit {

  listDetails : List = {
    name: "",
    entries: [],
    id: ""
  }

  entryDetails : Entry ={
    id:'',
    name: '',
    description: '',
    date: new Date(),
    isCompleted: false,
    priorityLevel: ''
  }

  newEntryDetails : Entry ={
    id:'',
    name: '',
    description: '',
    date: new Date(),
    isCompleted: false,
    priorityLevel: ''
  }

  flag: boolean =false;

  editedEntryDetails : Entry={
    id:'',
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


  constructor(private listService: ToDoListsService, private route: ActivatedRoute){}

  ngOnInit(): void {

    this.route.paramMap.subscribe({
      next: (params)=> {
        const id = params.get('id');
        if(id)
        {
          this.listService.getSingleList(id).subscribe({
            next: (response)=>{
              this.listDetails=response
              console.log(this.listDetails)
            }
          })
        }
      }
    })
  }

  deleteEntry(id: string)
  {

    console.log(id)
    this.listService.deleteEntry(id)
    
    .subscribe({
      next: ()=>{ this.route.paramMap.subscribe({
        next: (params)=> {
          const id = params.get('id');
  
          if(id)
          {
            this.listService.getSingleList(id).subscribe({
              next: (response)=>{
                this.listDetails=response
                console.log(this.listDetails)
              }
            })
          }
        }
      })
      }
    })
  }

  addEntry(id: string, newEntryDetails: Entry)
  { 
    this.listService.addEntry(id, newEntryDetails).subscribe({
      next:()=>{ this.route.paramMap.subscribe({
        next:(params) => {
          const id = params.get('id');
          if(id)
          {
            this.listService.getSingleList(id).subscribe({
              next: (response)=>{
                this.listDetails=response
                newEntryDetails.description='';
                newEntryDetails.priorityLevel='';
                newEntryDetails.name='';
              }
            })
          }
        }
      })

        
      }
    })


    console.log(this.newEntryDetails);
  }

  completeTask(id: string, entryDetails: Entry)
  {
    entryDetails.isCompleted=!entryDetails.isCompleted
    

    this.listService.completeTask(id, entryDetails).subscribe({
      next:()=>{ this.route.paramMap.subscribe({
        next:(params) => {
          const id = params.get('id');
          if(id)
          {
            this.listService.getSingleList(id).subscribe({
              next: (response)=>{
                this.listDetails=response
                
              
              }
            })
          }
        }
      })

        
      }
    })
    
  }

  editEntry(id: string, entryDetails:Entry)
  {
    console.log(entryDetails)
    this.listService.editEntry(id, entryDetails).subscribe({
      next:()=>{ this.route.paramMap.subscribe({
        next:(params) => {
          const id = params.get('id');
          if(id)
          {
            this.listService.getSingleList(id).subscribe({
              next: (response)=>{
                this.listDetails=response
                this.editedEntryDetails.name=''
                this.editedEntryDetails.priorityLevel=''
                this.editedEntryDetails.description=''
              }
            })
          }
        }
      })

        
      }
    })
  }

 

  priorityFiltering(entries: Entry[], dummyflag: boolean)
  {
    this.flag=dummyflag;
   
    if(this.flag==true)
    {
      this.listDetails.entries = entries.sort((a,b)=>this.priorityMap.get(a.priorityLevel)-this.priorityMap.get(b.priorityLevel));
    }
    else{
      this.listDetails.entries =entries.sort((a,b)=>this.priorityMap.get(b.priorityLevel)-this.priorityMap.get(a.priorityLevel));
    }
    this.flag=!this.flag
   
  }

  
  alphabeticFiltering(entries: Entry[], dummyflag: boolean)
  {
    this.flag=dummyflag;
   
    if(this.flag==true)
    {
      this.listDetails.entries = entries.sort((a,b)=>a.name.localeCompare(b.name));
    }
    else{
      this.listDetails.entries = entries.sort((a,b)=>a.name.localeCompare(b.name)).reverse();
    }
    this.flag=!this.flag
   
  }

  dateFiltering(entries:Entry[], dummyflag: boolean)
  {
    this.flag=dummyflag;

    
   
    if(this.flag==true)
    {
      
      this.listDetails.entries = entries.sort((a,b)=> new Date(a.date).getTime() - new Date(b.date).getTime());
   
    }
    else{
    this.listDetails.entries = entries.sort((a,b)=> new Date(b.date).getTime() - new Date(a.date).getTime())
    }
    this.flag=!this.flag

  }

  fillForm(id: string)
  {
    this.listService.getEntry(id).subscribe({
      next: (response)=>{
        this.editedEntryDetails=response
      }
    })
  }

  

}
