import { environment } from '@env/environment';
import { ClienteResponse } from './cliente.response.model';
import { ClienteRequest } from './cliente-resquest.model';
import { CrudService } from '@app/shared/service/crud.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClienteSerializer } from './cliente-serializer';
import { ClienteListResponse } from './cliente-list-response.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends CrudService<ClienteRequest, ClienteResponse, ClienteListResponse> {

  constructor(protected httpClient: HttpClient) {
    super(httpClient, environment.apiAuthUrl, '/clientes', new ClienteSerializer());
   }
}
