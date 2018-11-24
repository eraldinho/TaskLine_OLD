import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { ScrudService } from '../../services/scrud/scrud.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatDialog, MatDialogRef, MatDialogConfig, MatSnackBar} from '@angular/material';
import { TasksService } from '../../services/tasks/tasks.service';
import { TaskDoneDialogComponent } from './task-done-dialog/task-done-dialog.component';
import { TaskNotDoneDialogComponent } from './task-not-done-dialog/task-not-done-dialog.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { DatePipe } from '@angular/common';

export interface Prestation {
  nom: string;
  prix: number;
  code: string;
}

@Component({
  selector: 'app-edit-task-form',
  templateUrl: './edit-task-form.component.html',
  styleUrls: ['./edit-task-form.component.scss']
})
export class EditTaskFormComponent implements OnInit {

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
  doneCtrl: FormControl;
  inProgressCtrl: FormControl;
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
  // montage
  assemblyGroup: FormGroup;
  checkComponentCtrl: FormControl;
  checkComponentLogCtrl: FormControl;
  assemblyCtrl: FormControl;
  assemblyLogCtrl: FormControl;
  cableConnectionCtrl: FormControl;
  cableConnectionLogCtrl: FormControl;
  BIOSUpdateCtrl: FormControl;
  BIOSUpdateLogCtrl: FormControl;
  BIOSSetUpCtrl: FormControl;
  BIOSSetUpLogCtrl: FormControl;
  LicenceStickerCtrl: FormControl;
  LicenceStickerLogCtrl: FormControl;
  OSVersionCtrl: FormControl;
  OSVersionLogCtrl: FormControl;
  OSInstallationCtrl: FormControl;
  OSInstallationLogCtrl: FormControl;
  OSUpdateCtrl: FormControl;
  OSUpdateLogCtrl: FormControl;
  driversCtrl: FormControl;
  driversLogCtrl: FormControl;
  drivesCtrl: FormControl;
  drivesLogCtrl: FormControl;
  OSActivationCtrl: FormControl;
  OSActivationLogCtrl: FormControl;
  fanCtrl: FormControl;
  fanLogCtrl: FormControl;
  USBCtrl: FormControl;
  USBLogCtrl: FormControl;
  jackCtrl: FormControl;
  jackLogCtrl: FormControl;
  opticalDriveCtrl: FormControl;
  opticalDriveLogCtrl: FormControl;
  cardReaderCtrl: FormControl;
  cardReaderLogCtrl: FormControl;
  shutDownCtrl: FormControl;
  shutDownLogCtrl: FormControl;
  packagingCtrl: FormControl;
  packagingLogCtrl: FormControl;
  softwareValidationCtrl: FormControl;
  softwareValidationLogCtrl: FormControl;
  assemblyCommentCtrl: FormControl;

