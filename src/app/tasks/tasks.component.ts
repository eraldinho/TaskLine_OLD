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
  tabSelectedIndex = 0;

  constructor(private afAuth: AngularFireAuth, private tasksService: TasksService) {
    tasksService.tasksEdited$.subscribe(
      task => {
        if (!this.tabs[this.currentUser]) { // si le tableau de taches ouvertes (onglet) n'existe pas pour cet utilisateur
          this.tabs[this.currentUser] = []; // on le crée
        }
        let indexTab = this.findTaskinTabs(task[1]);
        if (indexTab.length < 1) {// si l'onglet n'est pas deja ouvert
          this.tabs[this.currentUser].push(task); // puis on y ajoute la tache sélectionnée (clic sur btn édit dans liste de tache)
          indexTab = this.findTaskinTabs(task[1]);
          this.tabSelectedIndex = indexTab[0] + 2;
        } else {
          this.tabSelectedIndex = indexTab[0] + 2;
        }
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

  closeTab (task: string) {
    const indexTab = this.findTaskinTabs(task);
    for (let i = 0; i < indexTab.length; i++) {
      this.tabs[this.currentUser].splice(indexTab[i], 1);
    }
  }

  findTaskinTabs (taskName): number[] {
    const indexTab = [];
    for (let i = 0; i < this.tabs[this.currentUser].length ; i++) {
      if (this.tabs[this.currentUser][i].indexOf(taskName) > -1) {
        indexTab.push(i);
      }
    }
    return indexTab;
  }

}
