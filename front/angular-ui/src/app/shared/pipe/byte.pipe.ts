import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({
  name: 'byte'
})
export class BytePipe implements PipeTransform {

  constructor(private decimalPipe: DecimalPipe) { }

  /**
   * Converte um valor em bytes na unidade mais adequada para impressão (B, KB, MB ou GB).
   * @param value valor a ser convertido.
   */
  transform(value: number): string {
    if (value < 1024) {
      return this.transformDecimal(value) + ' B';
    }

    if (value < 1048576) {
      return this.transformDecimal(value / 1024) + ' KB';
    }

    if (value < 1073741824) {
      return this.transformDecimal(value / 1024 / 1024) + ' MB';
    }

    return this.transformDecimal(value / 1024 / 1024 / 1024) + ' GB';
  }

  private transformDecimal(value: number, digits = '1.0-2'): string {
    return this.decimalPipe.transform(value, digits);
  }
}