  constructor(private fb: FormBuilder,
              private scrudService: ScrudService, public snackBar: MatSnackBar,
              private tasksService: TasksService,
              private dialog: MatDialog,
              private afAuth: AngularFireAuth,
              public datepipe: DatePipe) {
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
      // montage
      this.checkComponentCtrl = fb.control('');
      this.assemblyCtrl = fb.control('');
      this.cableConnectionCtrl = fb.control('');
      this.BIOSUpdateCtrl = fb.control('');
      this.BIOSSetUpCtrl = fb.control('');
      this.LicenceStickerCtrl = fb.control('');
      this.OSVersionCtrl = fb.control('');
      this.OSInstallationCtrl = fb.control('');
      this.OSUpdateCtrl = fb.control('');
      this.driversCtrl = fb.control('');
      this.drivesCtrl = fb.control('');
      this.OSActivationCtrl = fb.control('');
      this.fanCtrl = fb.control('');
      this.USBCtrl = fb.control('');
      this.jackCtrl = fb.control('');
      this.opticalDriveCtrl = fb.control('');
      this.cardReaderCtrl = fb.control('');
      this.shutDownCtrl = fb.control('');
      this.packagingCtrl = fb.control('');
      this.softwareValidationCtrl = fb.control('');
      this.checkComponentLogCtrl = fb.control('');
      this.assemblyLogCtrl = fb.control('');
      this.cableConnectionLogCtrl = fb.control('');
      this.BIOSUpdateLogCtrl = fb.control('');
      this.BIOSSetUpLogCtrl = fb.control('');
      this.LicenceStickerLogCtrl = fb.control('');
      this.OSVersionLogCtrl = fb.control('');
      this.OSInstallationLogCtrl = fb.control('');
      this.OSUpdateLogCtrl = fb.control('');
      this.driversLogCtrl = fb.control('');
      this.drivesLogCtrl = fb.control('');
      this.OSActivationLogCtrl = fb.control('');
      this.fanLogCtrl = fb.control('');
      this.USBLogCtrl = fb.control('');
      this.jackLogCtrl = fb.control('');
      this.opticalDriveLogCtrl = fb.control('');
      this.cardReaderLogCtrl = fb.control('');
      this.shutDownLogCtrl = fb.control('');
      this.packagingLogCtrl = fb.control('');
      this.softwareValidationLogCtrl = fb.control('');
      this.assemblyCommentCtrl = fb.control('');
      // ATDForm
      this.prestationAddCtrl = fb.control('');
      this.commentCtrl = fb.control('');
      this.originUserCtrl = fb.control('');
      this.destinationUserCtrl = fb.control('');
      this.doneCtrl = fb.control('');
      this.inProgressCtrl = fb.control('');
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
    this.assemblyGroup = fb.group({
      checkComponent: this.checkComponentCtrl,
      assembly: this.assemblyCtrl,
      cableConnection: this.cableConnectionCtrl,
      BIOSUpdate: this.BIOSUpdateCtrl,
      BIOSSetUp: this.BIOSSetUpCtrl,
      LicenceSticker: this.LicenceStickerCtrl,
      OSVersion: this.OSVersionCtrl,
      OSInstallation: this.OSInstallationCtrl,
      OSUpdate: this.OSUpdateCtrl,
      drivers: this.driversCtrl,
      drives: this.drivesCtrl,
      OSActivation: this.OSActivationCtrl,
      fan: this.fanCtrl,
      USB: this.USBCtrl,
      jack: this.jackCtrl,
      opticalDrive: this.opticalDriveCtrl,
      cardReader: this.cardReaderCtrl,
      shutDown: this.shutDownCtrl,
      packaging: this.packagingCtrl,
      softwareValidation: this.softwareValidationCtrl,
      checkComponentLog: this.checkComponentLogCtrl,
      assemblyLog: this.assemblyLogCtrl,
      cableConnectionLog: this.cableConnectionLogCtrl,
      BIOSUpdateLog: this.BIOSUpdateLogCtrl,
      BIOSSetUpLog: this.BIOSSetUpCtrl,
      LicenceStickerLog: this.LicenceStickerLogCtrl,
      OSVersionLog: this.OSVersionLogCtrl,
      OSInstallationLog: this.OSInstallationLogCtrl,
      OSUpdateLog: this.OSUpdateLogCtrl,
      driversLog: this.driversLogCtrl,
      drivesLog: this.drivesLogCtrl,
      OSActivationLog: this.OSActivationLogCtrl,
      fanLog: this.fanLogCtrl,
      USBLog: this.USBLogCtrl,
      jackLog: this.jackLogCtrl,
      opticalDriveLog: this.opticalDriveLogCtrl,
      cardReaderLog: this.cardReaderLogCtrl,
      shutDownLog: this.shutDownLogCtrl,
      packagingLog: this.packagingLogCtrl,
      softwareValidationLog: this.softwareValidationLogCtrl,
      assemblyComment: this.assemblyCommentCtrl
    });
    this.ATDForm = fb.group({
      task: this.taskGroup,
      client: this.clientGroup,
      device: this.deviceGroup,
      panne: this.panneGroup,
      prestationAdd: this.prestationAddCtrl,
      prestations: this.prestationsArray,
      comment: this.commentCtrl,
      assemblygroup: this.assemblyGroup,
      originUser: this.originUserCtrl,
      destinationUser: this.destinationUserCtrl,
      done: this.doneCtrl,
      inProgress: this.inProgressCtrl
    });
  }

  ngOnInit() {
    const control = <FormArray>this.ATDForm.controls['prestations'];
    this.cleanPrestation();
    this.ATDForm.disable();
    this.mytask = this.scrudService.RetrieveDocument('tasks/' + this.taskID);
    this.mytask.subscribe(val => {
      if (val.prestations) {
        console.log('prestations' + '***' + val.prestations.length + '@@@' + control.length);
        if (val.prestations.length > 0 && val.prestations.length > control.length) {
          for (let i = 0; i < val.prestations.length; i++ ) {
            console.log(i);
            this.addEmptyPrestation();
          }
        }
      }
      console.log('edit  ' + JSON.stringify(val));
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

  addEmptyPrestation() {
    // add  empty Prestation to the list
    const control = <FormArray>this.ATDForm.controls['prestations'];
    control.push(this.initPrestation('', '', ''));
    this.ATDForm.get('prestationAdd').setValue('');
    this.ATDForm.controls['prestations'].disable();
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

  removePrestation(i: number) {
    // remove address from the list if addPrestations control is enabled
    if (this.ATDForm.controls.prestationAdd.enabled) {
      const control = <FormArray>this.ATDForm.controls['prestations'];
      control.removeAt(i);
    }
  }

  cleanPrestation() {
    // remove address from the list
    const control = <FormArray>this.ATDForm.controls['prestations'];
    for (let i = 0; i < control.length; i++) {
      control.removeAt(i);
    }
  }

  enablePrestation() {
    // remove address from the list
    const control = <FormArray>this.ATDForm.controls['prestations'];
    for (let i = 0; i < control.length; i++) {
      const prestation = control.get([i]);
      prestation.enable();
    }
  }

  disablePrestation() {
    // remove address from the list
    const control = <FormArray>this.ATDForm.controls['prestations'];
    for (let i = 0; i < control.length; i++) {
      const prestation = control.get([i]);
      prestation.disable();
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
    this.ATDForm.get('task').get('taskType').disable();
  }

  lock() {
    this.ATDForm.disable();
    this.disablePrestation();
    this.ATDForm.get('task').get('taskType').disable();
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
    if (this.isAllChecked(this.assemblyGroup)) {
      const dialogRef = this.dialog.open(TaskDoneDialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        if (result === 1) {
          this.scrudService.UpdateDocument('tasks', taskId, {done: true})
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
      const myDisplayString = '(' + this.currentUser + ' - ' + this.datepipe.transform(mydate, 'short', 'fr-FR');
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
    this.ATDForm.get('assemblygroup').enable();
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
}
