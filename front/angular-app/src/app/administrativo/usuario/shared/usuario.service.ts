import { UsuarioSerializer } from './usuario-serializer';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { CrudService } from '@app/shared/service/crud.service';
import { UsuarioListResponse } from './usuario-list-response.model';
import { UsuarioPerfilInformacoesPessoaisRequest, UsuarioPerfilSenhaRequest } from './usuario-perfil-request.model';
import { UsuarioRequest } from './usuario-request.model';
import { UsuarioResponse } from './usuario-response.model';

@Injectable()
export class UsuarioService extends CrudService<UsuarioRequest, UsuarioResponse, UsuarioListResponse> {

  private _endpointPerfilUrl = '/me';

  constructor(protected httpClient: HttpClient) {
    super(httpClient, environment.apiAuthUrl, '/usuarios', new UsuarioSerializer());
  }

  findPerfil(): Observable<UsuarioListResponse> {
    return this.httpClient.get<UsuarioListResponse>(this.resourceBasePerfilUrl)
      .pipe(map(response => this._serializer.fromJsonToResponseListModel(response)));
  }

  updatePerfilInformacoesPessoais(model: UsuarioPerfilInformacoesPessoaisRequest): Observable<UsuarioListResponse> {
    return this.httpClient.put<UsuarioListResponse>(this.resourceBasePerfilUrl, model)
      .pipe(map(response => this._serializer.fromJsonToResponseListModel(response)));
  }

  updatePerfilSenha(model: UsuarioPerfilSenhaRequest): Observable<UsuarioListResponse> {
    return this.httpClient.patch<UsuarioListResponse>(`${this.resourceBasePerfilUrl}/atualizar-senha`, model)
      .pipe(map(response => this._serializer.fromJsonToResponseListModel(response)));
  }

  get endpointPerfilUrl(): string {
    return this._endpointPerfilUrl;
  }

  get resourceBasePerfilUrl(): string {
    return this._baseUrl + this._endpointPerfilUrl;
  }
}
