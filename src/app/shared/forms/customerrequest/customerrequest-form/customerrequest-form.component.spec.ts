import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerrequestFormComponent } from './customerrequest-form.component';

describe('CustomerrequestFormComponent', () => {
  let component: CustomerrequestFormComponent;
  let fixture: ComponentFixture<CustomerrequestFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerrequestFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerrequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
