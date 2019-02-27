import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  @Input() taskGroup: FormGroup;
  @Output() lockForm = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
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
