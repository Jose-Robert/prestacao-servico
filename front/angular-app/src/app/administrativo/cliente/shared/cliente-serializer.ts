import { ClienteResponse } from './cliente.response.model';
import { ClienteRequest } from './cliente-resquest.model';
import { Serializer } from './../../../shared/interface/serializer';
import { ClienteForm } from './cliente-form';
import { Injectable } from '@angular/core';
import { ClienteListResponse } from './cliente-list-response.model';
import { DateUtils } from '@app/shared/utils/date-utils';


@Injectable()
export class ClienteSerializer implements Serializer<ClienteRequest, ClienteResponse, ClienteListResponse> {

  fromJsonToResponseModel(json: any): ClienteResponse {
    throw new Error('Method not implemented.');
  }
  fromJsonToResponseListModel(json: any): ClienteListResponse {
    return new ClienteListResponse(
      json.id,
      json.nome,
      json.cpf,
      json.ativo
    );
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
      form.get('ativo').value,
    );
  }

}
