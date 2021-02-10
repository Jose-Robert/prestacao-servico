import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'cep',
})
export class CEPPipe implements PipeTransform {
  transform(cepValue: any) {
    if(!cepValue || cepValue.length !== 8) {
      return '';
    }

    return cepValue.substring(0, 5) + '-' + cepValue.substring(5, 8);
  }
}
