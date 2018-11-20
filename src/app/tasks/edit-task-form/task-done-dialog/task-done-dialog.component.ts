import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {EditTaskFormComponent} from '../edit-task-form.component';

@Component({
  selector: 'app-task-done-dialog',
  templateUrl: './task-done-dialog.component.html',
  styleUrls: ['./task-done-dialog.component.scss']
})
export class TaskDoneDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<EditTaskFormComponent>) {}

  ngOnInit() {
  }

  valider() {
    this.dialogRef.close(1);
  }

  annuler(): void {
    this.dialogRef.close(0);
  }

}
