import { StringUtils } from './string-utils';
import { FormGroup, ValidatorFn, Validators } from '@angular/forms';

export class ValidacoesUtil {

    static validarCNPJ(cnpj): boolean {

        if (!cnpj || cnpj.trim() === '' || cnpj.length !== 14) {
            return false;
        }

        if (cnpj === '00000000000000' ||
            cnpj === '11111111111111' ||
            cnpj === '22222222222222' ||
            cnpj === '33333333333333' ||
            cnpj === '44444444444444' ||
            cnpj === '55555555555555' ||
            cnpj === '66666666666666' ||
            cnpj === '77777777777777' ||
            cnpj === '88888888888888' ||
            cnpj === '99999999999999') {
            return false;
        }

        let tamanho = cnpj.length - 2;
        let numeros = cnpj.substring(0, tamanho);
        const digitos = cnpj.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }
        let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado !== digitos.charAt(0)) {
            return false;
        }

        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado !== digitos.charAt(1)) {
            return false;
        }

        return true;
    }

    static validarCPF(cpf): boolean {

      const cpfSoNumeros = StringUtils.removeCaracteresEspeciais(cpf);

        if (!cpfSoNumeros || cpfSoNumeros.trim() === '' || cpfSoNumeros.length !== 11) {
            return false;
        }

        if (cpfSoNumeros.length !== 11 ||
            cpfSoNumeros === '00000000000' ||
            cpfSoNumeros === '11111111111' ||
            cpfSoNumeros === '22222222222' ||
            cpfSoNumeros === '33333333333' ||
            cpfSoNumeros === '44444444444' ||
            cpfSoNumeros === '55555555555' ||
            cpfSoNumeros === '66666666666' ||
            cpfSoNumeros === '77777777777' ||
            cpfSoNumeros === '88888888888' ||
            cpfSoNumeros === '99999999999') {
            return false;
        }

        let add = 0;
        for (let i = 0; i < 9; i++) {
            add += parseInt(cpfSoNumeros.charAt(i)) * (10 - i);
        }

        let rev = 11 - (add % 11);
        if (rev === 10 || rev === 11) {
            rev = 0;
        }

        if (rev !== parseInt(cpfSoNumeros.charAt(9))) {
            return false;
        }

        add = 0;

        for (let i = 0; i < 10; i++) {
            add += parseInt(cpfSoNumeros.charAt(i)) * (11 - i);
        }

        rev = 11 - (add % 11);

        if (rev === 10 || rev === 11) {
            rev = 0;
        }

        if (rev !== parseInt(cpfSoNumeros.charAt(10))) {
            return false;
        }

        return true;
    }

    static isCpf(valorSoNumero: string, valorFormatado: string): boolean {
        if (valorSoNumero && valorFormatado) {
            return (valorSoNumero.length <= 11) && (!valorFormatado.includes('/'));
        }

        return false;
    }

    static limparValidators(form: FormGroup, field: string, childField?: string): void {
      if (!form) {
        return ;
      }

      if (childField) {
        form.get(field).get(childField).clearValidators();
        form.get(field).get(childField).markAsUntouched();
        form.get(field).get(childField).updateValueAndValidity();
        return;
      }

      form.get(field).markAsUntouched();
      form.get(field).clearValidators();
      form.get(field).updateValueAndValidity();
    }

    static atualizarValidatorsRequired(form: FormGroup, field: string, childField?: string, newValidators?: ValidatorFn[]): void {
      if (!form) {
        return ;
      }

      let validators: ValidatorFn[] = [Validators.required];
      if (newValidators) {
        validators = validators.concat(newValidators);
      }

      if (childField) {
        form.get(field).get(childField).setValidators(validators);
        form.get(field).get(childField).updateValueAndValidity();
        return;
      }

      form.get(field).setValidators(validators);
      form.get(field).updateValueAndValidity();
    }
}
