import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { ScrudService } from '../../services/scrud/scrud.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';

import { AssemblyFormService } from '../../services/forms/assemblyformservice/assembly-form.service';
import { CustomerFormService } from '../../services/forms/customerformservice/customer-form.service';
import { DeliveryFormService } from '../../services/forms/deliveryformservice/delivery-form.service';
import { DeviceFormService } from '../../services/forms/deviceformservice/device-form.service';
import { FailureFormService } from '../../services/forms/failureformservice/failure-form.service';
import { ProgressFormService } from '../../services/forms/progressformservice/progress-form.service';
import { TaskFormService } from '../../services/forms/taskformservice/task-form.service';
import { Delivery } from 'src/app/shared/interfaces/delivery/delivery';
import { TasksService } from 'src/app/services/tasks/tasks.service';

@Component({
  selector: 'app-new-task-form',
  templateUrl: './new-task-form.component.html',
  styleUrls: ['./new-task-form.component.scss'],
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
export class NewTaskFormComponent implements OnInit {
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

  filteredOptions: Observable<Delivery[]>;
  Locations;
  LocationsAvailable;
  taskTypes;
  Types;
  Prestations;
  myPrestations;
  ATDForm: FormGroup;


  constructor(private fb: FormBuilder,
              private scrudService: ScrudService,
              public snackBar: MatSnackBar,
              private tasksService: TasksService,
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
    this.Locations = this.scrudService.RetrieveCollection('locations');
    this.Locations.subscribe(val => this.LocationsAvailable = val.filter(aLocation => aLocation.used === false));
    this.taskTypes = this.scrudService.RetrieveDocument('config/task');
    this.taskTypes.subscribe(val => this.Types = val.types);
    this.Prestations = this.scrudService.RetrieveCollection('prestations');
    this.Prestations.subscribe(val => this.myPrestations = val);
    this.filteredOptions = this.ATDForm.get('delivery').get('deliveryAdd').valueChanges.pipe(
      map(nom => this.tasksService.filter(nom, this.myPrestations))
    );
  }

  register() {
    this.ATDForm.get('delivery').get('deliveryAdd').setValue('');
    this.ATDForm.enable();
    this.ATDForm.get('delivery').get('deliveryArray').enable();
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
    this.tasksService.cleanDelivery(this.ATDForm);
  }

}
