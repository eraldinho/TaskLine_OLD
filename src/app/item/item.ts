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
    task: {taskName, taskType, taskCreationDate, taskDueDate, taskOperator};
  }
