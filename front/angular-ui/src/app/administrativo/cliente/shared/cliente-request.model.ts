import { EnderecoRequest } from '@app/administrativo/shared/endereco-request.model';
import { RequestModel } from '@app/shared/interface/request-model';

export class ClienteRequest implements RequestModel {

  constructor(
    public nome: string,
    public cpf: string,
    public ativo: boolean,
    public endereco: EnderecoRequest
  ) { }
}
