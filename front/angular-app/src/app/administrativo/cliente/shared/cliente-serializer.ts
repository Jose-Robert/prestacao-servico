import { ClienteResponse } from './cliente.response.model';
import { ClienteRequest } from './cliente-resquest.model';
import { Serializer } from './../../../shared/interface/serializer';
import { ClienteForm } from './cliente-form';
import { Injectable } from '@angular/core';


@Injectable()
export class ClienteSerializer implements Serializer<ClienteRequest, ClienteResponse, any> {

  fromJsonToResponseModel(json: any): ClienteResponse {
    throw new Error('Method not implemented.');
  }
  fromJsonToResponseListModel(json: any) {
    throw new Error('Method not implemented.');
  }
  fromResponseModelToForm(model: ClienteResponse): ClienteForm {
    const form = new ClienteForm();

    form.patchValue({
      id: model.id,
      nome: model.nome,
      cpf: model.cpf,
      dataCadastro: model.dataCadastro
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
