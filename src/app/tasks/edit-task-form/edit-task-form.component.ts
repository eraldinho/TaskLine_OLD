import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { ScrudService } from '../../services/scrud/scrud.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatDialog, MatDialogRef, MatDialogConfig, MatSnackBar} from '@angular/material';
import { AngularFireAuth } from 'angularfire2/auth';
import * as moment from 'moment';

import { TaskDoneDialogComponent } from './task-done-dialog/task-done-dialog.component';
import { TaskNotDoneDialogComponent } from './task-not-done-dialog/task-not-done-dialog.component';

import { TasksService } from '../../services/tasks/tasks.service';
import { AssemblyFormService } from '../../services/forms/assemblyformservice/assembly-form.service';


export interface Prestation {
  nom: string;
  prix: number;
  code: string;
}

export interface Progress {
  detail: string;
  done: boolean;
  log: string;
}

@Component({
  selector: 'app-edit-task-form',
  templateUrl: './edit-task-form.component.html',
  styleUrls: ['./edit-task-form.component.scss']
})
export class EditTaskFormComponent implements OnInit {
  get assemblyGroup(): FormGroup {
    return this.assemblyFormService.assemblyGroup;
  }

  @Input() taskID: string;
  filteredOptions: Observable<Prestation[]>;
  taskTypes;
  Types;
  mytask;
  Prestations;
  myPrestations;
  taskName;
  currentUser;
  // switch for disabling formgroups
  DisabletaskGroup = 1;
  ATDForm: FormGroup;
  commentCtrl: FormControl;
  originUserCtrl: FormControl;
  destinationUserCtrl: FormControl;
  statusCtrl: FormControl;
  WCACtrl: FormControl;
  CMPCtrl: FormControl;
  // tache
  taskGroup: FormGroup;
  taskNameCtrl: FormControl;
  taskCreationDateCtrl: FormControl;
  taskDueDateCtrl: FormControl;
  taskOperatorCtrl: FormControl;
  taskTypeCtrl: FormControl;
  // client
  clientGroup: FormGroup;
  clientNameCtrl: FormControl;
  clientFirstNameCtrl: FormControl;
  clientNumberCtrl: FormControl;
  clientMailCtrl: FormControl;
  clientPhoneCtrl: FormControl;
  // materiel
  deviceGroup: FormGroup;
  deviceTypeCtrl: FormControl;
  deviceBrandCtrl: FormControl;
  deviceStartCtrl: FormControl;
  deviceDisplayCtrl: FormControl;
  deviceOsStartCtrl: FormControl;
  deviceResetCtrl: FormControl;
  deviceDescriptionCtrl: FormControl;
  // Panne
  panneGroup: FormGroup;
  panneDescriptionCtrl: FormControl;
  // Prestations
  prestationsArray: FormArray;
  prestationAddCtrl: FormControl;
  // avancement
  inProgressArray: FormArray;
  progressAddCtrl: FormControl;
  constructor(private fb: FormBuilder,
              private scrudService: ScrudService, public snackBar: MatSnackBar,
              private tasksService: TasksService,
              private dialog: MatDialog,
              private afAuth: AngularFireAuth,
              private assemblyFormService: AssemblyFormService) {
      // task
      this.taskNameCtrl = fb.control('');
      this.taskTypeCtrl = fb.control('');
      this.taskCreationDateCtrl = fb.control('');
      this.taskDueDateCtrl = fb.control('');
      this.taskOperatorCtrl = fb.control('');
      // client
      this.clientNameCtrl = fb.control('');
      this.clientFirstNameCtrl = fb.control('');
      this.clientNumberCtrl = fb.control('');
      this.clientMailCtrl = fb.control('');
      this.clientPhoneCtrl = fb.control('');
      // device
      this.deviceTypeCtrl = fb.control('');
      this.deviceBrandCtrl = fb.control('');
      this.deviceStartCtrl = fb.control('');
      this.deviceDisplayCtrl = fb.control('');
      this.deviceOsStartCtrl = fb.control('');
      this.deviceResetCtrl = fb.control('');
      this.deviceDescriptionCtrl = fb.control('');
      // panne
      this.panneDescriptionCtrl = fb.control('');
      // ATDForm
      this.prestationAddCtrl = fb.control('');
      this.inProgressArray = fb.array([]);
      this.commentCtrl = fb.control('');
      this.originUserCtrl = fb.control('');
      this.destinationUserCtrl = fb.control('');
      this.statusCtrl = fb.control('');
      this.WCACtrl = fb.control('');
      this.CMPCtrl = fb.control('');
    this.taskGroup = fb.group({
        taskName: this.taskNameCtrl,
        taskType: this.taskTypeCtrl,
        taskCreationDate: this.taskCreationDateCtrl,
        taskDueDate: this.taskDueDateCtrl,
        taskOperator: this.taskOperatorCtrl
    });
    this.clientGroup = fb.group({
      clientName: this.clientNameCtrl,
      clientFirstName: this.clientFirstNameCtrl,
      clientNumber: this.clientNumberCtrl,
      clientMail: this.clientMailCtrl,
      clientPhone: this.clientPhoneCtrl
    });
    this.deviceGroup = fb.group({
      deviceType: this.deviceTypeCtrl,
      deviceBrand: this.deviceBrandCtrl,
      deviceStart: this.deviceStartCtrl,
      deviceDisplay: this.deviceDisplayCtrl,
      deviceOsStart: this.deviceOsStartCtrl,
      deviceReset: this.deviceResetCtrl,
      deviceDescription: this.deviceDescriptionCtrl
    });
    this.panneGroup = fb.group({
      panneDescription: this.panneDescriptionCtrl
    });
    this.prestationsArray = fb.array([]);
    this.inProgressArray = fb.array([]);
    this.ATDForm = fb.group({
      task: this.taskGroup,
      client: this.clientGroup,
      device: this.deviceGroup,
      panne: this.panneGroup,
      prestationAdd: this.prestationAddCtrl,
      prestations: this.prestationsArray,
      comment: this.commentCtrl,
      progressAdd: this.progressAddCtrl,
      inProgress: this.inProgressArray,
      assemblygroup: this.assemblyGroup,
      originUser: this.originUserCtrl,
      destinationUser: this.destinationUserCtrl,
      status: this.statusCtrl,
      WCA: this.WCACtrl,
      CMP: this.CMPCtrl
    });
  }

