import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTaskFormDialogComponent } from './new-task-form-dialog.component';

describe('NewTaskFormDialogComponent', () => {
  let component: NewTaskFormDialogComponent;
  let fixture: ComponentFixture<NewTaskFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTaskFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTaskFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
