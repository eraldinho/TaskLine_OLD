import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-datastobesaved-form',
  templateUrl: './datastobesaved-form.component.html',
  styleUrls: ['./datastobesaved-form.component.scss']
})
export class DatastobesavedFormComponent implements OnInit {
  @Input() datastobesavedGroup: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
