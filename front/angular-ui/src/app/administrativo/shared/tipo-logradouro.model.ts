import { ResponseModel } from '@app/shared/interface/response-model';

export class TipoLogradouroResponse implements ResponseModel {

  constructor(
    public id: number,
    public descricao: string,
    public codigoTipoLogradouro: string,
  ) { }
}
