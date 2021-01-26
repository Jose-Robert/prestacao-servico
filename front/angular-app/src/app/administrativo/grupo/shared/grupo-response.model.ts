import { ResponseModel } from '@app/shared/interface/response-model';

import { PermissaoGrupoResponse } from './permissao-grupo-response.model';

export class GrupoResponse implements ResponseModel {

  constructor(
    public id: number,
    public nome: string,
    public permissoes: PermissaoGrupoResponse[],
    public ativo: boolean
  ) { }
}
