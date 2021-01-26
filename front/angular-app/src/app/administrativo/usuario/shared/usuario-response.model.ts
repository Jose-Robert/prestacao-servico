import { GrupoOptionResponse } from '@app/administrativo/grupo/shared/grupo-option-response.model';
import { ResponseModel } from '@app/shared/interface/response-model';

export class UsuarioResponse implements ResponseModel {

  constructor(
    public id: number,
    public nome: string,
    public email: string,
    public login: string,
    public grupos: GrupoOptionResponse[],
    public ativo: boolean,
    public pendente: boolean,
    public bloqueado: boolean
  ) { }
}
