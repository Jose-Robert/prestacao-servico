import { FormGroup, FormControl, Validators } from '@angular/forms';

export class ClienteForm extends FormGroup {
  constructor() {
    super({
      nome: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(150)
      ]),
      cpf: new FormControl('', [
        Validators.required,
        Validators.maxLength(14)
      ]),
      ativo: new FormControl(true, Validators.required)
    })
  }
}
