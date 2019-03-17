import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { ScrudService } from '../../services/scrud/scrud.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';
import * as moment from 'moment';

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
import { Delivery } from 'src/app/shared/interfaces/delivery/delivery';
import { TasksService } from 'src/app/services/tasks/tasks.service';
import { DatatosaveService } from 'src/app/services/datatosave/datatosave.service';

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
    TaskFormService,
    CustomerhardwareFormService,
    CustomerrequestFormService,
    DatastobesavedFormService,
    DatatosaveService
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
  get hardwareGroup(): FormGroup {
    return this.customerhardwareFormService.hardwareGroup;
  }
  get customerrequestGroup(): FormGroup {
    return this.customerrequestFormService.customerrequestGroup;
  }
  get datastobesavedGroup(): FormGroup {
    return this.datastobesavedFormService.datastobesavedGroup;
  }

  filteredOptions: Observable<Delivery[]>;
  Locations;
  LocationsAvailable;
  taskTypes;
  Types;
  Prestations;
  myPrestations;
  docRef;
  ATDForm: FormGroup;


  constructor(private fb: FormBuilder,
              private scrudService: ScrudService,
              public snackBar: MatSnackBar,
              public tasksService: TasksService,
              public datatosaveService: DatatosaveService,
              private assemblyFormService: AssemblyFormService,
              private customerFormService: CustomerFormService,
              private deliveryFormService: DeliveryFormService,
              private deviceFormService: DeviceFormService,
              private failureFormService: FailureFormService,
              private progressFormService: ProgressFormService,
              private taskFormService: TaskFormService,
              private customerhardwareFormService: CustomerhardwareFormService,
              private customerrequestFormService: CustomerrequestFormService,
              private datastobesavedFormService: DatastobesavedFormService) {
      this.ATDForm = fb.group({
        task: this.taskGroup,
        customer: this.customerGroup,
        device: this.deviceGroup,
        failure: this.failureGroup,
        delivery: this.deliveryGroup,
        progress: this.progressGroup,
        assembly: this.assemblyGroup,
        hardware: this.hardwareGroup,
        customerrequest: this.customerrequestGroup,
        datastobesaved: this.datastobesavedGroup
      });
  }

  ngOnInit() {
    this.tasksService.locationsControl();
    this.ATDForm.get('task').get('location').disable();
    this.Locations = this.scrudService.RetrieveCollection('locations');
    this.Locations.subscribe(val => this.LocationsAvailable = val.filter(aLocation => aLocation.used === false)
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
    this.ATDForm.get('task').get('taskDueDate').setValue(Date.parse(this.ATDForm.value.task.taskDueDate));
    this.ATDForm.get('task').get('status').setValue('afaire');
    // console.log(Date.parse(this.ATDForm.value.task.taskDueDate));
    if (this.docRef && this.docRef !== '') {
      this.scrudService.SetDocument('tasks', this.docRef, this.ATDForm.value)
      .then((result) => {
        let action: string;
        result === 1 ?  (this.ATDForm.reset() , action = 'Succès', this.docRef = '') : action = 'Echec';
        this.snackBar.open('Modification Tâche', action, {
          duration: 500,
        });
      });
    } else {
      this.scrudService.AddDoc2Collection('tasks', this.ATDForm.value)
      .then((result) => {
      this.ATDForm.get('delivery').get('deliveryArray').disable();
      let action: string;
      result !== 0 ? (this.ATDForm.reset() , action = 'Succès') : action = 'Echec';
      this.snackBar.open('Ajout Tâche', action, {
        duration: 3000,
      });
    });
    }
  }

  cancel() {
    this.ATDForm.reset();
    this.tasksService.cleanDelivery(this.ATDForm);
  }

  LocationSet(location) {
    console.log(this.ATDForm.get('task').get('taskDueDate').value);
    if (!this.ATDForm.get('task').get('status').value) {
      this.ATDForm.get('task').get('status').setValue('afaire');
    }
    this.tasksService.LocationSet(this.ATDForm, location, this.docRef).
    then(res => {
      this.docRef = res;
      console.log('fin : ' + this.docRef);
    });
  }

}
