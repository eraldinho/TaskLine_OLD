import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-customerhardware-form',
  templateUrl: './customerhardware-form.component.html',
  styleUrls: ['./customerhardware-form.component.scss']
})
export class CustomerhardwareFormComponent implements OnInit {
  @Input() hardwareGroup: FormGroup;

  @Output() hardwareAdded = new EventEmitter();
  @Output() hardwareRemoved = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  addHardware() {
    console.log('addHardware');
    this.hardwareAdded.emit();
  }

  onRemoveHardware(i: number) {
    console.log('onRemoveHardware');
    this.hardwareRemoved.emit(i);
  }

}
