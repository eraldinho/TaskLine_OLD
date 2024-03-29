import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { AssemblyFormService } from '../../../services/forms/assemblyformservice/assembly-form.service';
import { CustomerFormService } from '../../../services/forms/customerformservice/customer-form.service';
import { DeliveryFormService } from '../../../services/forms/deliveryformservice/delivery-form.service';
import { DeviceFormService } from '../../../services/forms/deviceformservice/device-form.service';
import { FailureFormService } from '../../../services/forms/failureformservice/failure-form.service';
import { ProgressFormService } from '../../../services/forms/progressformservice/progress-form.service';
import { TaskFormService } from '../../../services/forms/taskformservice/task-form.service';
import { CustomerhardwareFormService } from '../../../services/forms/customerhardwareformservice/customerhardware-form.service';
import { CustomerrequestFormService } from '../../../services/forms/customerrequestformservice/customerrequest-form.service';
import { DatastobesavedFormService } from '../../../services/forms/datastobesavedformservice/datastobesaved-form.service';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ScrudService } from 'src/app/services/scrud/scrud.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { TasksService } from 'src/app/services/tasks/tasks.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

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
    TaskFormService,
    CustomerhardwareFormService,
    CustomerrequestFormService,
    DatastobesavedFormService
 ]
})
export class PrintTaskFormComponent implements OnInit, OnDestroy {
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

  PTForm: FormGroup;
  private taskIdSub: Subscription;
  mytask;
  taskName;
  taskID;

  constructor(private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private router: Router,
    private route: ActivatedRoute,
    private assemblyFormService: AssemblyFormService,
    private customerFormService: CustomerFormService,
    private deliveryFormService: DeliveryFormService,
    private deviceFormService: DeviceFormService,
    private failureFormService: FailureFormService,
    private progressFormService: ProgressFormService,
    private taskFormService: TaskFormService,
    private customerhardwareFormService: CustomerhardwareFormService,
    private customerrequestFormService: CustomerrequestFormService,
    private datastobesavedFormService: DatastobesavedFormService,
    private tasksService: TasksService,
    private scrudService: ScrudService) {
      this.PTForm = fb.group({
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
    console.log('fackYa');
    const taskID: string = this.route.snapshot.queryParamMap.get('task');
    console.log(taskID);
    const control = <FormArray>this.PTForm.get('delivery').get('deliveryArray');
    const control3 = <FormArray>this.PTForm.get('hardware').get('hardwareArray');
    this.tasksService.cleanDelivery(this.PTForm);
    this.PTForm.disable();
    this.mytask = this.scrudService.RetrieveDocument('tasks/' + taskID);
    this.taskIdSub = this.mytask.subscribe(val => {
      console.log(val);
      if (val.delivery.deliveryArray) {
        if (val.delivery.deliveryArray.length > 0 && val.delivery.deliveryArray.length > control.length) {
          for (let i = 0; i < val.delivery.deliveryArray.length; i++ ) {
            this.tasksService.addEmptyDelivery(this.PTForm, this.fb);
          }
        }
      }
      if (val.hardware.hardwareArray) {
        if (val.hardware.hardwareArray.length > 0 && val.hardware.hardwareArray.length > control3.length) {
          for (let i = 0; i < val.hardware.hardwareArray.length; i++ ) {
            this.tasksService.addEmptyHardware(this.PTForm, this.fb);
          }
        }
      }
      val.progress.progressArray = [];
      console.log(val);
      console.log(this.PTForm.value);
      this.PTForm.setValue(val);
      console.log(this.PTForm.value);
      console.log('suite');
      console.log(val);
      const mydate = new Date(this.PTForm.get('task').get('taskDueDate').value);
      this.PTForm.get('task').get('taskDueDate').setValue(mydate);
      this.taskName = this.PTForm.get('task').get('taskName').value;
    });
  }

  ngOnDestroy(): void {
    this.taskIdSub.unsubscribe();
  }

  navBack() {
    console.log(this.taskID);
    this.router.navigateByUrl('/tasks(toolbar:navbar)');
  }

}
