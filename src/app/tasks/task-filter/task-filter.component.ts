import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { TasksService } from '../../services/tasks/tasks.service';

@Component({
  selector: 'app-task-filter',
  templateUrl: './task-filter.component.html',
  styleUrls: ['./task-filter.component.scss']
})
export class TaskFilterComponent implements OnInit {
  TFForm: FormGroup;
  findCtrl: FormControl;
  typeCtrl: FormControl;
  statusCtrl: FormControl;
  dateCtrl: FormControl;
  oUserCtrl: FormControl;
  dUserCtrl: FormControl;
  wFCAnswerCtrl: FormControl;

  constructor(private fb: FormBuilder, private tasksService: TasksService) {
    this.TFForm = fb.group({
      find: this.findCtrl,
      type: this.typeCtrl,
      status: this.statusCtrl,
      date: this.dateCtrl,
      oUser: this.oUserCtrl,
      dUser: this.dUserCtrl,
      wFCAnswer: this.wFCAnswerCtrl
    });
   }

  ngOnInit() {
  }

  filter(filter: string, value: string) {
    console.log(filter + '-----' + value);
    this.tasksService.filterTask(filter, value);
  }

}
