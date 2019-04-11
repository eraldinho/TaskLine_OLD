import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-additionalinformations-form',
  templateUrl: './additionalinformations-form.component.html',
  styleUrls: ['./additionalinformations-form.component.scss']
})
export class AdditionalinformationsFormComponent implements OnInit {
  @Input() additionalinformationsGroup: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
