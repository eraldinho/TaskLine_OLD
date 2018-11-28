import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {
    this.TFForm = fb.group({
      find: this.findCtrl,
      type: this.typeCtrl,
      status: this.statusCtrl,
      date: this.dateCtrl,
      oUser: this.oUserCtrl,
      dUSer: this.dUserCtrl
    });
   }

  ngOnInit() {
  }

}
