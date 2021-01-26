import { FormGroup, FormControl, Validators } from '@angular/forms';

export class GrupoForm extends FormGroup {

  constructor() {
    super({
      nome: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]),
      permissoes: new FormControl([]),
      ativo: new FormControl(true, Validators.required)
    });
  }
}
