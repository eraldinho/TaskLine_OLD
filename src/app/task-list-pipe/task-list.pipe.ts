import { Pipe, PipeTransform } from '@angular/core';
import {Item} from '../item/item';
@Pipe({
  name: 'taskList'
})
export class TaskListPipe implements PipeTransform {

  transform(items: Array<any>, args?: string[]): Array<any> {
    let myitems: Array<any>;
    const myitemsComplete: Array<any> = [];
    const today = this.setMidnight(new Date().getTime());
    let previousTime: number;
    let nextTime: number;
    if (items && items.length > 0 && args) {
      for (let i = 0; i < args.length; i++) {
        switch (i) {
          case 0: if (args[i] !== '') { this.cleanFind(items, args[i]); }
          break;
          case 1: if (args[i] !== '') { this.cleanType(items, args[i]); }
          break;
          case 2: this.cleanStatus(items, args[i]);
          break;
          case 3: if (args[i] !== '') { this.cleanDateD(items, args[i]); }
          break;
          case 4: if (args[i] !== '') { this.cleanDateF(items, args[i]); }
          break;
          case 5: if (args[i] !== '') { this.cleanoUser(items, args[i]); }
          break;
          case 6: if (args[i] !== '') { this.cleandUser(items, args[i]); }
          break;
          case 7: if (args[i] !== '') { this.cleanWCA(items, args[i]); }
          break;
        }
      }
    }
    if (items && items.length > 0) {// si il y a des données à traiter
      myitems = items.sort(this.comparator); // on classe du plus récent au plus ancien
      // 1er intercalaire à la date de la tache avec l'echeance la plus proche et on fixe l'heure à minuit
      previousTime = this.setMidnight(myitems[0].task.taskDueDate);
      let myitem: Item = new Item;
      myitem.taskDueDate = previousTime;
      myitem.title = new Date(previousTime).toDateString();
      myitem.isNotItem = true;
      myitem.delay = Math.round((-today + previousTime) / 24 / 60 / 60 / 1000);
      myitemsComplete.push(myitem);
      nextTime = previousTime + 86400000; // intercalaire suivant = intercalaire + 24h
      for (let i = 0; i < myitems.length; i++) {
        if (myitems[i].task.taskDueDate >= nextTime) {// si l'echeance est supérieure à la date du prochain jour intercalaire
          myitem = new Item;
          myitem.taskDueDate = nextTime;
          myitem.title = new Date(nextTime).toDateString();
          myitem.isNotItem = true; // on créé un nouvel intercalaire à la date du lendemain
          myitem.delay =  Math.round((-today + nextTime) / 24 / 60 / 60 / 1000);
          myitemsComplete.push(myitem);
          nextTime = nextTime + 86400000;
          while (myitems[i].task.taskDueDate >= nextTime) {
            myitem = new Item;
            myitem.taskDueDate = nextTime;
            myitem.title = new Date(nextTime).toDateString();
            myitem.isNotItem = true;
            myitem.delay =  Math.round((-today + nextTime) / 24 / 60 / 60 / 1000);
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

  cleanFind(items, value) {
    for (let i = 0; i < items.length; i++) {
      console.log(items[i]);
      let mustSplice = true;
      // customerName
      if (items[i].customer.customerName) {
        if (items[i].customer.customerName
          .toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
          .indexOf(value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')) !== -1) {
            mustSplice = false;
        }
      }
      // customerFirstName
      if (items[i].customer.customerFirstName) {
        if (items[i].customer.customerFirstName
          .toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
          .indexOf(value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')) !== -1) {
            mustSplice = false;
        }
      }
      // customerMail
      if (items[i].customer.customerMail) {
        if (items[i].customer.customerMail
          .toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
          .indexOf(value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')) !== -1) {
            mustSplice = false;
        }
      }
      // customerPhone
      if (items[i].customer.customerPhone) {
        if (items[i].customer.customerPhone
          .toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
          .indexOf(value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')) !== -1) {
            mustSplice = false;
        }
      }
      // taskName
      if (items[i].task.taskName) {
        if (items[i].task.taskName
          .toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
          .indexOf(value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')) !== -1) {
            mustSplice = false;
        }
      }
      if (items[i].task.location) {
        if (items[i].task.location
          .toLowerCase().normalize('NFD')
          .indexOf(value.toLowerCase().normalize('NFD')) !== -1) {
            mustSplice = false;
        }
      }
      if (mustSplice) {
        items.splice(i, 1);
        i = i - 1;
      }
    }
  }

  cleanType(items, value) {
    for (let i = 0; i < items.length; i++) {
      if (items[i].task.taskType !== value) {
        items.splice(i, 1);
        i = i - 1;
      }
    }
  }

  cleanStatus(items, value) {
    if (value === '') {// si il n'y a pas de filtre sur le status
      console.log('nonterminee');
      for (let i = 0; i < items.length; i++) {// on affiche que les taches non terminées
        if (items[i].task.status === 'terminee') {// c.a.d on supprime les taches terminées
          items.splice(i, 1);
          i = i - 1;
        }
      }
    } else {
      for (let i = 0; i < items.length; i++) {
        if (items[i].task.status !== value) {
          items.splice(i, 1);
          i = i - 1;
        }
      }
    }
  }

  cleanDateD(items, value) {
    for (let i = 0; i < items.length; i++) {
      if (items[i].task.taskDueDate < Date.parse(value)) {
        items.splice(i, 1);
        i = i - 1;
      }
    }
  }

  cleanDateF(items, value) {
    for (let i = 0; i < items.length; i++) {
      if (items[i].task.taskDueDate > Date.parse(value)) {
        items.splice(i, 1);
        i = i - 1;
      }
    }
  }

  cleanoUser(items, value) {
    for (let i = 0; i < items.length; i++) {
      if (items[i].type === value) {
        items.splice(i, 1);
        i = i - 1;
      }
    }
  }

  cleandUser(items, value) {
    for (let i = 0; i < items.length; i++) {
      if (items[i].type === value) {
        items.splice(i, 1);
        i = i - 1;
      }
    }
  }

  cleanWCA(items, value) {
    for (let i = 0; i < items.length; i++) {
      if (items[i].WCA === value) {
        items.splice(i, 1);
        i = i - 1;
      }
    }
  }

}
