import { Component, OnInit } from '@angular/core';
import { ScrudService } from '../../services/scrud/scrud.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  constructor(private scrudService: ScrudService) { }

  myTasks;

  ngOnInit() {
    this.myTasks = this.scrudService.RetrieveCollection('tasks');
  }

}
