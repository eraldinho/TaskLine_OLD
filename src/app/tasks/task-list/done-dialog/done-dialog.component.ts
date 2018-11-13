import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { TaskListComponent } from '../task-list.component';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-done-dialog',
  templateUrl: './done-dialog.component.html',
  styleUrls: ['./done-dialog.component.scss']
})
export class DoneDialogComponent implements OnInit {
  taskId: string;
  taskName: string;
  taskType: string;

  DoneForm: FormGroup;
  commentCtrl: FormControl;


  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskListComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.taskId = data.taskID;
      this.taskName = data.taskname;
      this.taskType = data.tasktype;
      this.DoneForm = fb.group({
        comment: this.commentCtrl,
      });
    }

  ngOnInit() {
  }

  valider() {
    this.dialogRef.close(this.DoneForm.value);
  }

  annuler(): void {
    this.dialogRef.close(0);
  }

}
