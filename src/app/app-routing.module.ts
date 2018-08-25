import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { AtelierComponent } from './atelier/atelier.component';
import { SavComponent } from './sav/sav.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { QuickTaskFormComponent } from './tasks/quick-task-form/quick-task-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'tasks', component: TasksComponent,
    children: [
      {
          path: '',
          component: AtelierComponent,
          outlet: 'toolbar',
          children: [
            {
              path: '',
              component: QuickTaskFormComponent,
              outlet: 'sidenav'
            }
          ]
      }
    ]
  },
  { path: 'atelier', component: AtelierComponent },
  { path: 'sav', component: SavComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
