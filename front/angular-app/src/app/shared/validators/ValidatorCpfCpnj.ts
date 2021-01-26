import { AbstractControl } from '@angular/forms';
import { StringUtils } from '@app/shared/utils/string-utils';
import { ValidacoesUtil } from '../utils/validator-utils';

export class ValidatorCpfCpnj {

    static ValidaCpfCnpj(controle: AbstractControl) {

        const erroCpfCnpj = { cpfCnpj: "" };
        let validou: boolean;
        let valorAValidar: string = StringUtils.somenteNumeros(controle.value);

        if (ValidacoesUtil.isCpf(valorAValidar, controle.value)) {            
            validou = ValidacoesUtil.validarCPF(valorAValidar);
        } else {            
            validou = ValidacoesUtil.validarCNPJ(valorAValidar);
        }

        if (validou) {
            return null;
        } 
        
        return erroCpfCnpj;
        
    }

    static ValidaCpf(controle: AbstractControl) {

        const erroCpf = { cpf: "" };
        let validou: boolean = false;
        let valorAValidar: string = StringUtils.somenteNumeros(controle.value);

        if (ValidacoesUtil.isCpf(valorAValidar, controle.value)) {
            validou = ValidacoesUtil.validarCPF(valorAValidar);
        }

        if (validou) {
            return null;
        } 
        
        return erroCpf;
        
    }
}



