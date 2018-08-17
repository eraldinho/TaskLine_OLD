import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ScrudService } from '../../services/scrud/scrud.service';

@Component({
  selector: 'app-new-task-form-dialog',
  templateUrl: './new-task-form-dialog.component.html',
  styleUrls: ['./new-task-form-dialog.component.scss']
})
export class NewTaskFormDialogComponent implements OnInit {

  taskTypes;
  Types;
  ATDForm: FormGroup;
  // tache
  taskGroup: FormGroup;
  taskNameCtrl: FormControl;
  taskCreationDateCtrl: FormControl;
  taskDueDateCtrl: FormControl;
  taskOperatorCtrl: FormControl;
  taskTypeCtrl: FormControl;
  // client
  clientGroup: FormGroup;
  clientNameCtrl: FormControl;
  clientNumberCtrl: FormControl;
  clientMailCtrl: FormControl;
  clientPhoneCtrl: FormControl;
  // materiel
  deviceGroup: FormGroup;


  constructor(fb: FormBuilder,private scrudService: ScrudService) {
    this.taskGroup = fb.group({
        taskName: this.taskNameCtrl,
        taskType: this.taskTypeCtrl,
        taskCreationDate: this.taskCreationDateCtrl,
        taskDueDate: this.taskDueDateCtrl,
        taskOperator: this.taskOperatorCtrl
    });
    this.clientGroup = fb.group({
      clientName: this.clientNameCtrl,
      clientNumber: this.clientNumberCtrl,
      clientMail: this.clientMailCtrl,
      clientPhone: this.clientPhoneCtrl
  });
    this.ATDForm = fb.group({
      task: this.taskGroup,
      client: this.clientGroup
    });
  }

  ngOnInit() {
    this.taskTypes = this.scrudService.RetrieveDocument('config/task');
    this.taskTypes.subscribe(val => this.Types = val.types);
  }

}
