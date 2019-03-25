import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatastobesavedFormComponent } from './datastobesaved-form.component';

describe('DatastobesavedFormComponent', () => {
  let component: DatastobesavedFormComponent;
  let fixture: ComponentFixture<DatastobesavedFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatastobesavedFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatastobesavedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
