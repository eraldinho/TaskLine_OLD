import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { TasksService } from '../../services/tasks/tasks.service';

@Component({
  selector: 'app-task-filter',
  templateUrl: './task-filter.component.html',
  styleUrls: ['./task-filter.component.scss']
})
export class TaskFilterComponent implements OnInit {
  TFForm: FormGroup;
  findCtrl: FormControl;
  typeCtrl: FormControl;
  statusCtrl: FormControl;
  dateCtrl: FormControl;
  date2Ctrl: FormControl;
  oUserCtrl: FormControl;
  dUserCtrl: FormControl;
  wFCAnswerCtrl: FormControl;
  isChecked: boolean;
  nbAtelier: number;
  nbCompta: number;
  nbExpedition: number;
  nbMontage: number;
  nbClient: number;
  nbEncours: number;
  nbAttenterepclient: number;
  nbAttenteretclient: number;
  nbTerminee: number;

  constructor(private fb: FormBuilder, private tasksService: TasksService) {
    this.TFForm = fb.group({
      find: this.findCtrl,
      type: this.typeCtrl,
      status: this.statusCtrl,
      date: this.dateCtrl,
      date2: this.date2Ctrl,
      oUser: this.oUserCtrl,
      dUser: this.dUserCtrl,
      wFCAnswer: this.wFCAnswerCtrl
    });
   }

  ngOnInit() {
  }

  filter(filter: string, value: string) {
    console.log('filter : ' + filter + ' => ' + value);
    // si datefin n'est pas saisi
    if (filter === 'dateD' && this.TFForm.get('date2').pristine) {
      // on filtre uniquement sur date1
      // on affiche uniquement les taches dont la date d'echeance
      // est égale à la date saisi dans le champs date
      this.tasksService.filterTask('dateF', value);
    }
    this.tasksService.filterTask(filter, value);
  }

  clean(filter: string, value: string) {
    this.isChecked =false;
    this.filter(filter, value);
  }

}
