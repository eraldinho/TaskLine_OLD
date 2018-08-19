import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { ScrudService } from '../../services/scrud/scrud.service';

@Component({
  selector: 'app-new-task-form-dialog',
  templateUrl: './new-task-form-dialog.component.html',
  styleUrls: ['./new-task-form-dialog.component.scss']
})
export class NewTaskFormDialogComponent implements OnInit {

  taskTypes;
  Types;
  Prestations;
  ATDForm: FormGroup;
  commentCtrl: FormControl;
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
  deviceResetCtrl: FormControl;
  deviceDescriptionCtrl: FormControl;
  // Panne
  panneGroup: FormGroup;
  panneDescriptionCtrl: FormControl;
  // Prestations
  prestationsArray: FormArray;

  constructor(private fb: FormBuilder,private scrudService: ScrudService) {
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
      deviceReset: this.deviceResetCtrl,
      deviceDescription: this.deviceDescriptionCtrl
    });
    this.panneGroup = fb.group({
      panneDescription: this.panneDescriptionCtrl
    });
    this.prestationsArray = fb.array([]);
    this.ATDForm = fb.group({
      task: this.taskGroup,
      client: this.clientGroup,
      device: this.deviceGroup,
      panne: this.panneGroup,
      prestations: this.prestationsArray,
      comment: this.commentCtrl
    });
  }

  ngOnInit() {
    this.taskTypes = this.scrudService.RetrieveDocument('config/task');
    this.taskTypes.subscribe(val => this.Types = val.types);
    this.Prestations = this.scrudService.RetrieveCollection('prestations');
  }

  initPrestation(monnom,monprix,moncode) {
    // initialize our Prestation
    return this.fb.group({
        nom: [monnom],
        prix: [monprix],
        code: [moncode]
    });
  }

  addPrestation(monnom,monprix,moncode) {
    // add Prestation to the list
    const control = <FormArray>this.ATDForm.controls['prestations'];
    control.push(this.initPrestation(monnom,monprix,moncode));
  }

}