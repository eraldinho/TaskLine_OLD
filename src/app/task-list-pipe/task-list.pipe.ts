import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskList'
})
export class TaskListPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
