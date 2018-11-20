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
  tabSelectedIndex;

  constructor(private afAuth: AngularFireAuth, private tasksService: TasksService) {
    tasksService.tasksEdited$.subscribe(
      // task = [taskId, taskName, taskType]
      task => {
        if (!this.tabs[this.currentUser]) { // si le tableau de taches ouvertes (onglet) n'existe pas pour cet utilisateur
          this.tabs[this.currentUser] = []; // on le crée
        }
        let indexTab = this.findTaskinTabs(task[0]);
        if (indexTab.length < 1) {// si l'onglet n'est pas deja ouvert
          this.tabs[this.currentUser].push(task); // ajoute la tache sélectionnée (clic sur btn édit dans liste de tache)
          indexTab = this.findTaskinTabs(task[0]);
          this.tabSelectedIndex = indexTab[0] + 2; // on selectionne l'obglet de la tache nouvellement créée
        } else {
          this.tabSelectedIndex = indexTab[0] + 2; // on selectionne l'obglet de la tache nouvellement créée
        }
    });

    tasksService.taskNameChanged$.subscribe(
      taskNames => {
        this.changeTaskName(taskNames);

      }
    );

    tasksService.taskTabClosed$.subscribe(
      taskID => {
        this.closeTab(taskID);

      }
    );
   }

  ngOnInit() {
    this.currentUser = this.afAuth.authState;
    this.afAuth.authState.subscribe(userData => {
      if (userData !== null) {
        this.currentUser = userData.email;
      }
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

  // look for task name in task tab (list of tabs of edited task for this user in UI) and return index if founded
  findTaskinTabs (taskID): number[] {
    const indexTab = [];
    for (let i = 0; i < this.tabs[this.currentUser].length ; i++) {
      if (this.tabs[this.currentUser][i].indexOf(taskID) > -1) {
        indexTab.push(i);
      }
    }
    return indexTab;
  }

  changeTaskName(taskNames: string[]) {
    console.log('changeTaskName');
    const i = this.findTaskinTabs(taskNames[0])[0];
    this.tabs[this.currentUser][i][1] = taskNames[1];
  }

}
