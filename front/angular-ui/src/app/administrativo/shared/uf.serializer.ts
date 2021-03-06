import { UfResponse } from './uf-response.model';


export class UfSerializer {
  fromJsonToResponseModel(json: any): UfResponse {
    if (!json) {
      return null;
    }

    return new UfResponse(json.id, json.codigoUf, json.nome, json.sigla, json.regiao);
  }

  fromJsonListToResponseModel(jsonList: any[]): UfResponse[] {
    if (!jsonList) {
      return null;
    }
    return jsonList.map((json) => this.fromJsonToResponseModel(json));
  }
}
