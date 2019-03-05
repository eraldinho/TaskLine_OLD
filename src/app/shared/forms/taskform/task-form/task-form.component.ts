import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ScrudService } from '../../../../services/scrud/scrud.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  @Input() taskGroup: FormGroup;
  @Input() Types: string[];
  @Input() LocationsAvailable: object[];

  constructor(private scrudService: ScrudService) { }

  ngOnInit() {
    console.log('app-task-form');
    console.log(this.Types);
    console.log(this.LocationsAvailable);
  }

  onLocationUsed() {
    console.log('onLocationUsed');
    console.log(this.taskGroup.get('location').value);
    console.log(this.taskGroup.get('locationAdd').value);
    this.scrudService.UpdateDocument('locations', this.taskGroup.get('location').value, {used: false})
    .then(val => {
      this.taskGroup.get('location').setValue(this.taskGroup.get('locationAdd').value);
      this.scrudService.UpdateDocument('locations', this.taskGroup.get('locationAdd').value, {used: true});
    })
    .catch(err => console.log(err));
  }

}
