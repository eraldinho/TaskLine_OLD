import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { TaskListComponent } from '../task-list.component';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-delay-dialog',
  templateUrl: './delay-dialog.component.html',
  styleUrls: ['./delay-dialog.component.scss']
})
export class DelayDialogComponent implements OnInit {
  taskId: string;
  taskName: string;
  taskDueDate: number;

  DForm: FormGroup;
  newDueDateCtrl: FormControl;
  commentCtrl: FormControl;


  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskListComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.taskId = data.taskID;
      this.taskName = data.taskname;
      this.taskDueDate = data.taskduedate;
      this.DForm = fb.group({
        newDueDate: this.newDueDateCtrl,
        comment: this.commentCtrl,
      });
    }

  ngOnInit() {
  }

  valider() {
    this.dialogRef.close(this.DForm.value);
}

  annuler(): void {
    this.dialogRef.close();
  }

}
