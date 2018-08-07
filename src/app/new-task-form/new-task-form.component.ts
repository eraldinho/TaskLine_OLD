import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ScrudService } from '../services/scrud/scrud.service';

@Component({
  selector: 'app-new-task-form',
  templateUrl: './new-task-form.component.html',
  styleUrls: ['./new-task-form.component.scss']
})
export class NewTaskFormComponent implements OnInit {
  p1Form: FormGroup;
  taskGroup: FormGroup;
  taskNameCtrl: FormControl;
  taskCreationDateCtrl: FormControl;
  taskDueDateCtrl: FormControl;
  taskOperatorCtrl: FormControl;
  taskTypeCtrl: FormControl;
  taskPecCtrl: FormControl;
  taskAddHalfDayCtrl: FormControl;
  taskAddOneDayCtrl: FormControl;
  taskAddTwoDayCtrl: FormControl;
  taskAddOneWeekCtrl: FormControl;

  constructor(fb: FormBuilder, private scrudService: ScrudService) {
    this.taskNameCtrl = fb.control('');
    this.nomClientCtrl = fb.control('');
    this.client = fb.group({
      nomClient: this.nomClientCtrl,
      numClient: this.numClientCtrl,
      telClient: this.telClientCtrl,
      mailClient: this.mailClientCtrl,
    });
    this.newTaskForm = fb.group({
        taskName: this.taskNameCtrl,
    });
   }

  reset() {
    this.taskNameCtrl.setValue('');
  }

  register() {
    console.log(this.newTaskForm.value);
  }

  ngOnInit() {
  }

}
