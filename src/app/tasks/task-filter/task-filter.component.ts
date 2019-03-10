import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { TasksService } from '../../services/tasks/tasks.service';
import { ScrudService } from '../../services/scrud/scrud.service';


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
  isaChecked: boolean;
  iscChecked: boolean;
  iseChecked: boolean;
  ismChecked: boolean;
  isclChecked: boolean;
  isenChecked: boolean;
  isapChecked: boolean;
  isarChecked: boolean;
  istChecked: boolean;
  nbAtelier: number;
  nbCompta: number;
  nbExpedition: number;
  nbMontage: number;
  nbClient: number;
  nbEncours: number;
  nbAttenterepclient: number;
  nbAttenteretclient: number;
  nbTerminee: number;

  constructor(private fb: FormBuilder, private tasksService: TasksService, private scrudService: ScrudService) {
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
    this.scrudService.RetrieveCollectionWhere('tasks', 'task.taskType', '==', 'atelier')
    .subscribe((res) => {
      this.nbAtelier = res.filter(val => val.task.status !== 'terminee').length;
    });
    this.scrudService.RetrieveCollectionWhere('tasks', 'task.taskType', '==', 'compta')
    .subscribe((res) => {
      this.nbCompta = res.filter(val => val.task.status !== 'terminee').length;
    });
    this.scrudService.RetrieveCollectionWhere('tasks', 'task.taskType', '==', 'expedition')
    .subscribe((res) => {
      this.nbExpedition = res.filter(val => val.task.status !== 'terminee').length;
    });
    this.scrudService.RetrieveCollectionWhere('tasks', 'task.taskType', '==', 'client')
    .subscribe((res) => {
      this.nbClient = res.filter(val => val.task.status !== 'terminee').length;
    });
    this.scrudService.RetrieveCollectionWhere('tasks', 'task.taskType', '==', 'montage')
    .subscribe((res) => {
      this.nbMontage = res.filter(val => val.task.status !== 'terminee').length;
    });
    this.scrudService.RetrieveCollectionWhere('tasks', 'task.status', '==', 'encours')
    .subscribe((res) => {
      this.nbEncours = res.length;
    });
    this.scrudService.RetrieveCollectionWhere('tasks', 'task.status', '==', 'attenterepclient')
    .subscribe((res) => {
      this.nbAttenterepclient = res.length;
    });
    this.scrudService.RetrieveCollectionWhere('tasks', 'task.status', '==', 'attenteretclient')
    .subscribe((res) => {
      this.nbAttenteretclient = res.length;
    });
    this.scrudService.RetrieveCollectionWhere('tasks', 'task.status', '==', 'terminee')
    .subscribe((res) => {
      this.nbTerminee = res.length;
    });
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

  buttonToggle(filter: string, value: string, isChecked: boolean) {
    if (isChecked) {
      isChecked = false;
      this.filter(filter, '');
    } else {
      isChecked = true;
      this.filter(filter, value);
    }
  }

  clean(filter: string, value: string) {
    console.log(filter);
    console.log(value);
    this.isaChecked = false;
    this.iscChecked = false;
    this.iseChecked = false;
    this.ismChecked = false;
    this.isclChecked = false;
    this.isenChecked = false;
    this.isapChecked = false;
    this.isarChecked = false;
    this.istChecked = false;
    this.filter(filter, value);
  }

}
