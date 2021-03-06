import { PaisResponse } from './pais-response.model';

export class PaisSerializer {
  fromJsonToResponseModel(json: any): PaisResponse {
    if (!json) {
      return null;
    }

    return new PaisResponse(json.id, json.nome, json.nomePt, json.sigla, json.bacen);
  }

  fromJsonListToResponseModel(jsonList: any[]): PaisResponse[] {
    if (!jsonList) {
      return null;
    }
    return jsonList.map((json) => this.fromJsonToResponseModel(json));
  }
}
