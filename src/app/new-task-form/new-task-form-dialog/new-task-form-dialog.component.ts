import { Component, OnInit } from '@angular/core';
import { ScrudService } from '../../services/scrud/scrud.service';

@Component({
  selector: 'app-new-task-form-dialog',
  templateUrl: './new-task-form-dialog.component.html',
  styleUrls: ['./new-task-form-dialog.component.scss']
})
export class NewTaskFormDialogComponent implements OnInit {

  constructor(private scrudService: ScrudService) { }
  taskTypes;
  Types;

  ngOnInit() {
    this.taskTypes = this.scrudService.RetrieveDocument('config/task');
    this.taskTypes.subscribe(val => this.Types = val.types);
  }

}
