import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { QueryParamsFactory } from '../factory/query-params-factory';
import { Pageable } from '../interface/pageable';
import { RequestModel } from '../interface/request-model';
import { ResponseListModel } from '../interface/response-list-model';
import { ResponseModel } from '../interface/response-model';
import { Serializer } from '../interface/serializer';
import { ResponseBody } from '../model/response-body.model';
import { RdService } from './rd.service';

export abstract class CrudService<T extends RequestModel, U extends ResponseModel, L extends ResponseListModel>
extends RdService<U,L>{

  protected queryParamsFactory = new QueryParamsFactory();

  constructor(
    protected httpClient: HttpClient,
    protected _baseUrl: string,
    protected _endpointUrl: string,
    protected _serializer: Serializer<T, U, L>,
  ) {
    super(httpClient,
      _baseUrl,
      _endpointUrl,
      _serializer);
  }

  save(model: T): Observable<U> {
    return this.httpClient.post<ResponseBody<U>>(this.resourceBaseUrl, model)
      .pipe(map(response => this._serializer.fromJsonToResponseModel(response.data)));
  }

  update(model: T, id: number): Observable<U> {
    return this.httpClient.put<ResponseBody<U>>(`${this.resourceBaseUrl}/${id}`, model)
      .pipe(map(response => this._serializer.fromJsonToResponseModel(response.data)));
  }

  get baseUrl(): string {
    return this._baseUrl;
  }

  get endpointUrl(): string {
    return this._endpointUrl;
  }

  get resourceBaseUrl(): string {
    return this._baseUrl + this._endpointUrl;
  }

  get serializer(): Serializer<T, U, L> {
    return this._serializer;
  }

  protected deserializePageable(pageable: Pageable<any>): Pageable<L> {
    pageable.content = pageable.content.map(item => this._serializer.fromJsonToResponseListModel(item));

    return pageable;
  }
}
