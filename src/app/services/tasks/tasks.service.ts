import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { ScrudService } from '../../services/scrud/scrud.service';
import { MatSnackBar } from '@angular/material';
import * as moment from 'moment';

@Injectable(
  { providedIn: 'root' }
)
export class TasksService {

  constructor(private scrudService: ScrudService,
              private snackBar: MatSnackBar) { }
  // Observable string sources
  private tasksEdited = new Subject<string[]>();
  private tasksPrinted = new Subject<string>();
  private taskNameChanged = new Subject<string[]>();
  private taskTabClosed = new Subject<string>();
  private taskFiltered = new Subject<string[]>();

  // Observable string streams
  tasksEdited$ = this.tasksEdited.asObservable();
  tasksPrinted$ = this.tasksPrinted.asObservable();
  taskNameChanged$ = this.taskNameChanged.asObservable();
  taskTabClosed$ = this.taskTabClosed.asObservable();
  taskFiltered$ = this.taskFiltered.asObservable();

  // Service message commands
  // task = [taskId, taskName, taskType]
  editTask(task: string[]) {
    this.tasksEdited.next(task);
  }

  printTask(task: string) {
    console.log('printTask');
    this.tasksPrinted.next(task);
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

  // Delivery
  initDelivery(moncode: string, monnom: string, monprix: string, fb: FormBuilder) {
    console.log(monnom + ' ' + monprix + ' ' + moncode);
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

  addDelivery(form: FormGroup, fb: FormBuilder) {
    console.log(form.get('delivery').get('deliveryAdd').value);
    // add Prestation to the list
    if (form.get('delivery').get('deliveryAdd').value) {
      const value = form.get('delivery').get('deliveryAdd').value.split('   /   ');
      if (value.length === 3) {
        console.log(value);
        const control = <FormArray>form.get('delivery').get('deliveryArray');
        console.log(form.get('delivery').get('deliveryArray'));
        control.push(this.initDelivery(value[0], value[1], value[2], fb));
        form.get('delivery').get('deliveryAdd').setValue('');
      }
    }
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

  // Hardware
  initHardware(myHardware , fb: FormBuilder) {
    // initialize our Hardware
    return fb.group({
        hardware: [myHardware]
    });
  }

  addEmptyHardware(form: FormGroup, fb: FormBuilder) {
    // add  empty Hardware to the list
    const control = <FormArray>form.get('hardware').get('hardwareArray');
    control.push(this.initHardware('', fb));
    form.get('hardware').get('hardwareArray').disable();
  }

  addHardware(form: FormGroup, fb: FormBuilder) {
    if (form.get('hardware').get('hardwareAdd').enabled) {
      if (form.get('hardware').get('hardwareAdd').value) {
          const control = <FormArray>form.get('hardware').get('hardwareArray');
          control.push(this.initHardware(form.get('hardware').get('hardwareAdd').value, fb));
          form.get('hardware').get('hardwareAdd').setValue('');
          form.get('hardware').get('hardwareArray').disable();
      }
    }
    console.log(form.get('hardware').get('hardwareAdd').value);
    // add Prestation to the list
    if (form.get('hardware').get('hardwareAdd').value) {
      const control = <FormArray>form.get('hardware').get('hardwareArray');
      control.push(form.get('hardware').get('hardwareAdd').value);
      form.get('hardware').get('hardwareAdd').setValue('');
      const value = form.get('hardware').get('hardwareAdd').value.split('   /   ');
    }
  }

  removeHardware(i: number, form: FormGroup) {
    // remove address from the list
    const control = <FormArray>form.get('hardware').get('hardwareArray');
    control.removeAt(i);
  }

  cleanHardware(form: FormGroup) {
    // remove address from the list
    const control = <FormArray>form.get('hardware').get('hardwareArray');
    for (let i = 0; i < control.length; i++) {
      control.removeAt(i);
    }
  }

  enableHardware(form: FormGroup) {
    const control = <FormArray>form.get('hardware').get('hardwareArray');
    for (let i = 0; i < control.length; i++) {
      const hardware = control.get([i]);
      hardware.enable();
    }
  }

  disableHardware(form: FormGroup) {
    const control = <FormArray>form.get('hardware').get('hardwareArray');
    for (let i = 0; i < control.length; i++) {
      const hardware = control.get([i]);
      hardware.disable();
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

  LocationSet(form: FormGroup, location: string, docRef?: string): Promise<string> {
    const that = this;
    return new Promise<string>(function (resolve, reject) {
      console.log('LocationSet' + location + '---' + docRef);
      form.get('task').get('location').setValue(location);
      form.disable();
      that.disableDelivery(form);
      form.get('task').get('taskType').disable();
      form.get('delivery').get('deliveryAdd').setValue('');
      form.enable();
      form.get('delivery').get('deliveryArray').enable();
      form.get('task').get('taskDueDate').setValue(Date.parse(form.value.task.taskDueDate));
      if (docRef) {
        that.scrudService.SetDocument('tasks', docRef, form.value)
        .then((result) => {
          let action: string;
          result === 1 ?  (action = 'Succès', that.scrudService.UpdateDocument('locations', location, {task: docRef})) : action = 'Echec';
          that.snackBar.open('Modification Tâche', action, {
            duration: 500,
          });
          resolve(docRef);
        });
      } else {
        that.scrudService.AddDoc2Collection('tasks', form.value)
        .then((result) => {
          console.log('aa : ' + result.id);
          form.get('delivery').get('deliveryArray').disable();
          let action: string;
          result !== 0 ? (docRef = result.id, that.scrudService.UpdateDocument('locations', location, {task: result.id}), action = 'Succès')
          : action = 'Echec';
          that.snackBar.open('Ajout Tâche', action, {
            duration: 3000,
          });
          that.scrudService.UpdateDocument('locations', location, {task: docRef});
          const mydate = new Date(form.get('task').get('taskDueDate').value);
          form.get('task').get('taskDueDate').setValue(mydate);
          console.log('LocationSet docRef :' + docRef);
          resolve(docRef);
        });
      }
    });
  }

  // fonction qui vérifie que les emplacement utilisés sont bien liés à une tache
  // si ce n'est pas le cas l'emplacement est libéré
  locationsControl() {
    const myLocations = this.scrudService.RetrieveCollectionWhere('locations', 'used', '==', true)
    .subscribe((locationsList) => {
      for (const location of locationsList) {
        if (!location.task || location.task === '') {
          this.scrudService.UpdateDocument('locations', location.name, {used: false});
        }
      }
    });
  }

}
