import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-progress-form',
  templateUrl: './progress-form.component.html',
  styleUrls: ['./progress-form.component.scss']
})
export class ProgressFormComponent implements OnInit {
  @Input() progressGroup: FormGroup;

  @Output() progressAdded = new EventEmitter();
  @Output() progressRemoved = new EventEmitter<number>();

  get formArray() { return <FormArray>this.progressGroup.get('progressArray'); }

  constructor() { }

  ngOnInit() {
  }

  addProgress() {
    this.progressAdded.emit();
  }

}
