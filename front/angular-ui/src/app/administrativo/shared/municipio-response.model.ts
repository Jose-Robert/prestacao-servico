import { ResponseModel } from '@app/shared/interface/response-model';

export class MunicipioResponse implements ResponseModel {

  constructor(
    public id: number,
    public codigoIbge: string,
    public nome: string,
    public uf: string
  ) { }
}
