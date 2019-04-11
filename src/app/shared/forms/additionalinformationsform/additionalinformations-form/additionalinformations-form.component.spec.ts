import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalinformationsFormComponent } from './additionalinformations-form.component';

describe('AdditionalinformationsFormComponent', () => {
  let component: AdditionalinformationsFormComponent;
  let fixture: ComponentFixture<AdditionalinformationsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditionalinformationsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalinformationsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