  ngOnInit() {
    const control = <FormArray>this.ATDForm.controls['prestations'];
    const control2 = <FormArray>this.ATDForm.controls['inProgress'];
    this.cleanPrestation();
    this.cleaninProgress();
    this.ATDForm.disable();
    this.mytask = this.scrudService.RetrieveDocument('tasks/' + this.taskID);
    this.mytask.subscribe(val => {
      console.log(val);
      if (val.prestations) {
        console.log('prestations' + '***' + val.prestations.length + '@@@' + control.length);
        if (val.prestations.length > 0 && val.prestations.length > control.length) {
          for (let i = 0; i < val.prestations.length; i++ ) {
            console.log(i);
            this.addEmptyPrestation();
          }
        }
      }
      if (val.inProgress) {
        console.log('inProgress' + '***' + val.inProgress.length + '@@@' + control2.length);
        if (val.inProgress.length > 0 && val.inProgress.length > control2.length) {
          for (let i = 0; i < val.inProgress.length; i++ ) {
            console.log(i);
            this.addEmptyProgress();
          }
        }
      }
      this.ATDForm.setValue(val);
      const mydate = new Date(this.ATDForm.get('task').get('taskDueDate').value);
      this.ATDForm.get('task').get('taskDueDate').setValue(mydate);
      this.taskName = this.ATDForm.get('task').get('taskName').value;

    });
    this.taskTypes = this.scrudService.RetrieveDocument('config/task');
    this.taskTypes.subscribe(val => this.Types = val.types);
    this.Prestations = this.scrudService.RetrieveCollection('prestations');
    this.Prestations.subscribe(val => this.myPrestations = val);
    this.filteredOptions = this.ATDForm.get('prestationAdd').valueChanges.pipe(
      map(nom => this._filter(nom))
    );

    this.currentUser = this.afAuth.authState;
    this.afAuth.authState.subscribe(userData => {
      if (userData !== null) {
        this.currentUser = userData.email;
      }
    });
  }

