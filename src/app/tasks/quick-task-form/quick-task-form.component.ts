import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ScrudService } from '../../services/scrud/scrud.service';
import {MatSnackBar} from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-quick-task-form',
  templateUrl: './quick-task-form.component.html',
  styleUrls: ['./quick-task-form.component.scss']
})
export class QuickTaskFormComponent implements OnInit {
  p1Form: FormGroup;
  taskGroup: FormGroup;
  taskNameCtrl: FormControl;
  taskCreationDateCtrl: FormControl;
  taskDueDateCtrl: FormControl;
  taskOperatorCtrl: FormControl;
  taskTypeCtrl: FormControl;

  constructor(fb: FormBuilder, private scrudService: ScrudService, public snackBar: MatSnackBar, private dialog: MatDialog) {
    this.taskNameCtrl = fb.control('');
    this.taskDueDateCtrl = fb.control('');
    this.taskGroup = fb.group({
        taskName: this.taskNameCtrl,
        taskDueDate: this.taskDueDateCtrl
    });
    this.p1Form = fb.group({
      task: this.taskGroup
    });
   }

  register() {
    console.log(this.p1Form.value);
  }

  AddTask(type: string, delai: number) {
    const today = Date.now();
    const SixDaysLater = today + 518400000;
    const data = {Type : type, Nom: type + ' ' + this.taskNameCtrl.value, Echeance: today + delai};
    this.scrudService.AddDoc2Collection('tasks', data)
    .then((result) => {
      let action: string;
      result === 1 ?  (this.taskNameCtrl.setValue('') , action = 'Succès') : action = 'Echec';
      this.snackBar.open('Ajout ' +  type, action, {
        duration: 3000,
      });
    });
  }

  OpenNewTaskDialog() {
    //this.NewTaskDialogRef = this.dialog.open(NewTaskFormDialogComponent, {width:window.innerWidth+'px'});
  }

  ngOnInit() {
  }

}
