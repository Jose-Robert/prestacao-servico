import { ResponseListModel } from '@app/shared/interface/response-list-model';

export class UsuarioListResponse implements ResponseListModel {

  constructor(
    public id: number,
    public nome: string,
    public email: string,
    public login: string,
    public grupos: string[],
    public ativo: boolean
  ) { }
}
