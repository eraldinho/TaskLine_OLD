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

  PTForm: FormGroup;

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
      this.PTForm = fb.group({
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
    console.log(this.PTForm.value);
  }

  AddTask(type: string, delai: number, complementNom: string= '') {
    if (this.PTForm.value.task.taskName) {
      const today = moment().startOf('day').add(delai, 'day').unix() * 1000;
      this.PTForm.value.task.taskName = complementNom + this.PTForm.value.task.taskName;
      this.PTForm.value.task.taskType = type;
      this.PTForm.value.task.taskDueDate = today;
      this.scrudService.AddDoc2Collection('tasks', this.PTForm.value)
      .then((result) => {
        let action: string;
        result === 1 ?  (this.PTForm.reset() , action = 'Succès') : action = 'Echec';
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
