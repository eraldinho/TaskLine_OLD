import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintTaskFormComponent } from './print-task-form.component';

describe('PrintTaskFormComponent', () => {
  let component: PrintTaskFormComponent;
  let fixture: ComponentFixture<PrintTaskFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintTaskFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintTaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
