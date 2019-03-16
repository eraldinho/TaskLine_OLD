import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TasksService } from 'src/app/services/tasks/tasks.service';

@Component({
  selector: 'app-assembly-form',
  templateUrl: './assembly-form.component.html',
  styleUrls: ['./assembly-form.component.scss']
})
export class AssemblyFormComponent implements OnInit {
  @Input() assemblyGroup: FormGroup;
  @Output() needLog = new EventEmitter<object>();

  constructor(tasksService: TasksService) { }

  ngOnInit() {
  }

  onAssembly(display: boolean, formctrl, myaction: string, valuectrl) {
    this.needLog.emit({needdisplay: display, wheretoLog: formctrl, whattoLog: myaction, value: valuectrl});
  }

}
