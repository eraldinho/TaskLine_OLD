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
import { CustomerFormService } from '../../services/forms/customerformservice/customer-form.service';
import { DeliveryFormService } from '../../services/forms/deliveryformservice/delivery-form.service';
import { DeviceFormService } from '../../services/forms/deviceformservice/device-form.service';
import { FailureFormService } from '../../services/forms/failureformservice/failure-form.service';
import { ProgressFormService } from '../../services/forms/progressformservice/progress-form.service';
import { TaskFormService } from '../../services/forms/taskformservice/task-form.service';
import { Delivery } from 'src/app/shared/interfaces/delivery/delivery';

@Component({
  selector: 'app-edit-task-form',
  templateUrl: './edit-task-form.component.html',
  styleUrls: ['./edit-task-form.component.scss'],
  providers:  [
    AssemblyFormService,
    CustomerFormService,
    DeliveryFormService,
    DeviceFormService,
    FailureFormService,
    ProgressFormService,
    TaskFormService
 ]
})
export class EditTaskFormComponent implements OnInit {
  get assemblyGroup(): FormGroup {
    return this.assemblyFormService.assemblyGroup;
  }
  get customerGroup(): FormGroup {
    return this.customerFormService.customerGroup;
  }
  get deliveryGroup(): FormGroup {
    return this.deliveryFormService.deliveryGroup;
  }
  get deviceGroup(): FormGroup {
    return this.deviceFormService.deviceGroup;
  }
  get failureGroup(): FormGroup {
    return this.failureFormService.failureGroup;
  }
  get progressGroup(): FormGroup {
    return this.progressFormService.progressGroup;
  }
  get taskGroup(): FormGroup {
    return this.taskFormService.taskGroup;
  }

  @Input() taskID: string;
  filteredOptions: Observable<Delivery[]>;
  Locations;
  LocationsAvailable;
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
  constructor(private fb: FormBuilder,
              private scrudService: ScrudService,
              public snackBar: MatSnackBar,
              private tasksService: TasksService,
              private dialog: MatDialog,
              private afAuth: AngularFireAuth,
              private assemblyFormService: AssemblyFormService,
              private customerFormService: CustomerFormService,
              private deliveryFormService: DeliveryFormService,
              private deviceFormService: DeviceFormService,
              private failureFormService: FailureFormService,
              private progressFormService: ProgressFormService,
              private taskFormService: TaskFormService) {
    this.ATDForm = fb.group({
      task: this.taskGroup,
      customer: this.customerGroup,
      device: this.deviceGroup,
      failure: this.failureGroup,
      delivery: this.deliveryGroup,
      progress: this.progressGroup,
      assembly: this.assemblyGroup
    });
  }

