import { Component, OnInit } from '@angular/core';
import { ScrudService } from '../../services/scrud/scrud.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  constructor(private scrudService: ScrudService) { }

  Tasks;
  tasks;

  ngOnInit() {
    this.Tasks = this.scrudService.RetrieveCollectionWithID('tasks');
    // this.tasks = this.myTasks.subscribe();
    // console.log(this.tasks);
  }

}
