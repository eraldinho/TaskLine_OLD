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
    private scrudService: ScrudService, public snackBar: MatSnackBar) {
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
