import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DeliveryFormService {
  public deliveryGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.deliveryGroup = this.fb.group({
      deliveryArray: this.fb.array([]),
      deliveryAdd: [null, Validators.required]
    });
  }
}