  initPrestation(monnom, monprix, moncode) {
    // initialize our Prestation
    return this.fb.group({
        nom: [monnom],
        prix: [monprix],
        code: [moncode]
    });
  }

  initProgress(myAction,  myLog) {
    // initialize our Progress
    return this.fb.group({
        action: [myAction],
        log: [myLog]
    });
  }

  addEmptyPrestation() {
    // add  empty Prestation to the list
    const control = <FormArray>this.ATDForm.controls['prestations'];
    control.push(this.initPrestation('', '', ''));
    this.ATDForm.get('prestationAdd').setValue('');
    this.ATDForm.controls['prestations'].disable();
  }

  addEmptyProgress() {
    // add  empty Progress to the list
    const control = <FormArray>this.ATDForm.controls['inProgress'];
    control.push(this.initProgress('', ''));
    this.ATDForm.controls['inProgress'].disable();
  }

  addPrestation() {
    // add Prestation to the list if addPrestations control is enabled
    if (this.ATDForm.controls.prestationAdd.enabled) {
      if (this.ATDForm.get('prestationAdd').value) {
        const value = this.ATDForm.get('prestationAdd').value.split('   /   ');
        if (value.length === 3) {
          const control = <FormArray>this.ATDForm.controls['prestations'];
          control.push(this.initPrestation(value[0], value[1], value[2]));
          this.ATDForm.controls['prestations'].disable();
          this.ATDForm.get('prestationAdd').setValue('');
        }
      }
    }
  }

  addProgress() {
    // add Progress to the list
    if (this.ATDForm.controls.progressAdd.enabled) {
      if (this.ATDForm.get('progressAdd').value) {
          const control = <FormArray>this.ATDForm.controls['inProgress'];
          const mydate = new Date ();
          const myDisplayString = '(' + this.currentUser + ' - ' + moment(mydate).format('dddd, MMMM Do YYYY, h:mm:ss a');
          control.push(this.initProgress(this.ATDForm.get('progressAdd').value, myDisplayString));
          this.ATDForm.get('progressAdd').setValue('');
          this.ATDForm.controls['inProgress'].disable();
          this.logIt(false, this.statusCtrl, 'avancement atelier', this.ATDForm.get('progressAdd').value);
          this.unlock();
      }
    }
  }

  removePrestation(i: number) {
    // remove address from the list if addPrestations control is enabled
    if (this.ATDForm.controls.prestationAdd.enabled) {
      const control = <FormArray>this.ATDForm.controls['prestations'];
      control.removeAt(i);
    }
  }

  cleanPrestation() {
    // remove prestations from the list
    const control = <FormArray>this.ATDForm.controls['prestations'];
    for (let i = 0; i < control.length; i++) {
      control.removeAt(i);
    }
  }

  cleaninProgress() {
    // remove progress from the list
    const control = <FormArray>this.ATDForm.controls['inProgress'];
    for (let i = 0; i < control.length; i++) {
      control.removeAt(i);
    }
  }

  enablePrestation() {
    const control = <FormArray>this.ATDForm.controls['prestations'];
    for (let i = 0; i < control.length; i++) {
      const prestation = control.get([i]);
      prestation.enable();
    }
  }

  disablePrestation() {
    const control = <FormArray>this.ATDForm.controls['prestations'];
    for (let i = 0; i < control.length; i++) {
      const prestation = control.get([i]);
      prestation.disable();
    }
  }

  disableProgress() {
    const control = <FormArray>this.ATDForm.controls['inProgress'];
    for (let i = 0; i < control.length; i++) {
      const progress = control.get([i]);
      progress.disable();
    }
  }

  private _filter(value) {
    if (value) {
      const filterValue = value.toLowerCase();
      if (filterValue !== '') {
        return this.myPrestations.filter(option => option.nom.toLowerCase().includes(filterValue)
        || option.code_CEBO.toLowerCase().includes(filterValue));
      }
    } else {
      return;
    }
  }

