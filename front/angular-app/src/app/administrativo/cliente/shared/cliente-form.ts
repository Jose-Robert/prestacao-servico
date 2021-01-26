import { FormGroup, FormControl, Validators } from '@angular/forms';

export class ClienteForm extends FormGroup {
  constructor() {
    super({
      nome: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(150)
      ]),
      cpf: new FormControl(null, [
        Validators.required,
        Validators.maxLength(11)
      ]),
    })
  }
}
