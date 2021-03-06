import { ResponseModel } from '@app/shared/interface/response-model';

export class PaisResponse implements ResponseModel {

  constructor(
    public id: number,
    public nome: string,
    public nomePt: string,
    public sigla: string,
    public bacen: number,
  ) { }
}
