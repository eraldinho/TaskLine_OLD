import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerhardwareFormComponent } from './customerhardware-form.component';

describe('CustomerhardwareFormComponent', () => {
  let component: CustomerhardwareFormComponent;
  let fixture: ComponentFixture<CustomerhardwareFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerhardwareFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerhardwareFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
