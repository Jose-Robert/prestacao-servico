import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidatorCpfCpnj } from '@app/shared/validators/ValidatorCpfCpnj';

export class ServicoPrestadoForm extends FormGroup {

  constructor() {
    super({
      descricao: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(150)
      ]),
      cliente: new FormControl('', [Validators.required]),
      valor: new FormControl(0, [Validators.required]),
      dataServico: new FormControl('', [Validators.required]),
      ativo: new FormControl(true, Validators.required)
    });
  }
}
