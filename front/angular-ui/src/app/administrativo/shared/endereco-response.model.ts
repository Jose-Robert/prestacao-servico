import { PaisResponse } from './pais-response.model';
import { UfResponse } from './uf-response.model';
import { MunicipioResponse } from './municipio-response.model';
import { TipoLogradouroResponse } from './tipo-logradouro.model';
import { ResponseModel } from '@app/shared/interface/response-model';

export class EnderecoResponse implements ResponseModel {

  constructor(
    public id: number,
    public cep: string,
	  public tipoLogradouro: TipoLogradouroResponse,
	  public rua: string,
	  public numero: string,
	  public complemento: string,
	  public bairro: string,
	  public municipio: MunicipioResponse,
	  public uf: UfResponse,
	  public pais: PaisResponse,
  ){}
}
