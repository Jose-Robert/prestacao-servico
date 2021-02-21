import { ClienteResponse } from '@app/administrativo/cliente/shared/cliente-response.model';
import { ResponseListModel } from '@app/shared/interface/response-list-model';

export class ServicoPrestadoListResponse implements ResponseListModel {

  constructor(
    public id: number,
    public descricao: string,
    public valor: number,
    public dataServico: Date,
    public cliente: ClienteResponse,
    public ativo: boolean
  ) { }
}
