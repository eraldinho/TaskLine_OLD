import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { ScrudService } from '../../services/scrud/scrud.service';
import {MatSnackBar} from '@angular/material';
import * as moment from 'moment';

import { AssemblyFormService } from '../../services/forms/assemblyformservice/assembly-form.service';
import { CustomerFormService } from '../../services/forms/customerformservice/customer-form.service';
import { DeliveryFormService } from '../../services/forms/deliveryformservice/delivery-form.service';
import { DeviceFormService } from '../../services/forms/deviceformservice/device-form.service';
import { FailureFormService } from '../../services/forms/failureformservice/failure-form.service';
import { ProgressFormService } from '../../services/forms/progressformservice/progress-form.service';
import { TaskFormService } from '../../services/forms/taskformservice/task-form.service';


@Component({
  selector: 'app-quick-task-form',
  templateUrl: './quick-task-form.component.html',
  styleUrls: ['./quick-task-form.component.scss'],
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
export class QuickTaskFormComponent implements OnInit {
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

  ATDForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private scrudService: ScrudService,
    public snackBar: MatSnackBar,
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

  register() {
    console.log(this.ATDForm.value);
  }

  AddTask(type: string, delai: number, complementNom: string= '') {
    if (this.ATDForm.value.task.taskName) {
      const today = moment().startOf('day').add(delai, 'day').unix() * 1000;
      this.ATDForm.value.task.taskName = complementNom + this.ATDForm.value.task.taskName;
      this.ATDForm.value.task.taskType = type;
      this.ATDForm.value.task.taskDueDate = today;
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
