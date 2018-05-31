import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-new-task-form',
  templateUrl: './new-task-form.component.html',
  styleUrls: ['./new-task-form.component.scss']
})
export class NewTaskFormComponent implements OnInit {
  p1Form: FormGroup;
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

  constructor(fb: FormBuilder) {
    this.p1Form = fb.group({
      taskName: fb.control(''),
      addSix: fb.control('')
    });
   }

  register() {
    console.log(this.p1Form.value);
  }

  ngOnInit() {
  }

}
