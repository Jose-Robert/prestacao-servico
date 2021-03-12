import { MunicipioSerializer } from './municipio.serializer';
import { PaisSerializer } from './pais.serializer';
import { UfSerializer } from './uf.serializer';
import { TipoLogradouroSerializer } from './tipo-logradouro.serializer';
import { EnderecoResponse } from './endereco-response.model';
import { Injectable } from '@angular/core';

@Injectable()
export class EnderecoSerializer {

  private tipoLogradouroSerializer = new TipoLogradouroSerializer();
  private ufSerializer = new UfSerializer();
  private paisSerializer = new PaisSerializer();
  private municipioSerializer = new MunicipioSerializer();

  fromJsonToResponseModel(json: any): EnderecoResponse {
    if (!json) {
      return null;
    }

    return new EnderecoResponse(
      json.id,
      json.cep,
      this.tipoLogradouroSerializer.fromJsonToResponseModel(json.tipoLogradouro),
      json.rua,
      json.numero,
      json.complemento,
      json.bairro,
      this.municipioSerializer.fromJsonToResponseModel(json.municipio),
      this.ufSerializer.fromJsonToResponseModel(json.uf),
      this.paisSerializer.fromJsonToResponseModel(json.pais)
    );
  }

  fromJsonListToResponseModel(jsonList: any[]): EnderecoResponse[] {
    if (!jsonList) {
      return null;
    }
    return jsonList.map((json) => this.fromJsonToResponseModel(json));
  }
}
