import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DatastobesavedFormService {
  public datastobesavedGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.datastobesavedGroup = this.fb.group({
      datastobesaved: [null, Validators.required]
    });
   }
}
