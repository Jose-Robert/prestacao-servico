import { ResponseModel } from '@app/shared/interface/response-model';

export class PermissaoGrupoResponse implements ResponseModel {

  constructor(
    public id: number,
    public papel: string,
    public descricao: string
  ) { }
}