  unlock() {
    this.ATDForm.enable();
    this.enablePrestation();
    this.ATDForm.get('inProgress').disable();
    this.ATDForm.get('task').get('taskType').disable();
    this.disableLogInput(this.assemblyGroup);

  }

  lock() {
    this.ATDForm.disable();
    this.disablePrestation();
    this.ATDForm.get('task').get('taskType').disable();
    this.register();
  }

  register() {
    this.ATDForm.get('prestationAdd').setValue('');
    this.ATDForm.enable();
    this.ATDForm.controls['prestations'].enable();
    this.ATDForm.value.task.taskDueDate = Date.parse(this.ATDForm.value.task.taskDueDate);
    // console.log(Date.parse(this.ATDForm.value.task.taskDueDate));
    this.scrudService.SetDocument('tasks', this.taskID, this.ATDForm.value)
    .then((result) => {
      let action: string;
      result === 1 ?  (action = 'Succès') : action = 'Echec';
      this.snackBar.open('Modification Tâche', action, {
        duration: 500,
      });
    });
    this.ATDForm.disable();
    this.ATDForm.controls['prestations'].disable();
    if (this.taskName !== this.ATDForm.get('task').get('taskName').value) {
      this.tasksService.changeTaskName([this.taskName, this.taskName = this.ATDForm.get('task').get('taskName').value]);
    }
  }

  taskDone(taskId) {
    console.log('taskDOne');
    console.log(this.isAllChecked(this.assemblyGroup));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = '100%';
    dialogConfig.data = {
      taskID: taskId,
    };
    if (this.isAllChecked(this.assemblyGroup) || this.ATDForm.get('task').get('taskType').value !== 'montage') {
      const dialogRef = this.dialog.open(TaskDoneDialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        if (result === 1) {
          this.scrudService.UpdateDocument('tasks', taskId, {status: 'terminee'})
          .then(val => {
            let action: string;
            val === 1 ?  (action = 'Succès') : action = 'Echec';
            this.snackBar.open('Validation Tâche', action, {
            duration: 3000,
            });
            this.tasksService.closeTaskTab(this.taskID);
          });
        }
      });

    } else {
      const dialogRef = this.dialog.open(TaskNotDoneDialogComponent, dialogConfig);
    }
  }

  logIt(display: boolean, formctrl: FormControl, myaction: string, valuectrl: FormControl) {
    if (!this.ATDForm.get('assemblygroup').disabled) {
      console.log('hola: ' + valuectrl.value);
    const mydate = new Date();
    if (display) {
      const myDisplayString = '(' + this.currentUser + ' - ' + moment(mydate).locale('fr').format('LLLL');
      formctrl.setValue(myDisplayString);
    }
    const myActionString = myaction + ' => value: ' + valuectrl.value;
    this.scrudService.AddDoc2Collection('logs',
      {Date: mydate,
      Familly: 'Tasks',
      ID: this.taskID,
      Name: this.ATDForm.get('task').get('taskName').value,
      Type: this.ATDForm.get('task').get('taskType').value,
      User: this.currentUser,
      Action: myActionString});
    }
    this.register();
    if (this.ATDForm.get('task').get('taskType').value === 'montage') {
      this.ATDForm.get('assemblygroup').enable();
      this.disableLogInput(this.assemblyGroup);
    }
  }

  isAllChecked(group: FormGroup): boolean {
    let allChecked = true;
    Object.keys(group.controls).forEach((key: string) => { // on parcours tous les item du group
      const control = group.get(key);
      if (control !== group.get('assemblyComment')) { // on ne controle pas le champs commentaire
        if (!control.value || control.value === false) { // si un champs n'est pas saisi
          allChecked = false;
        }
      }
    });
    return allChecked;
  }

  disableLogInput(group: FormGroup) {
    Object.keys(group.controls).forEach((key: string) => { // on parcours tous les item du group
      const control = group.get(key);
      if (key.endsWith('Log')) {
        control.disable();
      }
    });
  }
}
