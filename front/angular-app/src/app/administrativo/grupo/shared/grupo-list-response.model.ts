import { ResponseListModel } from '@app/shared/interface/response-list-model';

export class GrupoListResponse implements ResponseListModel {

  constructor(
    public id: number,
    public nome: string,
    public ativo: boolean
  ) { }
}
