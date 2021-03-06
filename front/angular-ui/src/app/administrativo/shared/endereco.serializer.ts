import { MunicipioSerializer } from './municipio.serializer';
import { PaisSerializer } from './pais.serializer';
import { UfSerializer } from './uf.serializer';
import { TipoLogradouroSerializer } from './tipo-logradouro.serializer';
import { EnderecoResponse } from './endereco-response.model';


export class EnderecoSerializer {

  fromJsonToResponseModel(json: any): EnderecoResponse {
    const tipologradouroSerializer = new TipoLogradouroSerializer();
    const ufSerializer = new UfSerializer();
    const paisSerializer = new PaisSerializer();
    const municipioSerializer = new MunicipioSerializer();

    if (!json) {
      return null;
    }

    return new EnderecoResponse(
      json.id,
      json.cep,
      tipologradouroSerializer.fromJsonToResponseModel(json.tipologradouro),
      json.rua,
      json.numero,
      json.complemento,
      json.bairro,
      municipioSerializer.fromJsonToResponseModel(json.municipio),
      ufSerializer.fromJsonToResponseModel(json.uf),
      paisSerializer.fromJsonToResponseModel(json.pais)
      );
  }

  fromJsonListToResponseModel(jsonList: any[]): EnderecoResponse[] {
    if (!jsonList) {
      return null;
    }
    return jsonList.map((json) => this.fromJsonToResponseModel(json));
  }
}
