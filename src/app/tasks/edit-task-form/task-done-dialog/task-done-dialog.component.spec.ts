import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDoneDialogComponent } from './task-done-dialog.component';

describe('TaskDoneDialogComponent', () => {
  let component: TaskDoneDialogComponent;
  let fixture: ComponentFixture<TaskDoneDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskDoneDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDoneDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
