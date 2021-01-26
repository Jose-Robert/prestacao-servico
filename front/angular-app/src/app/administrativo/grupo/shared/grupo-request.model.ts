import { RequestModel } from '@app/shared/interface/request-model';

export class GrupoRequest implements RequestModel {

  constructor(
    public nome: string,
    public permissoes: number[],
    public ativo: boolean
  ) { }
}
