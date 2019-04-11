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
  @Output() LocationSet = new EventEmitter<string>();

  constructor(private scrudService: ScrudService) { }

  ngOnInit() {
  }

  // lorsqu'on selectionne un emplacement
  onLocationUsed() {
    console.log('onLocationUsed');
    console.log('location: ' + this.taskGroup.get('location').value);
    console.log('locationAdd :' + this.taskGroup.get('locationAdd').value);
    // on libère l'emplacement actuel (si il y en a un)
    this.scrudService.UpdateDocument('locations', this.taskGroup.get('location').value, {used: false, task: ''})
    .then(val => {
      this.taskGroup.get('location').setValue(this.taskGroup.get('locationAdd').value);
      this.LocationSet.emit(this.taskGroup.get('location').value);
    })
    .catch(err => console.log(err));
  }

}
