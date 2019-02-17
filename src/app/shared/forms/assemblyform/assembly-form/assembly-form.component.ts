import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-assembly-form',
  templateUrl: './assembly-form.component.html',
  styleUrls: ['./assembly-form.component.scss']
})
export class AssemblyFormComponent implements OnInit {
  @Input() assemblyGroup: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
