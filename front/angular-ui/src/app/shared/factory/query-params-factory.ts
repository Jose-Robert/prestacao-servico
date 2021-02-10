import { HttpParams } from '@angular/common/http';

import { isNullOrUndefined, isArray, isDate } from 'util';

import { DateUtils } from '@app/shared/util/date-utils';

export interface ParamSort {
  field: string;
  order: string;
}

export class QueryParamsFactory {

  create(obj: object): HttpParams {
    let params = new HttpParams();

    Object.keys(obj).forEach(key => {
      const param = obj[key];

      params = 'sort' === key
        ? this.appendParamsSort(params, param)
        : this.appendParamFilter(params, key, param);
    });

    return params;
  }

  private appendParamsSort(params: HttpParams, param: ParamSort[]): HttpParams {
    param.forEach(p => params = params.append('sort', `${p.field},${p.order}`));

    return params;
  }

  private appendParamFilter(params: HttpParams, key: string, value: any): HttpParams {
    if (isNullOrUndefined(value)) {
      return params;
    }

    value = this.prepareParamFilter(value);

    if (value.length) {
      params = params.append(key, value);
    }

    return params;
  }

  private prepareParamFilter(value: any): string {
    if (isNullOrUndefined(value)) {
      return null;
    }

    if (isArray(value)) {
      return this.prepareParamFilterArray(value);
    }

    return isDate(value) ? DateUtils.toDate(value) : String(value);
  }

  private prepareParamFilterArray(value: any[]): string {
    const arrayFilter: string[] = value.map(v => this.prepareParamFilter(v));

    return String(arrayFilter.filter(p => !isNullOrUndefined(p) && String(p).length));
  }
}
