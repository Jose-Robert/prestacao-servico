import { ResponseListModel } from '@app/shared/interface/response-list-model';

export class ClienteListResponse implements ResponseListModel {

  constructor(
    public id: number,
    public nome: string,
    public cpf: string,
    public dataCadastro: Date,
    public ativo: boolean
  ) { }
}
