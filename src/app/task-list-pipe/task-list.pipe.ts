import { Pipe, PipeTransform } from '@angular/core';
import {Item} from '../item/item';
@Pipe({
  name: 'taskList'
})
export class TaskListPipe implements PipeTransform {

  transform(items: Array<any>): Array<any> {
    let myitems: Array<any>;
    const myitemsComplete: Array<any> = [];
    const today = this.setMidnight(new Date().getTime());
    let previousTime: number;
    let nextTime: number;
    if (items && items.length > 0) {// si il y a des données à traiter
      myitems = items.sort(this.comparator); // on classe du plus récent au plus ancien
      // 1er intercalaire à la date de la tache avec l'echeance la plus proche et on fixe l'heure à minuit
      previousTime = this.setMidnight(myitems[0].task.taskDueDate);
      let myitem: Item = new Item;
      myitem.taskDueDate = previousTime;
      myitem.title = new Date(previousTime).toDateString();
      myitem.isNotItem = true;
      myitem.delay = (-today + previousTime) / 24 / 60 / 60 / 1000;
      myitemsComplete.push(myitem);
      nextTime = previousTime + 86400000; // intercalaire suivant = intercalaire + 24h
      for (let i = 0; i < myitems.length; i++) {
        if (myitems[i].task.taskDueDate >= nextTime) {// si l'echeance est supérieure à la date du prochain jour intercalaire
          myitem = new Item;
          myitem.taskDueDate = nextTime;
          myitem.title = new Date(nextTime).toDateString();
          myitem.isNotItem = true; // on créé un nouvel intercalaire à la date du lendemain
          myitem.delay = (-today + nextTime) / 24 / 60 / 60 / 1000;
          myitemsComplete.push(myitem);
          nextTime = nextTime + 86400000;
          while (myitems[i].task.taskDueDate >= nextTime) {
            myitem = new Item;
            myitem.taskDueDate = nextTime;
            myitem.title = new Date(nextTime).toDateString();
            myitem.isNotItem = true;
            myitem.delay = (-today + nextTime) / 24 / 60 / 60 / 1000;
            myitemsComplete.push(myitem);
            nextTime = nextTime + 86400000;
          }
        }
        myitemsComplete.push(myitems[i]);
        if (i === myitems.length - 1) {
            return (myitemsComplete);
        }
      }
      return myitems;
    }
  }
  comparator(a, b) {
    return parseInt(a.task.taskDueDate, 10) - parseInt(b.task.taskDueDate, 10);
  }
  setMidnight(mytime: number): number {
    const mydate = new Date (mytime);
    mydate.setHours(0);
    mydate.setMinutes(0);
    mydate.setSeconds(0);
    mydate.setMilliseconds(0);
    return (mydate.getTime());
  }

}
