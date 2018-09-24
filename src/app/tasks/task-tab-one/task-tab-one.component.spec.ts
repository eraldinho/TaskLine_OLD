import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskTabOneComponent } from './task-tab-one.component';

describe('TaskTabOneComponent', () => {
  let component: TaskTabOneComponent;
  let fixture: ComponentFixture<TaskTabOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskTabOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskTabOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
