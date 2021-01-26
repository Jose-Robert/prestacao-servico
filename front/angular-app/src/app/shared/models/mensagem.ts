export class Mensagem {

  private _mensagem: string;
  private _tipoMensagem: string;

  get tipoMensagem() {
    return this._tipoMensagem;
  }

  set tipoMensagem(tipoMensagem: string) {
    this._tipoMensagem = tipoMensagem;
  }

  get mensagem() {
    return this._mensagem;
  }

  set mensagem(mensagem: string) {
    this._mensagem = mensagem;
  }

}
