import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { TasksService } from '../../services/tasks/tasks.service';
import { ScrudService } from '../../services/scrud/scrud.service';
import { Subscriber, Subscription } from 'rxjs';


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
  typeSelected = '';
  isaChecked: boolean;
  iscChecked: boolean;
  iseChecked: boolean;
  ismChecked: boolean;
  isclChecked: boolean;
  isafChecked: boolean;
  isenChecked: boolean;
  isapChecked: boolean;
  isarChecked: boolean;
  istChecked: boolean;
  nbAtelier: number;
  nbCompta: number;
  nbExpedition: number;
  nbMontage: number;
  nbClient: number;
  nbAfaire: number;
  nbEncours: number;
  nbAttenterepclient: number;
  nbAttenteretclient: number;
  nbTerminee: number;
  nbAfaireSub: Subscription;
  nbEncoursSub: Subscription;
  nbAttenterepclientSub: Subscription;
  nbAttenteretclientSub: Subscription;
  nbTermineeSub: Subscription;

  constructor(private fb: FormBuilder, private tasksService: TasksService, private scrudService: ScrudService) {
    this.TFForm = fb.group({
      find: this.findCtrl,
      type: this.typeCtrl,
      status: this.statusCtrl,
      date: this.dateCtrl,
      date2: this.date2Ctrl,
      oUser: this.oUserCtrl,
      dUser: this.dUserCtrl,
    });
   }

  ngOnInit() {
    this.initStream();
  }

  initStream() {
    console.log('iniStream()');
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
    this.nbAfaireSub = this.scrudService.RetrieveCollectionWhere('tasks', 'task.status', '==', 'afaire')
    .subscribe((res) => {
      this.nbAfaire = res.length;
    });
    this.nbEncoursSub = this.scrudService.RetrieveCollectionWhere('tasks', 'task.status', '==', 'encours')
    .subscribe((res) => {
      this.nbEncours = res.length;
      });
    this.nbAttenterepclientSub = this.scrudService.RetrieveCollectionWhere('tasks', 'task.status', '==', 'attenterepclient')
    .subscribe((res) => {
      this.nbAttenterepclient = res.length;
    });
    this.nbAttenteretclientSub = this.scrudService.RetrieveCollectionWhere('tasks', 'task.status', '==', 'attenteretclient')
    .subscribe((res) => {
      this.nbAttenteretclient = res.length;
    });
    this.nbTermineeSub = this.scrudService.RetrieveCollectionWhere('tasks', 'task.status', '==', 'terminee')
    .subscribe((res) => {
      this.nbTerminee = res.length;
    });
  }

  filter(myfilter: string, value: string) {
    console.log('filter : ' + myfilter + ' => ' + value);
    // si datefin n'est pas saisi
    if (myfilter === 'dateD' && this.TFForm.get('date2').pristine) {
      // on filtre uniquement sur date1
      // on affiche uniquement les taches dont la date d'echeance
      // est égale à la date saisi dans le champs date
      this.tasksService.filterTask('dateF', value);
    }
    this.tasksService.filterTask(myfilter, value);
    this.nbAfaireSub.unsubscribe();
    this.nbEncoursSub.unsubscribe();
    this.nbAttenterepclientSub.unsubscribe();
    this.nbAttenteretclientSub.unsubscribe();
    this.nbTermineeSub.unsubscribe();
    if (myfilter === 'type') {
      console.log('type Filter');
      switch (value) {
        case 'atelier':
        this.typeSelected = 'atelier';
        this.iscChecked = false;
        this.iseChecked = false;
        this.ismChecked = false;
        this.isclChecked = false;
        break;
        case 'compta':
        this.typeSelected = 'compta';
        this.isaChecked = false;
        this.iseChecked = false;
        this.ismChecked = false;
        this.isclChecked = false;
        break;
        case 'expedition':
        this.typeSelected = 'expedition';
        this.isaChecked = false;
        this.iscChecked = false;
        this.ismChecked = false;
        this.isclChecked = false;
        break;
        case 'montage':
        this.typeSelected = 'montage';
        this.isaChecked = false;
        this.iscChecked = false;
        this.iseChecked = false;
        this.isclChecked = false;
        break;
        case 'client':
        this.typeSelected = 'client';
        this.isaChecked = false;
        this.iscChecked = false;
        this.iseChecked = false;
        this.ismChecked = false;
        break;
      }
      this.nbAfaireSub = this.scrudService.RetrieveCollectionWhere('tasks', 'task.status', '==', 'afaire')
      .subscribe((res) => {
        this.nbAfaire = res.filter(val => val.task.taskType === this.typeSelected).length;
      });
      this.nbEncoursSub = this.scrudService.RetrieveCollectionWhere('tasks', 'task.status', '==', 'encours')
      .subscribe((res) => {
        this.nbEncours = res.filter(val => val.task.taskType === this.typeSelected).length;
      });
      this.nbAttenterepclientSub = this.scrudService.RetrieveCollectionWhere('tasks', 'task.status', '==', 'attenterepclient')
      .subscribe((res) => {
        this.nbAttenterepclient = res.filter(val => val.task.taskType === this.typeSelected).length;
      });
      this.nbAttenteretclientSub = this.scrudService.RetrieveCollectionWhere('tasks', 'task.status', '==', 'attenteretclient')
      .subscribe((res) => {
      this.nbAttenteretclient = res.filter(val => val.task.taskType === this.typeSelected).length;
      });
      this.nbTermineeSub = this.scrudService.RetrieveCollectionWhere('tasks', 'task.status', '==', 'terminee')
      .subscribe((res) => {
        this.nbTerminee = res.filter(val => val.task.taskType === this.typeSelected).length;
      });
    }
    if (myfilter === 'status') {
      switch (value) {
        case 'afaire':
        this.isenChecked = false;
        this.isapChecked = false;
        this.isarChecked = false;
        this.istChecked = false;
        break;
        case 'encours':
        this.isafChecked = false;
        this.isapChecked = false;
        this.isarChecked = false;
        this.istChecked = false;
        break;
        case 'attenterepclient':
        this.isafChecked = false;
        this.isenChecked = false;
        this.isarChecked = false;
        this.istChecked = false;
        break;
        case 'attenteretclient':
        this.isafChecked = false;
        this.isenChecked = false;
        this.isapChecked = false;
        this.istChecked = false;
        break;
        case 'terminee':
        this.isafChecked = false;
        this.isenChecked = false;
        this.isapChecked = false;
        this.isarChecked = false;
        break;
      }
      // si aucun filtre sur le type n'est selectionné
      if (!this.isaChecked && !this.iscChecked && ! this.isclChecked && !this.iseChecked && !this.ismChecked) {
        // on initialise les observables
        this.initStream();
      }
    }
  }

  clean(myfilter: string, value: string) {
    console.log(myfilter);
    console.log(value);
    this.typeSelected = '';
    this.isaChecked = false;
    this.iscChecked = false;
    this.iseChecked = false;
    this.ismChecked = false;
    this.isclChecked = false;
    this.isafChecked = false;
    this.isenChecked = false;
    this.isapChecked = false;
    this.isarChecked = false;
    this.istChecked = false;
    this.filter(myfilter, value);
    this.nbAfaireSub.unsubscribe();
    this.nbEncoursSub.unsubscribe();
    this.nbAttenterepclientSub.unsubscribe();
    this.nbAttenteretclientSub.unsubscribe();
    this.nbTermineeSub.unsubscribe();
    this.initStream();
  }

}
