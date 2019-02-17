import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-failure-form',
  templateUrl: './failure-form.component.html',
  styleUrls: ['./failure-form.component.scss']
})
export class FailureFormComponent implements OnInit {
  @Input() failureGroup: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
