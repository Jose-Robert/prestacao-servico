import { Pipe, PipeTransform } from '@angular/core';

import { DateUtils } from '../util/date-utils';

@Pipe({
  name: 'timeDifference'
})
export class TimeDifferencePipe implements PipeTransform {

  transform(end: Date | string, start: Date | string, format?: string): string {
    return DateUtils.timeDifference(end, start, format);
  }
}
