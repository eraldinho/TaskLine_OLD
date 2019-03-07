import { Component, OnInit, Input } from '@angular/core';

import { AssemblyFormService } from '../../../services/forms/assemblyformservice/assembly-form.service';
import { CustomerFormService } from '../../../services/forms/customerformservice/customer-form.service';
import { DeliveryFormService } from '../../../services/forms/deliveryformservice/delivery-form.service';
import { DeviceFormService } from '../../../services/forms/deviceformservice/device-form.service';
import { FailureFormService } from '../../../services/forms/failureformservice/failure-form.service';
import { ProgressFormService } from '../../../services/forms/progressformservice/progress-form.service';
import { TaskFormService } from '../../../services/forms/taskformservice/task-form.service';
import { CustomerhardwareFormService } from '../../../services/forms/customerhardwareformservice/customerhardware-form.service';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ScrudService } from 'src/app/services/scrud/scrud.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { TasksService } from 'src/app/services/tasks/tasks.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-print-task-form',
  templateUrl: './print-task-form.component.html',
  styleUrls: ['./print-task-form.component.scss'],
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
export class PrintTaskFormComponent implements OnInit {
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

  ATDForm: FormGroup;
  mytask: Observable<any>;
  taskName: string;
  formval;

  constructor(private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private router: Router,
    private assemblyFormService: AssemblyFormService,
    private customerFormService: CustomerFormService,
    private deliveryFormService: DeliveryFormService,
    private deviceFormService: DeviceFormService,
    private failureFormService: FailureFormService,
    private progressFormService: ProgressFormService,
    private taskFormService: TaskFormService,
    private customerhardwareFormService: CustomerhardwareFormService,
    private tasksService: TasksService,
    private scrudService: ScrudService) {
      this.ATDForm = fb.group({
        task: this.taskGroup,
        customer: this.customerGroup,
        device: this.deviceGroup,
        failure: this.failureGroup,
        delivery: this.deliveryGroup,
        progress: this.progressGroup,
        assembly: this.assemblyGroup,
        hardware: this.hardwareGroup
      });
  }

  ngOnInit() {
    this.tasksService.tasksPrinted$.subscribe(task => {
      console.log('print : ' + task);
      const control = <FormArray>this.ATDForm.get('delivery').get('deliveryArray');
      const control3 = <FormArray>this.ATDForm.get('hardware').get('hardwareArray');
      this.tasksService.cleanDelivery(this.ATDForm);
      this.ATDForm.disable();
      this.mytask = this.scrudService.RetrieveDocument('tasks/' + task);
      this.mytask.subscribe(val => {
        console.log(val);
        this.formval = val;
        console.log(this.formval);

        if (val.delivery.deliveryArray) {
          if (val.delivery.deliveryArray.length > 0 && val.delivery.deliveryArray.length > control.length) {
            for (let i = 0; i < val.delivery.deliveryArray.length; i++ ) {
              console.log(i);
              this.tasksService.addEmptyDelivery(this.ATDForm, this.fb);
            }
          }
        }
        if (val.hardware.hardwareArray) {
          if (val.hardware.hardwareArray.length > 0 && val.hardware.hardwareArray.length > control3.length) {
            for (let i = 0; i < val.hardware.hardwareArray.length; i++ ) {
              console.log(i);
              this.tasksService.addEmptyHardware(this.ATDForm, this.fb);
            }
          }
        }
        this.ATDForm.setValue(val);
        console.log(this.ATDForm.value);
        console.log('suite');
        console.log(val);
        const mydate = new Date(this.ATDForm.get('task').get('taskDueDate').value);
        this.ATDForm.get('task').get('taskDueDate').setValue(mydate);
        this.taskName = this.ATDForm.get('task').get('taskName').value;
      });
    });
  }

  navBack() {
    this.router.navigateByUrl('/tasks(toolbar:navbar)');
  }
  setFormValue() {
    console.log(this.taskName);
  }

}
