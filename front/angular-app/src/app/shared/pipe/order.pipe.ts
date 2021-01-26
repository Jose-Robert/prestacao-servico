import { Pipe, PipeTransform } from '@angular/core';
import { orderBy } from 'lodash';

@Pipe({
  name: 'orderBy'
})
export class OrderPipe implements PipeTransform {

  transform(value: any[], order, params: string): any[] {
    if (!value || order === '' || !order) {
      return value;
    }

    if (value.length <= 1) {
      return value;
    }

    if (!params || params === '') {
      if (order === 'asc') {
        return value.sort();
    }else {
        return value.sort().reverse();
      }
    }

    return orderBy(value, [order], [params]);
  }

}
