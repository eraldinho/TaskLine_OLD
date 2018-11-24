import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskNotDoneDialogComponent } from './task-not-done-dialog.component';

describe('TaskNotDoneDialogComponent', () => {
  let component: TaskNotDoneDialogComponent;
  let fixture: ComponentFixture<TaskNotDoneDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskNotDoneDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskNotDoneDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
