import { FormGroup, FormControl, Validators } from '@angular/forms';
import { trimValidator } from '@app/shared/validators/trimValidator';

export class ServicoPrestadoForm extends FormGroup {

  constructor() {
    super({
      descricao: new FormControl(null, [
        Validators.required,
        trimValidator,
        Validators.minLength(5),
        Validators.maxLength(150)
      ]),
      valor: new FormControl('', Validators.required),
      dataServico: new FormControl('',Validators.required),
      cliente: new FormControl([Validators.required]),
      ativo: new FormControl(true, Validators.required)
    });
  }
}
