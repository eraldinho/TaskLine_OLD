import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-customerrequest-form',
  templateUrl: './customerrequest-form.component.html',
  styleUrls: ['./customerrequest-form.component.scss']
})
export class CustomerrequestFormComponent implements OnInit {
  @Input() customerrequestGroup: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
