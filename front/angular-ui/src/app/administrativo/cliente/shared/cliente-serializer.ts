import { Injectable } from '@angular/core';
import { EnderecoResponse } from '@app/administrativo/shared/endereco-response.model';
import { MunicipioSerializer } from '@app/administrativo/shared/municipio.serializer';
import { PaisSerializer } from '@app/administrativo/shared/pais.serializer';
import { TipoLogradouroSerializer } from '@app/administrativo/shared/tipo-logradouro.serializer';
import { UfSerializer } from '@app/administrativo/shared/uf.serializer';
import { Serializer } from '@app/shared/interface/serializer';
import { ClienteListResponse } from './cliente-list-response.model';
import { ClienteOptionResponse } from './cliente-option-response.model';
import { ClienteRequest } from './cliente-request.model';
import { ClienteResponse } from './cliente-response.model';
import { ClienteForm } from './cliente.form';


@Injectable()
export class ClienteSerializer implements Serializer<ClienteRequest, ClienteResponse, ClienteListResponse> {

  private tipologradouroSerializer = new TipoLogradouroSerializer();
  private ufSerializer = new UfSerializer();
  private paisSerializer = new PaisSerializer();
  private municipioSerializer = new MunicipioSerializer();

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
      ativo: model.ativo,
      endereco: model.endereco
    });

    return form;
  }

  fromFormToRequestModel(form: ClienteForm): ClienteRequest {
    return new ClienteRequest(
      form.get('nome').value,
      form.get('cpf').value,
      form.get('ativo').value,
      form.get('endereco').value,
    );
  }

  fromJsonToResponseModel(json: any): ClienteResponse {

    let endereco = null;
    if (json.endereco) {
      endereco = new EnderecoResponse(
          json.id,
          json.cep,
          this.tipologradouroSerializer.fromJsonToResponseModel(json.tipoLogradouro),
          json.rua,
          json.numero,
          json.complemento,
          json.bairro,
          this.municipioSerializer.fromJsonToResponseModel(json.municipio),
          this.ufSerializer.fromJsonToResponseModel(json.uf),
          this.paisSerializer.fromJsonToResponseModel(json.pais)
      );
    }

    return new ClienteResponse(
      json.id,
      json.nome,
      json.cpf,
      json.dataCadastro,
      json.ativo,
      endereco
    );
  }

  fromJsonToResponseOptionModel(json: any): ClienteOptionResponse[] {
    return (json as any[]).map(item => new ClienteOptionResponse(item.id, item.nome, item.cpf, item.ativo));
  }

}
