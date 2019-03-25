import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomerrequestFormService {
  public customerrequestGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.customerrequestGroup = this.fb.group({
      customerrequest: [null, Validators.required]
    });
   }
}
