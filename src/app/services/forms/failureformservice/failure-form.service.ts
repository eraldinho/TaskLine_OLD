import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FailureFormService {
  public failureGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.failureGroup = fb.group({
      failureDescription: [null, Validators.required]
    });
   }
}
