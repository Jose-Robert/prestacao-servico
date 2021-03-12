import { FormGroup, FormControl, Validators } from '@angular/forms';
import { trimValidator } from '@app/shared/validators/trimValidator';
import { ValidatorCpfCpnj } from '@app/shared/validators/ValidatorCpfCpnj';

export class ClienteForm extends FormGroup {

  constructor() {
    super({
      nome: new FormControl(null, [
        Validators.required,
        trimValidator,
        Validators.minLength(5),
        Validators.maxLength(150)
      ]),
      cpf: new FormControl('', [
        Validators.required,
        Validators.maxLength(14),
        ValidatorCpfCpnj.ValidaCpf
      ]),
      ativo: new FormControl(true, Validators.required),
      endereco: new FormGroup({
        cep: new FormControl('', Validators.required),
        tipoLogradouro: new FormControl('', Validators.required),
        rua: new FormControl('', Validators.required),
        numero: new FormControl('', Validators.required),
        complemento: new FormControl(''),
        bairro: new FormControl('', Validators.required),
        municipio: new FormControl('', Validators.required),
        uf: new FormControl('', Validators.required),
        pais: new FormControl('', Validators.required),
      })
    });
  }
}
