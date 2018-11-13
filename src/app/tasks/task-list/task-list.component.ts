import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ScrudService } from '../../services/scrud/scrud.service';
import { TasksService } from '../../services/tasks/tasks.service';
import {MatDialog, MatDialogRef, MatDialogConfig, MatSnackBar} from '@angular/material';
import { DelayDialogComponent } from './delay-dialog/delay-dialog.component';
import { DoneDialogComponent} from './done-dialog/done-dialog.component';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  constructor(private scrudService: ScrudService,
              private tasksService: TasksService,
              private dialog: MatDialog,
              public snackBar: MatSnackBar) { }

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
      tasktype: taskType
    };
    const dialogRef = this.dialog.open(DelayDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result !== 0) {
        this.scrudService.UpdateDocument('tasks', taskId, {task: {taskCreationDate: taskCreationDate,
          taskDueDate: Date.parse(result.newDueDate),
          taskName: taskName,
          taskOperator: taskOperator,
          taskType: taskType}})
          .then(val => {
            let action: string;
            val === 1 ?  (action = 'Succès') : action = 'Echec';
            this.snackBar.open('Moodification échéance Tâche', action, {
            duration: 3000,
            });
          });
      }
    });
  }

  edit(taskId, taskName, taskType) {
    const task = [taskId, taskName, taskType];
    this.tasksService.editTask(task);
  }

  doneDialog(taskId, taskName, taskType) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = '100%';
    dialogConfig.data = {
      taskID: taskId,
      taskname: taskName,
      tasktype: taskType
    };
    const dialogRef = this.dialog.open(DoneDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result !== 0) {
        this.scrudService.UpdateDocument('tasks', taskId, {done: true})
        .then(val => {
          let action: string;
          val === 1 ?  (action = 'Succès') : action = 'Echec';
          this.snackBar.open('Validation Tâche', action, {
          duration: 3000,
          });
        });
      }
    });
  }

}
