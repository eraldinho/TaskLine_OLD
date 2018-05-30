import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-task-form',
  templateUrl: './new-task-form.component.html',
  styleUrls: ['./new-task-form.component.scss']
})
export class NewTaskFormComponent implements OnInit {
  p1Form: FormGroup;

  constructor(fb: FormBuilder) {
    this.p1Form = fb.group({
      taskName: fb.control(''),
      addSix: fb.control('')
    });
   }

  register() {
    console.log(this.p1Form.value);
  }

  ngOnInit() {
  }

}
