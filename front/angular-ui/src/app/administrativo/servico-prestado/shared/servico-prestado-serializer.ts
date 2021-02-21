import { ServicoPrestadoForm } from './servico-prestado.form';
import { ServicoPrestadoListResponse } from './servico-prestado-list-response.model';
import { ServicoPrestadoResponse } from './servico-prestado-response';
import { ServicoPrestadoRequest } from './servico-prestado-request';
import { Serializer } from '@app/shared/interface/serializer';
import { Injectable } from '@angular/core';
import * as moment from 'moment';


@Injectable()
export class ServicoPrestadoSerializer implements Serializer<ServicoPrestadoRequest, ServicoPrestadoResponse,
   ServicoPrestadoListResponse> {

  fromJsonToResponseListModel(json: any): ServicoPrestadoListResponse {
    return new ServicoPrestadoListResponse(
      json.id,
      json.descricao,
      json.valor,
      json.dataServico,
      json.cliente,
      json.ativo);
  }

  fromResponseModelToForm(model: ServicoPrestadoResponse): ServicoPrestadoForm {
    const form = new ServicoPrestadoForm();

    form.patchValue({
      id: model.id,
      descricao: model.descricao,
      valor: model.valor,
      dataServico: moment(model.dataServico).toDate(),
      cliente: model.cliente,
      ativo: model.ativo
    });

    return form;
  }

  fromFormToRequestModel(form: ServicoPrestadoForm): ServicoPrestadoRequest {

    return new ServicoPrestadoRequest(
      form.get('descricao').value,
      form.get('valor').value,
      form.get('dataServico').value,
      form.get('cliente').value,
      form.get('ativo').value
    );
  }

  fromJsonToResponseModel(json: any): ServicoPrestadoResponse {

    return new ServicoPrestadoResponse(
      json.id,
      json.descricao,
      json.valor,
      json.dataServico,
      json.cliente,
      json.ativo);
  }

}
