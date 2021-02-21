import { ServicoPrestadoSerializer } from './servico-prestado-serializer';
import { environment } from './../../../../environments/environment';
import { ServicoPrestadoListResponse } from './servico-prestado-list-response.model';
import { ServicoPrestadoResponse } from './servico-prestado-response';
import { ServicoPrestadoRequest } from './servico-prestado-request';
import { CrudService } from '@app/shared/service/crud.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseBody } from '@app/shared/model/response-body.model';
import { map } from 'rxjs/operators';
import { ClienteSerializer } from '@app/administrativo/cliente/shared/cliente-serializer';
import { ClienteOptionResponse } from '@app/administrativo/cliente/shared/cliente-option-response.model';

@Injectable()
export class ServicoPrestadoService extends CrudService<ServicoPrestadoRequest, ServicoPrestadoResponse,
  ServicoPrestadoListResponse> {

    constructor(protected httpClient: HttpClient) {
      super(httpClient, environment.apiAuthUrl, '/servicos-prestados', new ServicoPrestadoSerializer());
    }

    listarClientes(): Observable<ClienteOptionResponse[]> {
    const serializer = new ClienteSerializer();
    return this.httpClient.get<ResponseBody<ClienteOptionResponse>>(`${this.resourceBaseUrl}/clientes`)
      .pipe(map(response => response ? serializer.fromJsonToResponseOptionModel(response.data) : null));
    }
}
