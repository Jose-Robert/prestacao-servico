import { ResponseModel } from '@app/shared/interface/response-model';

export class UfResponse implements ResponseModel {

  constructor(
    public id: number,
    public codigoUf: number,
	  public nome: string,
	  public sigla: string,
	  public regiao: number
  ) { }
}
