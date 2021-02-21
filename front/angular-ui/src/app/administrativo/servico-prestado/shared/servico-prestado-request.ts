import { RequestModel } from '@app/shared/interface/request-model';

export class ServicoPrestadoRequest implements RequestModel {

  constructor(
    public descricao: string,
    public valor: number,
    public dataServico: Date,
    public cliente: number,
    public ativo: boolean
  ) { }
}
