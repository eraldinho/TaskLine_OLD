import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor() { }
  // Observable string sources
  private tasksEdited = new Subject<string[]>();
  private taskNameChanged = new Subject<string[]>();

  // Observable string streams
  tasksEdited$ = this.tasksEdited.asObservable();
  taskNameChanged$ = this.taskNameChanged.asObservable();

  // Service message commands
  // task = [taskId, taskName, taskType]
  editTask(task: string[]) {
    this.tasksEdited.next(task);
  }

  changeTaskName(taskNames: string[]) {
    this.taskNameChanged.next(taskNames);
  }

}
