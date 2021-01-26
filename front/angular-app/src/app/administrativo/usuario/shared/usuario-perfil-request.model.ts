export class UsuarioPerfilInformacoesPessoaisRequest {

  constructor(
    public nome: string,
    public email: string,
    public login: string
  ) { }
}

export class UsuarioPerfilSenhaRequest {

  constructor(
    public senhaAtual: string,
    public senhaNova: string
  ) { }
}
