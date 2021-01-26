import { RequestModel } from './../../../shared/interface/request-model';


export class ClienteRequest implements RequestModel {

  constructor(
    public nome: string,
    public cpf: string,
    public ativo: boolean
  ) { }
}
