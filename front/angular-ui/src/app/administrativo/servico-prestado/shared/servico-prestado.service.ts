import { ServicoPrestadoSerializer } from './servico-prestado-serializer';
import { environment } from './../../../../environments/environment';
import { ServicoPrestadoListResponse } from './servico-prestado-list-response.model';
import { ServicoPrestadoResponse } from './servico-prestado-response';
import { ServicoPrestadoRequest } from './servico-prestado-request';
import { CrudService } from '@app/shared/service/crud.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ServicoPrestadoService extends CrudService<ServicoPrestadoRequest, ServicoPrestadoResponse,
  ServicoPrestadoListResponse> {

    constructor(protected httpClient: HttpClient) {
      super(httpClient, environment.apiAuthUrl, '/servicos-prestados', new ServicoPrestadoSerializer());
    }
}
