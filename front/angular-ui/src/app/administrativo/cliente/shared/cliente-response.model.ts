import { ResponseModel } from '@app/shared/interface/response-model';

export class ClienteResponse implements ResponseModel {

  constructor(
    public id: number,
    public nome: string,
    public cpf: string,
    public dataCadastro: Date,
    public ativo: boolean
  ) { }
}
