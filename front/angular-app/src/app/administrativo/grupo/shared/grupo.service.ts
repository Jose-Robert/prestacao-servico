import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { CrudService } from '@app/shared/service/crud.service';
import { GrupoListResponse } from './grupo-list-response.model';
import { GrupoOptionResponse } from './grupo-option-response.model';
import { GrupoRequest } from './grupo-request.model';
import { GrupoResponse } from './grupo-response.model';
import { GrupoSerializer } from './grupo-serializer';

@Injectable()
export class GrupoService extends CrudService<GrupoRequest, GrupoResponse, GrupoListResponse> {

  constructor(protected httpClient: HttpClient) {
    super(httpClient, environment.apiAuthUrl, '/grupos', new GrupoSerializer());
  }

  findOptions(): Observable<GrupoOptionResponse[]> {
    return this.httpClient.get<GrupoOptionResponse[]>(`${this.resourceBaseUrl}/ativos`)
      .pipe(map(response => response.map(value => (this._serializer as GrupoSerializer).fromJsonToResponseOptionModel(value))));
  }
}
