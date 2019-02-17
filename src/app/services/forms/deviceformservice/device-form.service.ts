import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DeviceFormService {
  public deviceGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.deviceGroup = fb.group({
      deviceType: [null, Validators.required],
      deviceBrand: [null, Validators.required],
      deviceStart: [null, Validators.required],
      deviceDisplay: [null, Validators.required],
      deviceOsStart: [null, Validators.required],
      deviceReset: [null, Validators.required],
      deviceDescription: [null, Validators.required]
    });
   }
}
