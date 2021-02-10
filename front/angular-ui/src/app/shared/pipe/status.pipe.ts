import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: boolean, ...args: string[]): string {
    const statusTrue = args[0] || 'Ativo';
    const statusFalse = args[1] || 'Inativo';

    return value ? statusTrue : statusFalse;
  }
}
