import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProgressFormService {
  public progressGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.progressGroup = this.fb.group({
      progressArray: this.fb.array([]),
      progressAdd: [null, Validators.required]
    });
   }
}
