import { FormGroup } from '@angular/forms';

import { RequestModel } from './request-model';
import { ResponseListModel } from './response-list-model';
import { ResponseModel } from './response-model';

export interface Serializer<T extends RequestModel, U extends ResponseModel, L extends ResponseListModel> {
  fromJsonToResponseModel(json: any): U;
  fromJsonToResponseListModel(json: any): L;
  fromResponseModelToForm(model: ResponseModel): FormGroup;
  fromFormToRequestModel(form: FormGroup): T;
}
