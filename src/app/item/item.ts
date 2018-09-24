export class Item {
    $key: string;
    title: string;
    body: string;
    active = true;
    isNotItem = false;
    beCool = false;
    beQuick = false;
    beHurry = false;
    sav = false;
    montage = false;
    relC = false;
    compta = false;
    task: {};

    constructor() {
      this.task =  {taskName: '', taskType: '', taskCreationDate: 0, taskDueDate: 0, taskOperator: ''};
    }
  }
