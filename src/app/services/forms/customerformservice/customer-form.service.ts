import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomerFormService {
  public customerGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.customerGroup = fb.group({
      customerName: [null, Validators.required],
      customerFirstName: [null, Validators.required],
      customerNumber: [null, Validators.required],
      customerMail: [null, Validators.required],
      customerPhone: [null, Validators.required],
    });
   }
}
