import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { QueryParamsFactory } from '../factory/query-params-factory';
import { Pageable } from '../interface/pageable';
import { ResponseListModel } from '../interface/response-list-model';
import { ResponseModel } from '../interface/response-model';
import { ReadSerializer } from '../interface/serializer';
import { ListFilter } from '../models/list-filter.model';
import { ResponseBody } from '../models/response-body.model';




export abstract class RdService<U extends ResponseModel, L extends ResponseListModel> {

  protected queryParamsFactory = new QueryParamsFactory();

  constructor(
    protected httpClient: HttpClient,
    protected _baseUrl: string,
    protected _endpointUrl: string,
    protected _serializer: ReadSerializer<U, L>,
  ) { }

  list(listFilter: ListFilter): Observable<Pageable<L>> {
    const params = this.queryParamsFactory.create(listFilter);

    return this.httpClient.get<ResponseBody<Pageable<L>>>(this.resourceBaseUrl, { params })
      .pipe(map(response => response ? this.deserializePageable(response.data) : null));
  }

  find(id: number): Observable<U> {
    return this.httpClient.get<ResponseBody<U>>(`${this.resourceBaseUrl}/${id}`)
      .pipe(map(response => response ? this._serializer.fromJsonToResponseModel(response.data) : null));
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.resourceBaseUrl}/${id}`);
  }

  changeStatus(id: number): Observable<void> {
    return this.httpClient.patch<void>(`${this.resourceBaseUrl}/${id}/ativo`, null);
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

  get serializer(): ReadSerializer<U, L> {
    return this._serializer;
  }

  protected deserializePageable(pageable: Pageable<any>): Pageable<L> {
    pageable.content = pageable.content.map(item => this._serializer.fromJsonToResponseListModel(item));

    return pageable;
  }

  gerarRelatorio(listFilter: ListFilter, tipo : string): Observable<string> {

    const params = this.queryParamsFactory.create(listFilter);

    return this.httpClient.post<ResponseBody<string>>(`${this.resourceBaseUrl}/arquivos/` + tipo, null, { params })
    .pipe(map(response => response ? response.data : null));
  }

}
