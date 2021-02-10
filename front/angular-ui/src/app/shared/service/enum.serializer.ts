import { Injectable } from '@angular/core';
import { EnumResponse } from '../model/enum-response.model';

@Injectable()
export class EnumSerializer {

    fromJsonToResponseModel(json: any): EnumResponse {
      if(!json){
        return null;
      }
        return new EnumResponse(json.id, json.descricao, json.name);
    }

    fromJsonListToResponseModel(jsonList: any[]): EnumResponse[] {
      if(!jsonList){
        return null;
      }
        return jsonList.map(json => this.fromJsonToResponseModel(json));
    }
}
