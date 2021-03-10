import { Injectable } from '@angular/core';
import { MunicipioResponse } from './municipio-response.model';

@Injectable()
export class MunicipioSerializer {
  fromJsonToResponseModel(json: any): MunicipioResponse {
    if (!json) {
      return null;
    }

    return new MunicipioResponse(json.id, json.codigoIbge, json.nome, json.uf);
  }

  fromJsonListToResponseModel(jsonList: any[]): MunicipioResponse[] {
    if (!jsonList) {
      return null;
    }
    return jsonList.map((json) => this.fromJsonToResponseModel(json));
  }
}
