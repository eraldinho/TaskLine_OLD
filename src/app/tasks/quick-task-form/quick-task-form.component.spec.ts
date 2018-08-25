import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickTaskFormComponent } from './quick-task-form.component';

describe('QuickTaskFormComponent', () => {
  let component: QuickTaskFormComponent;
  let fixture: ComponentFixture<QuickTaskFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickTaskFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickTaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
