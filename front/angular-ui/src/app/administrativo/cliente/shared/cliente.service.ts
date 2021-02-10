import { ClienteSerializer } from './cliente-serializer';
import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ClienteListResponse } from './cliente-list-response.model';
import { ClienteResponse } from './cliente-response.model';
import { ClienteRequest } from './cliente-request.model';
import { CrudService } from '@app/shared/service/crud.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ClienteService extends CrudService<ClienteRequest, ClienteResponse, ClienteListResponse> {

  constructor(protected httpClient: HttpClient) {
    super(httpClient, environment.apiAuthUrl, '/clientes', new ClienteSerializer());
   }
}
