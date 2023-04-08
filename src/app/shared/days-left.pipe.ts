import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'daysLeft',
})
export class DaysLeftPipe implements PipeTransform {
  transform(value: string, ...args: string[]): string {
    let now = moment().toDate()
    if (moment(value).isBefore(now))
      return moment(value).fromNow(true) + ' ' + 'Ago';

    else return moment(value).fromNow(true) + ' ' + 'Left';
    return ''
  }
}
