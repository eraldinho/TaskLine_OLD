import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { ScrudService } from '../../services/scrud/scrud.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';
import { stringify } from '@angular/core/src/util';
import { TasksService } from '../../services/tasks/tasks.service';

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
  // switch for disabling formgroups
  DisabletaskGroup = 1;
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
  // admin data
  adminDataGroup: FormGroup;
  originUserCtrl: FormControl;
  destinationUserCtrl: FormControl;
  doneCtrl: FormControl;
  inProgressCtrl: FormControl;

  constructor(private fb: FormBuilder, private scrudService: ScrudService, public snackBar: MatSnackBar,
    private tasksService: TasksService) {
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
    this.adminDataGroup = fb.group({
      originUser: this.originUserCtrl,
      destinationUser: this.destinationUserCtrl,
      done: this.doneCtrl,
      inProgress: this.inProgressCtrl,
    });
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
    console.log(this.ATDForm.value);
    // console.log(Date.parse(this.ATDForm.value.task.taskDueDate));
    this.scrudService.UpdateDocument('tasks', this.taskID, this.ATDForm.value)
    .then((result) => {
      let action: string;
      result === 1 ?  (action = 'Succès') : action = 'Echec';
      this.snackBar.open('Modification Tâche', action, {
        duration: 3000,
      });
    });
    this.ATDForm.disable();
    this.ATDForm.controls['prestations'].disable();
    console.log('taskNames: ' + this.taskName + ', ' + this.ATDForm.get('task').get('taskName').value);
    if (this.taskName !== this.ATDForm.get('task').get('taskName').value) {
      this.tasksService.changeTaskName([this.taskName, this.taskName = this.ATDForm.get('task').get('taskName').value]);
    }
  }

}
