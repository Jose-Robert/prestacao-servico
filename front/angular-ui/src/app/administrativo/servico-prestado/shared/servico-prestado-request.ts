import { RequestModel } from '@app/shared/interface/request-model';

export class ServicoPrestadoRequest implements RequestModel {

  constructor(
    public descricao: string,
    public cliente: number,
    public valor: number,
    public dataServico: Date,
    public ativo: boolean
  ) { }
}
