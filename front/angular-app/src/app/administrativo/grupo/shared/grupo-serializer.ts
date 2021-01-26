import { PermissaoSerializer } from './permissao-serializer';
import { Injectable } from '@angular/core';

import { Serializer } from '@app/shared/interface/serializer';
import { GrupoForm } from './grupo.form';
import { GrupoListResponse } from './grupo-list-response.model';
import { GrupoOptionResponse } from './grupo-option-response.model';
import { GrupoRequest } from './grupo-request.model';
import { GrupoResponse } from './grupo-response.model';

@Injectable()
export class GrupoSerializer implements Serializer<GrupoRequest, GrupoResponse, GrupoListResponse> {

  private permissaoSerializer = new PermissaoSerializer();

  fromJsonToResponseModel(json: any): GrupoResponse {
    const permissoes = (json.permissoes as any[]).map(permissao => this.permissaoSerializer.fromJsonToResponseGrupoModel(permissao));

    return new GrupoResponse(json.id, json.nome, permissoes, json.ativo);
  }

  fromJsonToResponseListModel(json: any): GrupoListResponse {
    return new GrupoListResponse(json.id, json.nome, json.ativo);
  }

  fromResponseModelToForm(model: GrupoResponse): GrupoForm {
    const form = new GrupoForm();

    form.patchValue({
      nome: model.nome,
      permissoes: model.permissoes.map(permissao => permissao.id),
      ativo: model.ativo
    });

    return form;
  }

  fromFormToRequestModel(form: GrupoForm): GrupoRequest {
    return new GrupoRequest(
      form.get('nome').value,
      form.get('permissoes').value,
      form.get('ativo').value
    );
  }

  fromJsonToResponseOptionModel(json: any): GrupoOptionResponse {
    return new GrupoOptionResponse(json.id, json.nome);
  }
}
