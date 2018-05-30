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

// forms
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// Angular Material
import {MatToolbarModule} from '@angular/material';

// Customs components
import { NewTaskFormComponent } from './new-task-form/new-task-form.component';


@NgModule({
  declarations: [
    AppComponent,
    NewTaskFormComponent
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
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
