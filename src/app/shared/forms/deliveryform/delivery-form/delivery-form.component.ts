import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { Delivery } from 'src/app/shared/interfaces/delivery/delivery';

@Component({
  selector: 'app-delivery-form',
  templateUrl: './delivery-form.component.html',
  styleUrls: ['./delivery-form.component.scss']
})
export class DeliveryFormComponent implements OnInit {
@Input() deliveryGroup: FormGroup;
@Input() filteredDelivery: Observable<Delivery[]>;

@Output() deliveryAdded = new EventEmitter();
@Output() deliveryRemoved = new EventEmitter<number>();

get formArray() { return <FormArray>this.deliveryGroup.get('deliveryArray'); }

  constructor() { }

  ngOnInit() {
  }

  onAddDelivery() {
    this.deliveryAdded.emit();
  }

  onRemoveDelivery(i: number) {
    this.deliveryRemoved.emit(i);
  }

}
