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
    console.log('today:  ' + today);
    let previousTime: number;
    let nextTime: number;
    if (items && items.length > 0) {// si il y a des données à traiter
      myitems = items.sort(this.comparator); // on classe du plus recent au plus ancien
      console.log(myitems);
      previousTime = this.setMidnight(myitems[0].Echeance); // 1er intercalaire à la date la plus ancienne et on fixe l'heure à minuit
      let myitem: Item = new Item;
      myitem.Echeance = previousTime;
      myitem.title = new Date(previousTime).toDateString();
      myitem.isNotItem = true;
      if (previousTime < today) {
        myitem.beHurry = true;
      } else if (previousTime === today) {
        myitem.beQuick = true;
      } else if (previousTime > today) {
        myitem.beCool = true;
      }
      myitemsComplete.push(myitem);
      nextTime = previousTime + 86400000; // intercalaire suivant = intercalaire + 24h
      for (let i = 0; i < myitems.length; i++) {
        if (myitems[i].Echeance > nextTime) {// si l'echeance est supérieure à la date du prochain jour intercalaire
          myitem = new Item;
          myitem.Echeance = nextTime;
          myitem.title = new Date(nextTime).toDateString();
          myitem.isNotItem = true; // on créé un nouvel intercalaire à la date du lendemain
          if (nextTime < today) {
            myitem.beHurry = true;
          } else if (nextTime === today) {
            myitem.beQuick = true;
          } else if (nextTime > today) {
            myitem.beCool = true;
          }
          myitemsComplete.push(myitem);
          nextTime = nextTime + 86400000;
          while (myitems[i].Echeance > nextTime) {
            myitem = new Item;
            myitem.Echeance = nextTime;
            myitem.title = new Date(nextTime).toDateString();
            myitem.isNotItem = true;
            if (nextTime < today) {
              myitem.beHurry = true;
            } else if (nextTime === today) {
              myitem.beQuick = true;
            } else if (nextTime > today) {
              myitem.beCool = true;
            }
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
    return parseInt(a.Echeance, 10) - parseInt(b.Echeance, 10);
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
