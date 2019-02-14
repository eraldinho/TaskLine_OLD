import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FailureFormComponent } from './failure-form.component';

describe('FailureFormComponent', () => {
  let component: FailureFormComponent;
  let fixture: ComponentFixture<FailureFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FailureFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FailureFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
