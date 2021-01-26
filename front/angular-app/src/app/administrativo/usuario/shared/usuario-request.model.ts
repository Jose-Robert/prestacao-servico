import { RequestModel } from '@app/shared/interface/request-model';

export class UsuarioRequest implements RequestModel {

  constructor(
    public nome: string,
    public email: string,
    public login: string,
    public grupos: number[],
    public ativo: boolean
  ) { }
}
