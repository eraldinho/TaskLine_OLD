import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { ScrudService } from '../../services/scrud/scrud.service';
import {Observable, Subscription} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatDialog, MatDialogRef, MatDialogConfig, MatSnackBar, MatAccordion} from '@angular/material';
import { AngularFireAuth } from 'angularfire2/auth';
import * as moment from 'moment';

import { TaskDoneDialogComponent } from './task-done-dialog/task-done-dialog.component';
import { TaskNotDoneDialogComponent } from './task-not-done-dialog/task-not-done-dialog.component';

import { AssemblyFormService } from '../../services/forms/assemblyformservice/assembly-form.service';
import { CustomerFormService } from '../../services/forms/customerformservice/customer-form.service';
import { DeliveryFormService } from '../../services/forms/deliveryformservice/delivery-form.service';
import { DeviceFormService } from '../../services/forms/deviceformservice/device-form.service';
import { FailureFormService } from '../../services/forms/failureformservice/failure-form.service';
import { ProgressFormService } from '../../services/forms/progressformservice/progress-form.service';
import { TaskFormService } from '../../services/forms/taskformservice/task-form.service';
import { CustomerhardwareFormService } from '../../services/forms/customerhardwareformservice/customerhardware-form.service';
import { CustomerrequestFormService } from '../../services/forms/customerrequestformservice/customerrequest-form.service';
import { DatastobesavedFormService } from '../../services/forms/datastobesavedformservice/datastobesaved-form.service';
import { AdditionalinformationsFormService } from '../../services/forms/additionalinformationsformservice/additionalinformations-form.service';

import { Delivery } from 'src/app/shared/interfaces/delivery/delivery';
import { TasksService } from 'src/app/services/tasks/tasks.service';
import { DatatosaveService } from 'src/app/services/datatosave/datatosave.service';

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
    TaskFormService,
    CustomerhardwareFormService,
    CustomerrequestFormService,
    DatastobesavedFormService,
    DatatosaveService,
    AdditionalinformationsFormService
 ]
})
export class EditTaskFormComponent implements OnInit, OnDestroy {
  @ViewChild('taskAccordion') taskAccordion: MatAccordion;
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
  get hardwareGroup(): FormGroup {
    return this.customerhardwareFormService.hardwareGroup;
  }
  get customerrequestGroup(): FormGroup {
    return this.customerrequestFormService.customerrequestGroup;
  }
  get datastobesavedGroup(): FormGroup {
    return this.datastobesavedFormService.datastobesavedGroup;
  }
  get additionalinformationsGroup(): FormGroup {
    return this.additionalinformationsFormService.additionalinformationsGroup;
  }

  @Input() taskID: string;
  private taskSub: Subscription;
  private taskTypeSub: Subscription;
  private locationSub: Subscription;
  private prestationSub: Subscription;
  private userSub: Subscription;
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
  ETForm: FormGroup;
  constructor(private fb: FormBuilder,
              private scrudService: ScrudService,
              public snackBar: MatSnackBar,
              public tasksService: TasksService,
              public datatosaveService: DatatosaveService,
              private dialog: MatDialog,
              private afAuth: AngularFireAuth,
              private assemblyFormService: AssemblyFormService,
              private customerFormService: CustomerFormService,
              private deliveryFormService: DeliveryFormService,
              private deviceFormService: DeviceFormService,
              private failureFormService: FailureFormService,
              private progressFormService: ProgressFormService,
              private taskFormService: TaskFormService,
              private customerhardwareFormService: CustomerhardwareFormService,
              private customerrequestFormService: CustomerrequestFormService,
              private datastobesavedFormService: DatastobesavedFormService,
              private additionalinformationsFormService: AdditionalinformationsFormService) {
    this.ETForm = fb.group({
      task: this.taskGroup,
      customer: this.customerGroup,
      device: this.deviceGroup,
      failure: this.failureGroup,
      delivery: this.deliveryGroup,
      progress: this.progressGroup,
      assembly: this.assemblyGroup,
      hardware: this.hardwareGroup,
      customerrequest: this.customerrequestGroup,
      datastobesaved: this.datastobesavedGroup,
      additionalinformations: this.additionalinformationsGroup
    });
  }

