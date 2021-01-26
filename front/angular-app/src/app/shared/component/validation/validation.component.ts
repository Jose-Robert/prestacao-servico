import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

import { Validation } from './validation.model';
import { ValidationType } from './validation-type.enum';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html'
})
export class ValidationComponent {

  @Input() control: AbstractControl = new FormControl();
  @Input() messages: Validation[] = [];
  @Input() mode: 'touched' | 'submitted' = 'touched';
  @Input() submitted = false;

  get errors(): string[] {
    return Object.keys(this.control.errors);
  }

  enableValidation(): boolean {
    return 'touched' === this.mode
      ? Boolean(this.control.errors && (this.submitted || this.control.touched))
      : Boolean(this.control.errors && this.submitted);
  }

  getMessage(error: string): string {
    for (const validationMessage of this.messages) {
      if (error === validationMessage.type) {
        return validationMessage.message;
      }
    }

    return this.getDefaultMessage(error);
  }

  getDefaultMessage(error: string): string {
    const messages: Map<string, string> = new Map();
    messages.set(ValidationType.REQUIRED, 'Este campo é obrigatório');
    messages.set(ValidationType.REQUIRED_TRUE, 'Este campo deve ser marcado');
    messages.set(ValidationType.MIN, `Valor mínimo: ${this.minError}`);
    messages.set(ValidationType.MIN_LENGTH, `Tamanho mínimo: ${this.minLengthError} caracteres`);
    messages.set(ValidationType.MAX, `Valor máximo: ${this.maxError}`);
    messages.set(ValidationType.MAX_LENGTH, `Tamanho máximo: ${this.maxLengthError} caracteres`);
    messages.set(ValidationType.PATTERN, 'Formato inválido');
    messages.set(ValidationType.VALIDATE_PATTERN, 'Formato inválido');
    messages.set(ValidationType.EMAIL, 'E-mail inválido');

    return messages.has(error) ? messages.get(error) : 'Erro de validação';
  }

  private get minError(): number {
    const error = this.control.errors[ValidationType.MIN];

    return !error || error.min;
  }

  private get minLengthError(): number {
    const error = this.control.errors[ValidationType.MIN_LENGTH];

    return !error || error.requiredLength;
  }

  private get maxError(): number {
    const error = this.control.errors[ValidationType.MAX];

    return !error || error.max;
  }

  private get maxLengthError(): number {
    const error = this.control.errors[ValidationType.MAX_LENGTH];

    return !error || error.requiredLength;
  }
}
