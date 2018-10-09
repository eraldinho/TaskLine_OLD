import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { AtelierComponent } from './atelier/atelier.component';
import { SavComponent } from './sav/sav.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { NavbarComponent } from './navbar/navbar.component';
import {AuthGuard} from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/tasks(toolbar:navbar)', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'login', component: UserLoginComponent },
  { path: 'tasks', component: TasksComponent, canActivate: [AuthGuard]},
  { path: 'atelier', component: AtelierComponent, canActivate: [AuthGuard] },
  { path: 'sav', component: SavComponent, canActivate: [AuthGuard] },
  {path: 'navbar', component: NavbarComponent, outlet: 'toolbar', canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