  ngOnInit() {
    const control = <FormArray>this.ETForm.get('delivery').get('deliveryArray');
    const control2 = <FormArray>this.ETForm.get('progress').get('progressArray');
    const control3 = <FormArray>this.ETForm.get('hardware').get('hardwareArray');
    this.tasksService.cleanDelivery(this.ETForm);
    this.cleaninProgress();
    this.ETForm.disable();
    this.mytask = this.scrudService.RetrieveDocument('tasks/' + this.taskID);
    this.taskSub = this.mytask.subscribe(val => {
      if (val.delivery.deliveryArray) {
        if (val.delivery.deliveryArray.length > 0 && val.delivery.deliveryArray.length > control.length) {
          for (let i = 0; i < val.delivery.deliveryArray.length; i++ ) {
            this.tasksService.addEmptyDelivery(this.ETForm, this.fb);
          }
        }
      }
      if (val.progress.progressArray) {
        if (val.progress.progressArray.length > 0 && val.progress.progressArray.length > control2.length) {
          for (let i = 0; i < val.progress.progressArray.length; i++ ) {
            this.addEmptyProgress();
          }
        }
      }
      if (val.hardware.hardwareArray) {
        if (val.hardware.hardwareArray.length > 0 && val.hardware.hardwareArray.length > control3.length) {
          for (let i = 0; i < val.hardware.hardwareArray.length; i++ ) {
            this.tasksService.addEmptyHardware(this.ETForm, this.fb);
          }
        }
      }
      this.ETForm.patchValue(val);
      const mydate = new Date(this.ETForm.get('task').get('taskDueDate').value);
      this.ETForm.get('task').get('taskDueDate').setValue(mydate);
      this.taskName = this.ETForm.get('task').get('taskName').value;

    });
    this.Locations = this.scrudService.RetrieveCollection('locations');
    this.locationSub = this.Locations.subscribe(val => this.LocationsAvailable = val.filter(aLocation => aLocation.used === false)
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
    this.taskTypeSub = this.taskTypes.subscribe(val => this.Types = val.types);
    this.Prestations = this.scrudService.RetrieveCollection('prestations');
    this.prestationSub = this.Prestations.subscribe(val => this.myPrestations = val);
    this.filteredOptions = this.ETForm.get('delivery').get('deliveryAdd').valueChanges.pipe(
      map(nom => this.tasksService.filter(nom, this.myPrestations))
    );

    this.currentUser = this.afAuth.authState;
    this.userSub = this.afAuth.authState.subscribe(userData => {
      if (userData !== null) {
        this.currentUser = userData.email;
      }
    });
  }

  ngOnDestroy(): void {
    this.taskSub.unsubscribe();
    this.taskTypeSub.unsubscribe();
    this.locationSub.unsubscribe();
    this.prestationSub.unsubscribe();
    this.userSub.unsubscribe();
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
    const control = <FormArray>this.ETForm.get('progress').get('progressArray');
    control.push(this.initProgress('', ''));
    this.ETForm.get('progress').get('progressArray').disable();
  }

  addProgress() {
    // add Progress to the list
    if (this.ETForm.get('progress').get('progressAdd').enabled) {
      if (this.ETForm.get('progress').get('progressAdd').value) {
          const control = <FormArray>this.ETForm.get('progress').get('progressArray');
          const mydate = new Date ();
          const myDisplayString = '(' + this.currentUser + ' - ' + moment(mydate).format('dddd, MMMM Do YYYY, h:mm:ss a');
          const progress = this.ETForm.get('progress').get('progressAdd').value;
          control.push(this.initProgress(progress, myDisplayString));
          if (this.ETForm.get('task').get('status').value !== 'terminee'
              && this.ETForm.get('task').get('status').value !== 'attenterepclient'
              && this.ETForm.get('task').get('status').value !== 'attenteretclient') {
                this.ETForm.get('task').get('status').setValue('encours');
          }
          this.ETForm.get('progress').get('progressAdd').setValue('');
          this.ETForm.get('progress').get('progressArray').disable();
          this.logIt(false, this.ETForm.controls['task'].get['status'], 'avancement atelier',
            this.ETForm.get('progress').get('progressAdd').value);
          this.unlock();
      }
    }
  }

  cleaninProgress() {
    // remove progress from the list
    const control = <FormArray>this.ETForm.get('progress').get('progressArray');
    for (let i = 0; i < control.length; i++) {
      control.removeAt(i);
    }
  }

  disableProgress() {
    const control = <FormArray>this.ETForm.get('progress').get('progressArray');
    for (let i = 0; i < control.length; i++) {
      const progress = control.get([i]);
      progress.disable();
    }
  }

  changeStatusCall() {
    if (this.ETForm.get('progress').enabled) {
      if (this.ETForm.get('task').get('status').value === 'attenterepclient') {
        this.ETForm.get('task').get('status').setValue('encours');
      } else {
        this.ETForm.get('task').get('status').setValue('attenterepclient');
      }
    }
  }

  unlock() {
    this.ETForm.enable();
    this.tasksService.enableDelivery(this.ETForm);
    this.ETForm.get('progress').get('progressArray').disable();
    this.ETForm.get('task').get('taskType').disable();
    this.ETForm.get('task').get('location').disable();
    this.ETForm.get('task').get('taskDueDate').disable();
    this.disableLogInput(this.assemblyGroup);
  }

  lock() {
    this.ETForm.disable();
    this.tasksService.disableDelivery(this.ETForm);
    this.ETForm.get('task').get('taskType').disable();
    this.register();
  }

  register() {
    console.log('register edit task');
    this.tasksService.saveTask(this.ETForm, this.taskID)
    .then ((res) => {
      this.ETForm.get('delivery').get('deliveryArray').disable();
      this.ETForm.disable();
      if (this.taskName !== this.ETForm.get('task').get('taskName').value) {
        this.tasksService.changeTaskName([this.taskName, this.taskName = this.ETForm.get('task').get('taskName').value]);
      }
    });
    /*this.ETForm.get('delivery').get('deliveryAdd').setValue('');
    this.ETForm.enable();
    this.ETForm.get('delivery').get('deliveryArray').enable();
    // si taskDueDate est une date on transforme en timestamp
    if (Object.prototype.toString.call(this.ETForm.value.task.taskDueDate) !== '[object Moment]') {
      this.ETForm.get('task').get('taskDueDate').setValue(Date.parse(this.ETForm.value.task.taskDueDate));
    }
    this.scrudService.SetDocument('tasks', this.taskID, this.ETForm.value)
    .then((result) => {
      let action: string;
      result === 1 ?  (action = 'Succès') : action = 'Echec';
      this.snackBar.open('Modification Tâche', action, {
        duration: 500,
      });
    });
    this.ETForm.get('delivery').get('deliveryArray').disable();
    this.ETForm.disable();
    if (this.taskName !== this.ETForm.get('task').get('taskName').value) {
      this.tasksService.changeTaskName([this.taskName, this.taskName = this.ETForm.get('task').get('taskName').value]);
    }*/
  }

  taskDone(taskId) {
    console.log('taskDOne');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = '100%';
    dialogConfig.data = {
      taskID: taskId,
    };
    if (this.isAllChecked(this.assemblyGroup) || this.ETForm.get('task').get('taskType').value !== 'montage') {
      const dialogRef = this.dialog.open(TaskDoneDialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        if (result === 1) {
          const myUpdate = this.ETForm.get('task').value;
          myUpdate.status = 'attenteretclient';
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

  deviceTaken(taskId) {
    // A coder : il faut libérer l'emplacement automatiquement
    const myUpdate = this.ETForm.get('task').value;
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

  logIt(display: boolean, formctrl: FormControl, myaction: string, valuectrl: FormControl, ACStatus?: boolean) {
    if (ACStatus) {
      if (this.ETForm.get('task').get('status').value !== 'terminee'
          && this.ETForm.get('task').get('status').value !== 'attenterepclient'
          && this.ETForm.get('task').get('status').value !== 'attenteretclient') {
            this.ETForm.get('task').get('status').setValue('encours');
      }
    }
    if (!this.ETForm.get('assembly').disabled) {
    const mydate = new Date();
    if (display) {
      const myDisplayString = '(' + this.currentUser + ' - ' + moment(mydate).locale('fr').format('LLLL');
      formctrl.setValue(myDisplayString);
    }
    const myActionString = myaction + ' => value: ' + valuectrl;
    this.scrudService.AddDoc2Collection('logs',
      {Date: mydate,
      Familly: 'Tasks',
      ID: this.taskID,
      Name: this.ETForm.get('task').get('taskName').value,
      Type: this.ETForm.get('task').get('taskType').value,
      User: this.currentUser,
      Action: myActionString});
    }
    this.register();
    if (this.ETForm.get('task').get('taskType').value === 'montage') {
      this.ETForm.get('assembly').enable();
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
