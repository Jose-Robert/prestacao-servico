import { Injectable } from '@angular/core';

import { GrupoSerializer } from '@app/administrativo/grupo/shared/grupo-serializer';
import { Serializer } from '@app/shared/interface/serializer';
import { UsuarioListResponse } from './usuario-list-response.model';
import { UsuarioPerfilInformacoesPessoaisRequest, UsuarioPerfilSenhaRequest } from './usuario-perfil-request.model';
import {
  UsuarioPerfilInformacoesPessoaisForm,
  UsuarioPerfilSenhaForm,
  UsuarioForm
} from './usuario.form';
import { UsuarioRequest } from './usuario-request.model';
import { UsuarioResponse } from './usuario-response.model';

export class UsuarioSerializer implements Serializer<UsuarioRequest, UsuarioResponse, UsuarioListResponse> {

  private grupoSerializer = new GrupoSerializer();

  fromJsonToResponseModel(json: any): UsuarioResponse {
    const grupos = (json.grupos as any[]).map(grupo => this.grupoSerializer.fromJsonToResponseOptionModel(grupo));

    return new UsuarioResponse(json.id, json.nome, json.email, json.login, grupos, json.ativo, json.pendente, json.bloqueado);
  }

  fromJsonToResponseListModel(json: any): UsuarioListResponse {
    return new UsuarioListResponse(json.id, json.nome, json.email, json.login, json.grupos, json.ativo);
  }

  fromResponseModelToForm(model: UsuarioResponse): UsuarioForm {
    const form = new UsuarioForm();

    form.patchValue({
      nome: model.nome,
      email: model.email,
      login: model.login,
      grupos: model.grupos.map(grupo => grupo.id),
      ativo: model.ativo
    });

    return form;
  }

  fromFormToRequestModel(form: UsuarioForm): UsuarioRequest {
    return new UsuarioRequest(
      form.get('nome').value,
      form.get('email').value,
      form.get('login').value,
      form.get('grupos').value,
      form.get('ativo').value
    );
  }

  fromResponseListModelToPerfilInformacoesPessoaisForm(
    model: UsuarioListResponse
  ): UsuarioPerfilInformacoesPessoaisForm {
    const form = new UsuarioPerfilInformacoesPessoaisForm();

    form.patchValue({
      nome: model.nome,
      email: model.email,
      login: model.login
    });

    return form;
  }

  fromPerfilInformacoesPessoaisFormToRequestModel(
    form: UsuarioPerfilInformacoesPessoaisForm
  ): UsuarioPerfilInformacoesPessoaisRequest {
    return new UsuarioPerfilInformacoesPessoaisRequest(
      form.get('nome').value,
      form.get('email').value,
      form.get('login').value
    );
  }

  fromPerfilSenhaFormToRequestModel(form: UsuarioPerfilSenhaForm): UsuarioPerfilSenhaRequest {
    return new UsuarioPerfilSenhaRequest(
      form.get('senhaAtual').value,
      form.get('senha').value
    );
  }
}
