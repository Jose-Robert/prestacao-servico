import { Injectable } from '@angular/core';
import { Serializer } from '@app/shared/interface/serializer';
import { ClienteListResponse } from './cliente-list-response.model';
import { ClienteOptionResponse } from './cliente-option-response.model';
import { ClienteRequest } from './cliente-request.model';
import { ClienteResponse } from './cliente-response.model';
import { ClienteForm } from './cliente.form';


@Injectable()
export class ClienteSerializer implements Serializer<ClienteRequest, ClienteResponse, ClienteListResponse> {

  fromJsonToResponseListModel(json: any): ClienteListResponse {
    return new ClienteListResponse(
      json.id,
      json.nome,
      json.cpf,
      json.dataCadastro,
      json.ativo);
  }

  fromResponseModelToForm(model: ClienteResponse): ClienteForm {
    const form = new ClienteForm();

    form.patchValue({
      id: model.id,
      nome: model.nome,
      cpf: model.cpf,
      ativo: model.ativo
    });

    return form;
  }

  fromFormToRequestModel(form: ClienteForm): ClienteRequest {
    return new ClienteRequest(
      form.get('nome').value,
      form.get('cpf').value,
      form.get('ativo').value
    );
  }

  fromJsonToResponseModel(json: any): ClienteResponse {

    return new ClienteResponse(
      json.id,
      json.nome,
      json.cpf,
      json.dataCadastro,
      json.ativo);
  }

  fromJsonToResponseOptionModel(json: any): ClienteOptionResponse[] {
    return (json as any[]).map(item => new ClienteOptionResponse(item.id, item.nome, item.cpf));
  }

}
