import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ScrudService } from '../../services/scrud/scrud.service';
import { TasksService } from '../../services/tasks/tasks.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  constructor(private scrudService: ScrudService, private tasksService: TasksService) { }

  Tasks;

  ngOnInit() {
    this.Tasks = this.scrudService.RetrieveCollectionWithID('tasks');
  }

  delay(taskId) {
    console.log(taskId);
  }

  edit(taskId, taskName, taskType) {
    const task = [taskId, taskName, taskType];
    this.tasksService.editTask(task);
  }

  done(taskId) {
    console.log(taskId);
  }

}
