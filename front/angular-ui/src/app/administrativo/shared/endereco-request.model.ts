export class EnderecoRequest {

  constructor(
      public cep: string,
      public logradouro: number,
      public rua: string,
      public numero: string,
      public complemento: string,
      public bairro: string,
      public municipio: number,
      public uf: number,
      public pais: number
  ){}
}
