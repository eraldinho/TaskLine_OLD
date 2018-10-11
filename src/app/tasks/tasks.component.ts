import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { TasksService } from '../services/tasks/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  currentUser;
  tabs = [];

  constructor(private afAuth: AngularFireAuth, private tasksService: TasksService) {
    tasksService.tasksEdited$.subscribe(
      task => {
        if (!this.tabs[this.currentUser]) {
          this.tabs[this.currentUser] = [];
        }
        this.tabs[this.currentUser].push(task);
        console.log(task[2]);
        console.log(this.tabs);
    });
   }

  ngOnInit() {
    this.currentUser = this.afAuth.authState;
    this.afAuth.authState.subscribe(userData => {
      this.currentUser = userData.email;
    });
  }

  addTab(data) {
    console.log(data[0]);
  }

}
