import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { AtelierComponent } from './atelier/atelier.component';
import { SavComponent } from './sav/sav.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { QuickTaskFormComponent } from './tasks/quick-task-form/quick-task-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/tasks(toolbar:topmenu//sidenav:taskside)', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'tasks', component: TasksComponent },
  { path: 'atelier', component: AtelierComponent },
  { path: 'sav', component: SavComponent },
  { path: 'topmenu', component:NavbarComponent, outlet: 'toolbar' },
  { path: 'taskside', component:QuickTaskFormComponent, outlet: 'sidenav' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
