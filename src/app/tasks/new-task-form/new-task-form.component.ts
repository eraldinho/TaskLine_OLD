import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { ScrudService } from '../../services/scrud/scrud.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';

export interface Prestation {
  nom: string;
  prix: number;
  code: string;
}

@Component({
  selector: 'app-new-task-form',
  templateUrl: './new-task-form.component.html',
  styleUrls: ['./new-task-form.component.scss']
})
export class NewTaskFormComponent implements OnInit {

  filteredOptions: Observable<Prestation[]>;
  taskTypes;
  Types;
  Prestations;
  myPrestations;
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

  constructor(private fb: FormBuilder, private scrudService: ScrudService, public snackBar: MatSnackBar) {
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
    this.ATDForm = fb.group({
      task: this.taskGroup,
      client: this.clientGroup,
      device: this.deviceGroup,
      panne: this.panneGroup,
      prestationAdd: this.prestationAddCtrl,
      prestations: this.prestationsArray,
      comment: this.commentCtrl
    });
  }

  ngOnInit() {
    this.taskTypes = this.scrudService.RetrieveDocument('config/task');
    this.taskTypes.subscribe(val => this.Types = val.types);
    this.Prestations = this.scrudService.RetrieveCollection('prestations');
    this.Prestations.subscribe(val => this.myPrestations = val);
    this.filteredOptions = this.ATDForm.get('prestationAdd').valueChanges.pipe(
      map(nom => this._filter(nom))
    );
  }

  initPrestation(monnom, monprix, moncode) {
    // initialize our Prestation
    return this.fb.group({
        nom: [monnom],
        prix: [monprix],
        code: [moncode]
    });
  }

  addPrestation() {
    // add Prestation to the list
    if (this.ATDForm.get('prestationAdd').value) {
      const value = this.ATDForm.get('prestationAdd').value.split('   /   ');
      if (value.length === 3) {
        const control = <FormArray>this.ATDForm.controls['prestations'];
        control.push(this.initPrestation(value[0], value[1], value[2]));
        this.ATDForm.get('prestationAdd').setValue('');
      }
    }
  }

  removePrestation(i: number) {
    // remove address from the list
    const control = <FormArray>this.ATDForm.controls['prestations'];
    control.removeAt(i);
  }

  cleanPrestation() {
    // remove address from the list
    const control = <FormArray>this.ATDForm.controls['prestations'];
    for (let i = 0; i < control.length; i++) {
      control.removeAt(i);
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

  register() {
    this.ATDForm.get('prestationAdd').setValue('');
    this.ATDForm.enable();
    this.ATDForm.controls['prestations'].enable();
    this.ATDForm.value.task.taskDueDate = Date.parse(this.ATDForm.value.task.taskDueDate);
    console.log(this.ATDForm.value);
    // console.log(Date.parse(this.ATDForm.value.task.taskDueDate));
    this.scrudService.AddDoc2Collection('tasks', this.ATDForm.value)
    .then((result) => {
      let action: string;
      result === 1 ?  (this.ATDForm.reset() , action = 'Succès') : action = 'Echec';
      this.snackBar.open('Ajout Tâche', action, {
        duration: 3000,
      });
    });
  }

  cancel() {
    this.ATDForm.reset();
    this.cleanPrestation();
  }

}
