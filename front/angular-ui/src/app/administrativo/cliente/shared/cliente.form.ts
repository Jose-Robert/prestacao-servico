import { ValidatorCpfCpnj } from './../../../shared/validators/ValidatorCpfCpnj';
import { FormGroup, FormControl, Validators } from '@angular/forms';

export class ClienteForm extends FormGroup {

  constructor() {
    super({
      nome: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(150)
      ]),
      cpf: new FormControl('', [
        Validators.required,
      ]),
      ativo: new FormControl(true, Validators.required)
    });
  }
}
