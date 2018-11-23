import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { environment } from '../environments/environment';
export const firebaseConfig = environment.firebaseConfig;

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { DatePipe } from '@angular/common';

// forms
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// Angular Material
import {MatToolbarModule} from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_DATE_LOCALE} from '@angular/material';
import {MatNativeDateModule} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTabsModule} from '@angular/material/tabs';
import {MatRadioModule} from '@angular/material/radio';

// Customs components
import { NewTaskFormComponent } from './tasks/new-task-form/new-task-form.component';
import { TaskListPipe } from './task-list-pipe/task-list.pipe';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { TasksComponent } from './tasks/tasks.component';
import { AtelierComponent } from './atelier/atelier.component';
import { CommandesComponent } from './commandes/commandes.component';
import { SavComponent } from './sav/sav.component';
import { QuickTaskFormComponent } from './tasks/quick-task-form/quick-task-form.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TaskTabOneComponent } from './tasks/task-tab-one/task-tab-one.component';
import { EditTaskFormComponent } from './tasks/edit-task-form/edit-task-form.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserFormComponent } from './user-login/user-form/user-form.component';
import { DelayDialogComponent } from './tasks/task-list/delay-dialog/delay-dialog.component';
import { DoneDialogComponent } from './tasks/task-list/done-dialog/done-dialog.component';
import { TaskDoneDialogComponent } from './tasks/edit-task-form/task-done-dialog/task-done-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    NewTaskFormComponent,
    TaskListPipe,
    TaskListComponent,
    TasksComponent,
    AtelierComponent,
    CommandesComponent,
    SavComponent,
    QuickTaskFormComponent,
    NavbarComponent,
    TaskTabOneComponent,
    EditTaskFormComponent,
    UserLoginComponent,
    UserFormComponent,
    DelayDialogComponent,
    DoneDialogComponent,
    TaskDoneDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatDividerModule,
    MatCardModule,
    MatChipsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatRadioModule
  ],
  entryComponents: [DelayDialogComponent,
    DoneDialogComponent,
    TaskDoneDialogComponent],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
