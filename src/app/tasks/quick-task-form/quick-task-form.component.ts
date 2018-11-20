import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { ScrudService } from '../../services/scrud/scrud.service';
import {MatSnackBar} from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-quick-task-form',
  templateUrl: './quick-task-form.component.html',
  styleUrls: ['./quick-task-form.component.scss']
})
export class QuickTaskFormComponent implements OnInit {
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
  assemblyCtrl: FormControl;
  cableConnectionCtrl: FormControl;
  BIOSUpdateCtrl: FormControl;
  BIOSSetUpCtrl: FormControl;
  LicenceStickerCtrl: FormControl;
  OSVersionCtrl: FormControl;
  OSInstallationCtrl: FormControl;
  OSUpdateCtrl: FormControl;
  driversCtrl: FormControl;
  drivesCtrl: FormControl;
  OSActivationCtrl: FormControl;
  fanCtrl: FormControl;
  USBCtrl: FormControl;
  jackCtrl: FormControl;
  opticalDriveCtrl: FormControl;
  cardReaderCtrl: FormControl;
  shutDownCtrl: FormControl;
  packagingCtrl: FormControl;
  softwareValidationCtrl: FormControl;
  assemblyCommentCtrl: FormControl;

  constructor(fb: FormBuilder, private scrudService: ScrudService, public snackBar: MatSnackBar, private dialog: MatDialog) {
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

  register() {
    console.log(this.ATDForm.value);
  }

  AddTask(type: string, delai: number, complementNom: string= '') {
    if (this.ATDForm.value.task.taskName) {
      const today = Date.now();
      this.ATDForm.value.task.taskName = complementNom + this.ATDForm.value.task.taskName;
      this.ATDForm.value.task.taskType = type;
      this.ATDForm.value.task.taskDueDate = today + delai;
      this.scrudService.AddDoc2Collection('tasks', this.ATDForm.value)
      .then((result) => {
        let action: string;
        result === 1 ?  (this.ATDForm.reset() , action = 'Succès') : action = 'Echec';
        this.snackBar.open('Ajout ' +  type, action, {
          duration: 3000,
        });
      });
    }
  }

  OpenNewTaskDialog() {
    // this.NewTaskDialogRef = this.dialog.open(NewTaskFormDialogComponent, {width:window.innerWidth+'px'});
  }

  ngOnInit() {
  }

}
