import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor() { }
  // Observable string sources
  private tasksEdited = new Subject<string[]>();
  private taskNameChanged = new Subject<string[]>();
  private taskTabClosed = new Subject<string>();
  private taskFiltered = new Subject<string[]>();

  // Observable string streams
  tasksEdited$ = this.tasksEdited.asObservable();
  taskNameChanged$ = this.taskNameChanged.asObservable();
  taskTabClosed$ = this.taskTabClosed.asObservable();
  taskFiltered$ = this.taskFiltered.asObservable();

  // Service message commands
  // task = [taskId, taskName, taskType]
  editTask(task: string[]) {
    this.tasksEdited.next(task);
  }

  changeTaskName(taskNames: string[]) {
    this.taskNameChanged.next(taskNames);
  }

  closeTaskTab(taskID: string) {
    this.taskTabClosed.next(taskID);
  }

  filterTask(filter: string, value: string) {
    this.taskFiltered.next([filter, value]);
  }

  initDelivery(monnom: string, monprix: string, moncode: string, fb: FormBuilder) {
    // initialize our Prestation
    return fb.group({
        nom: [monnom],
        prix: [monprix],
        code: [moncode]
    });
  }

  addEmptyDelivery(form: FormGroup, fb: FormBuilder) {
    // add  empty Prestation to the list
    const control = <FormArray>form.get('delivery').get('deliveryArray');
    control.push(this.initDelivery('', '', '', fb));
    form.get('delivery').get('deliveryAdd').setValue('');
    form.get('delivery').get('deliveryArray').disable();
  }

  removeDelivery(i: number, form: FormGroup) {
    // remove address from the list
    const control = <FormArray>form.get('delivery').get('deliveryArray');
    control.removeAt(i);
  }

  cleanDelivery(form: FormGroup) {
    // remove address from the list
    const control = <FormArray>form.get('delivery').get('deliveryArray');
    for (let i = 0; i < control.length; i++) {
      control.removeAt(i);
    }
  }

  enableDelivery(form: FormGroup) {
    const control = <FormArray>form.get('delivery').get('deliveryArray');
    for (let i = 0; i < control.length; i++) {
      const prestation = control.get([i]);
      prestation.enable();
    }
  }

  disableDelivery(form: FormGroup) {
    const control = <FormArray>form.get('delivery').get('deliveryArray');
    for (let i = 0; i < control.length; i++) {
      const prestation = control.get([i]);
      prestation.disable();
    }
  }

  filter(value: string, myDelivery) {
    if (value) {
      const filterValue = value.toLowerCase();
      if (filterValue !== '') {
        return myDelivery.filter(option => option.nom.toLowerCase().includes(filterValue)
        || option.code_CEBO.toLowerCase().includes(filterValue));
      }
    } else {
      return;
    }
  }

}
