import { ClienteResponse } from './cliente.response.model';
import { ClienteRequest } from './cliente-resquest.model';
import { Serializer } from './../../../shared/interface/serializer';
import { FormGroup } from '@angular/forms';
import { ResponseModel } from '@app/shared/interface/response-model';


export class ClienteSerializer implements Serializer<ClienteRequest, ClienteResponse, any> {

  fromJsonToResponseModel(json: any): ClienteResponse {
    throw new Error('Method not implemented.');
  }
  fromJsonToResponseListModel(json: any) {
    throw new Error('Method not implemented.');
  }
  fromResponseModelToForm(model: ResponseModel): FormGroup {
    throw new Error('Method not implemented.');
  }
  fromFormToRequestModel(form: FormGroup): ClienteRequest {
    throw new Error('Method not implemented.');
  }

}
