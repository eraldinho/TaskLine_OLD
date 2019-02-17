import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TaskFormService {
  public taskGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.taskGroup = fb.group({
      taskName: [null, Validators.required],
      taskType: [null, Validators.required],
      taskCreationDate: [null, Validators.required],
      taskDueDate: [null, Validators.required],
      taskOperator: [null, Validators.required]
  });
   }
}
