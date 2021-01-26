import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

export class UsuarioForm extends FormGroup {

  constructor() {
    super({
      nome: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(32)]
      ),
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.minLength(5),
        Validators.maxLength(100)]
      ),
      confirmacaoEmail: new FormControl(null, Validators.required),
      login: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(32)
      ]),
      grupos: new FormControl([], Validators.required),
      ativo: new FormControl(true, Validators.required)
    });

    this.setValidators(emailConfirmado);
  }
}

export class UsuarioPerfilInformacoesPessoaisForm extends FormGroup {

  constructor() {
    super({
      nome: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(32)]
      ),
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.minLength(5),
        Validators.maxLength(100)]
      ),
      confirmacaoEmail: new FormControl(null, Validators.required),
      login: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(32)
      ])
    });

    this.setValidators(emailConfirmado);
  }
}

export class UsuarioPerfilSenhaForm extends FormGroup {

  constructor() {
    super({
      senhaAtual: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)
      ]),
      senha: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)
      ]),
      confirmacaoSenha: new FormControl(null, Validators.required)
    });

    this.setValidators(senhaConfirmada);
  }
}

function emailConfirmado(control: AbstractControl): { emailConfirmado: { valid: boolean} } {
  const email: string = control.get('email').value;
  const confirmacaoEmail: string = control.get('confirmacaoEmail').value;

  return email === confirmacaoEmail ? null : {
    emailConfirmado: { valid: false }
  };
}

function senhaConfirmada(control: AbstractControl): { senhaConfirmada: { valid: boolean} } {
  const senha: string = control.get('senha').value;
  const confirmacaoSenha: string = control.get('confirmacaoSenha').value;

  return senha === confirmacaoSenha ? null : {
    senhaConfirmada: { valid: false }
  };
}
