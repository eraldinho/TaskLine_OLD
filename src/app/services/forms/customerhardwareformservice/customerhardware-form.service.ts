import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomerhardwareFormService {
  public hardwareGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.hardwareGroup = this.fb.group({
      hardwareArray: this.fb.array([]),
      hardwareAdd: [null, Validators.required]
    });
   }
}
