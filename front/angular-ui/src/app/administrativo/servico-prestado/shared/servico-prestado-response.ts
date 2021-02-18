import { ClienteResponse } from './../../cliente/shared/cliente-response.model';
import { ResponseModel } from '@app/shared/interface/response-model';

export class ServicoPrestadoResponse implements ResponseModel {

  constructor(
    public id: number,
    public descricao: string,
    public cliente: ClienteResponse,
    public valor: number,
    public dataServico: Date,
    public ativo: boolean
  ) { }
}
