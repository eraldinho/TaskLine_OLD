import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ScrudService } from '../../services/scrud/scrud.service';
import { TasksService } from '../../services/tasks/tasks.service';
import {MatDialog, MatDialogRef, MatDialogConfig} from '@angular/material';
import { DelayDialogComponent } from './delay-dialog/delay-dialog.component';
import { database } from 'firebase';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  constructor(private scrudService: ScrudService, private tasksService: TasksService, private dialog: MatDialog) { }

  Tasks;

  ngOnInit() {
    this.Tasks = this.scrudService.RetrieveCollectionWithID('tasks');
  }

  delayDialog(taskId, taskName, taskDueDate, taskCreationDate, taskOperator, taskType): void {
    console.log(taskId);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = '100%';
    dialogConfig.data = {
      taskID: taskId,
      taskname: taskName,
      taskduedate: taskDueDate,
    };
    const dialogRef = this.dialog.open(DelayDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result.newDueDate);
      this.scrudService.UpdateDocument('tasks', taskId, {task: {taskCreationDate: taskCreationDate,
        taskDueDate: Date.parse(result.newDueDate),
        taskName: taskName,
        taskOperator: taskOperator,
        taskType: taskType}})
      .then(val => console.log('updated!'));
    });
  }

  edit(taskId, taskName, taskType) {
    const task = [taskId, taskName, taskType];
    this.tasksService.editTask(task);
  }

  done(taskId) {
    console.log(taskId);
  }

}
