import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdditionalinformationsFormService {
  public additionalinformationsGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.additionalinformationsGroup = fb.group({
      additionalInformations: [null, Validators.required]
    });
   }
}
