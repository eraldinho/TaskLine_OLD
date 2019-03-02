import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  @Input() taskGroup: FormGroup;
  @Input() Types: string[];
  @Input() LocationsAvailable: object[];
  @Output() lockForm = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
    console.log('app-task-form');
    console.log(this.Types);
    console.log(this.LocationsAvailable);
  }

  lock() {
    console.log('lock');
    this.lockForm.emit(true);
  }

  unlock() {
    console.log('unlock');
    this.lockForm.emit(false);
  }

}
