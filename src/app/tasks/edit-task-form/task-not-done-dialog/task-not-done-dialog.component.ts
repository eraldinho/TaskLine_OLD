import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {EditTaskFormComponent} from '../edit-task-form.component';

@Component({
  selector: 'app-task-not-done-dialog',
  templateUrl: './task-not-done-dialog.component.html',
  styleUrls: ['./task-not-done-dialog.component.scss']
})
export class TaskNotDoneDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<EditTaskFormComponent>) { }

  ngOnInit() {
  }

  fermer() {
    this.dialogRef.close();
  }

}