  ngOnInit() {
    const control = <FormArray>this.ATDForm.get('delivery').get('deliveryArray');
    const control2 = <FormArray>this.ATDForm.get('progress').get('progressArray');
    this.tasksService.cleanDelivery(this.ATDForm);
    this.cleaninProgress();
    this.ATDForm.disable();
    this.mytask = this.scrudService.RetrieveDocument('tasks/' + this.taskID);
    this.mytask.subscribe(val => {
      console.log(val);
      if (val.delivery.deliveryArray) {
        console.log('prestations' + '***' + val.delivery.deliveryArray.length + '@@@' + control.length);
        if (val.delivery.deliveryArray.length > 0 && val.delivery.deliveryArray.length > control.length) {
          for (let i = 0; i < val.delivery.deliveryArray.length; i++ ) {
            console.log(i);
            this.tasksService.addEmptyDelivery(this.ATDForm, this.fb);
          }
        }
      }
      if (val.progress.progressArray) {
        console.log('inProgress' + '***' + val.progress.progressArray.length + '@@@' + control2.length);
        if (val.progress.progressArray.length > 0 && val.progress.progressArray.length > control2.length) {
          for (let i = 0; i < val.progress.progressArray.length; i++ ) {
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
    this.Locations = this.scrudService.RetrieveCollection('locations');
    this.Locations.subscribe(val => this.LocationsAvailable = val.filter(aLocation => aLocation.used === false)
      .sort(function(a, b) {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      }));
    this.taskTypes = this.scrudService.RetrieveDocument('config/task');
    this.taskTypes.subscribe(val => this.Types = val.types);
    this.Prestations = this.scrudService.RetrieveCollection('prestations');
    this.Prestations.subscribe(val => this.myPrestations = val);
    this.filteredOptions = this.ATDForm.get('delivery').get('deliveryAdd').valueChanges.pipe(
      map(nom => this.tasksService.filter(nom, this.myPrestations))
    );

    this.currentUser = this.afAuth.authState;
    this.afAuth.authState.subscribe(userData => {
      if (userData !== null) {
        this.currentUser = userData.email;
      }
    });
  }

  initProgress(myAction,  myLog) {
    // initialize our Progress
    return this.fb.group({
        action: [myAction],
        log: [myLog]
    });
  }

  addEmptyProgress() {
    // add  empty Progress to the list
    const control = <FormArray>this.ATDForm.get('progress').get('progressArray');
    control.push(this.initProgress('', ''));
    this.ATDForm.get('progress').get('progressArray').disable();
  }

  addProgress() {
    // add Progress to the list
    if (this.ATDForm.get('progress').get('progressAdd').enabled) {
      if (this.ATDForm.get('progress').get('progressAdd').value) {
          const control = <FormArray>this.ATDForm.get('progress').get('progressArray');
          const mydate = new Date ();
          const myDisplayString = '(' + this.currentUser + ' - ' + moment(mydate).format('dddd, MMMM Do YYYY, h:mm:ss a');
          control.push(this.initProgress(this.ATDForm.get('progress').get('progressAdd').value, myDisplayString));
          this.ATDForm.get('progress').get('progressAdd').setValue('');
          this.ATDForm.get('progress').get('progressArray').disable();
          this.logIt(false, this.ATDForm.controls['task'].get['status'], 'avancement atelier',
           this.ATDForm.get('progress').get('progressAdd').value);
          this.unlock();
      }
    }
  }

  cleaninProgress() {
    // remove progress from the list
    const control = <FormArray>this.ATDForm.get('progress').get('progressArray');
    for (let i = 0; i < control.length; i++) {
      control.removeAt(i);
    }
  }

  disableProgress() {
    const control = <FormArray>this.ATDForm.get('progress').get('progressArray');
    for (let i = 0; i < control.length; i++) {
      const progress = control.get([i]);
      progress.disable();
    }
  }

  //the next 3 functions are used to lock and unlock the ATDForm by responding to event sent by App-Task-Form
  isLocked(state: boolean) {
    console.log('isLocked');
    state ? this.lock() : this.unlock();
  }

  unlock() {
    this.ATDForm.enable();
    this.tasksService.enableDelivery(this.ATDForm);
    this.ATDForm.get('progress').get('progressArray').disable();
    this.ATDForm.get('task').get('taskType').disable();
    this.disableLogInput(this.assemblyGroup);
  }

  lock() {
    this.ATDForm.disable();
    this.tasksService.disableDelivery(this.ATDForm);
    this.ATDForm.get('task').get('taskType').disable();
    this.register();
  }

  register() {
    this.ATDForm.get('delivery').get('deliveryAdd').setValue('');
    this.ATDForm.enable();
    this.ATDForm.get('delivery').get('deliveryArray').enable();
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
    this.ATDForm.get('delivery').get('deliveryArray').disable();
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
          const myUpdate = this.ATDForm.get('task').value;
          myUpdate.status = 'terminee';
          myUpdate.taskDueDate = Date.parse(myUpdate.taskDueDate);
          this.scrudService.UpdateDocument('tasks', taskId, {task: myUpdate})
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
    if (!this.ATDForm.get('assembly').disabled) {
      console.log('hola: ' + valuectrl);
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
      this.ATDForm.get('assembly').enable();
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
