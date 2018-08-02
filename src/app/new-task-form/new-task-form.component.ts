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
    this.taskDueDateCtrl= fb.control('');
    this.taskGroup = fb.group({
        taskName: this.taskNameCtrl,
        taskDueDate: this.taskDueDateCtrl
    });
    this.p1Form = fb.group({
      task:this.taskGroup
    });
   }

  register() {
    console.log(this.p1Form.value);
    this.scrudService.AddDoc2Collection('tasks',{nom: 'tache_test2'})
  }

  ngOnInit() {
  }

}
