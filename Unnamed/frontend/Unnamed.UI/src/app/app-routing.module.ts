import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
