import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
  name: 'brMoney'
})
export class BrMoneyPipe implements PipeTransform {
  transform(value: number, number_format: string = '1.2-2'): string {
      if (value) {

          const currencyPipe = new CurrencyPipe('en-US');
          let new_value: string;

          new_value = currencyPipe.transform(value, 'BRL', 'R$', number_format);
          new_value = new_value.replace('.', '|').replace(',', '.').replace('|', ',');
          return new_value;
      }
  }
}
