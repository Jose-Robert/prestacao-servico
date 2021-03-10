import { Injectable } from '@angular/core';
import { TipoLogradouroResponse } from './tipo-logradouro.model';

@Injectable()
export class TipoLogradouroSerializer {
  fromJsonToResponseModel(json: any): TipoLogradouroResponse {
    if (!json) {
      return null;
    }

    return new TipoLogradouroResponse(json.id, json.descricao, json.codigoTipoLogradouro);
  }

  fromJsonListToResponseModel(jsonList: any[]): TipoLogradouroResponse[] {
    if (!jsonList) {
      return null;
    }
    return jsonList.map((json) => this.fromJsonToResponseModel(json));
  }
}
