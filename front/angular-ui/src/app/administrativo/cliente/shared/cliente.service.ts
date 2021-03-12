import { ClienteSerializer } from './cliente-serializer';
import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ClienteListResponse } from './cliente-list-response.model';
import { ClienteResponse } from './cliente-response.model';
import { ClienteRequest } from './cliente-request.model';
import { CrudService } from '@app/shared/service/crud.service';
import { Injectable } from '@angular/core';
import { TipoLogradouroResponse } from '@app/administrativo/shared/tipo-logradouro.model';
import { Observable } from 'rxjs';
import { ResponseBody } from '@app/shared/model/response-body.model';
import { TipoLogradouroSerializer } from '@app/administrativo/shared/tipo-logradouro.serializer';
import { map } from 'rxjs/operators';
import { MunicipioResponse } from '@app/administrativo/shared/municipio-response.model';
import { MunicipioSerializer } from '@app/administrativo/shared/municipio.serializer';
import { UfSerializer } from '@app/administrativo/shared/uf.serializer';
import { PaisSerializer } from '@app/administrativo/shared/pais.serializer';
import { UfResponse } from '@app/administrativo/shared/uf-response.model';
import { PaisResponse } from '@app/administrativo/shared/pais-response.model';

@Injectable()
export class ClienteService extends CrudService<ClienteRequest, ClienteResponse, ClienteListResponse> {

  constructor(
      protected httpClient: HttpClient,
      private logradouroSerializer: TipoLogradouroSerializer,
      private municipioSerializer: MunicipioSerializer,
      private ufSerializer: UfSerializer,
      private paisSerializer: PaisSerializer
    ) {
    super(httpClient, environment.apiAuthUrl, '/clientes', new ClienteSerializer());
  }

  listarTiposLogradouros(): Observable<TipoLogradouroResponse[]> {
    return this.httpClient.get<ResponseBody<any>>(`${this.resourceBaseUrl}/tipos-logradouros`)
      .pipe(map(response => response ? this.logradouroSerializer.fromJsonListToResponseModel(response.data) : null));
  }

  listarMunicipios(): Observable<MunicipioResponse[]> {
    return this.httpClient.get<ResponseBody<any>>(`${this.resourceBaseUrl}/municipios`)
      .pipe(map(response => response ? this.municipioSerializer.fromJsonListToResponseModel(response.data) : null));
  }

  listarMunicipiosPorUf(uf: string): Observable<MunicipioResponse[]> {
    return this.httpClient.get<ResponseBody<any>>(`${this.resourceBaseUrl}/municipios/${uf}`)
      .pipe(map(response => response ? this.municipioSerializer.fromJsonListToResponseModel(response.data) : null));
  }

  listarUfs(): Observable<UfResponse[]> {
    return this.httpClient.get<ResponseBody<any>>(`${this.resourceBaseUrl}/ufs`)
      .pipe(map(response => response ? this.ufSerializer.fromJsonListToResponseModel(response.data) : null));
  }

  listarPaises(): Observable<PaisResponse[]> {
    return this.httpClient.get<ResponseBody<any>>(`${this.resourceBaseUrl}/paises`)
      .pipe(map(response => response ? this.paisSerializer.fromJsonListToResponseModel(response.data) : null));
  }
}
