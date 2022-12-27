import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewListComponent } from './components/list-details/view-list/view-list.component';
import { ToDoListsComponent } from './components/lists/to-do-lists/to-do-lists.component';
import { LoginComponent } from './components/login/login/login.component';

const routes: Routes = [
  {
    path: '',
    component:LoginComponent 
  },

  {
    path: 'todolists',
    component:ToDoListsComponent 
  },

  {
    path: 'login',
    component:LoginComponent 
  },
  {
    path: 'list/:id',
    component:ViewListComponent 
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
