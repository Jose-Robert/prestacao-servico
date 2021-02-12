import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'simNao'})
export class SimNaoPipe implements PipeTransform {

  transform(value: boolean, args: string[]): string {
    return value ? 'Sim' : 'Não';
  }

}
