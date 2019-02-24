import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-progress-form',
  templateUrl: './progress-form.component.html',
  styleUrls: ['./progress-form.component.scss']
})
export class ProgressFormComponent implements OnInit {
  @Input() progressGroup: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
