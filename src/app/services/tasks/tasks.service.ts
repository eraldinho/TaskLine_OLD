import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor() { }
  // Observable string sources
  private tasksEdited = new Subject<string[]>();

  // Observable string streams
  tasksEdited$ = this.tasksEdited.asObservable();

  // Service message commands
  editTask(task: string[]) {
    this.tasksEdited.next(task);
  }

}
