import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cnpjCpf'
})
export class CnpjCpfPipe implements PipeTransform {

  transform(value: string) {

    if(!value) {
      return '';
    }

    if (value.length === 11) {
      const cpfLista = value.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);
      return cpfLista[1] + '.' + cpfLista[2] + '.' + cpfLista[3] + '-' + cpfLista[4];
    }

    return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '\$1.\$2.\$3\/\$4\-\$5');
  }

}
