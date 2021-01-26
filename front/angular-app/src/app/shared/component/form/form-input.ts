import { Input, Directive } from '@angular/core';
import { FormControl } from '@angular/forms';


export enum Orientation {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical'
}

@Directive()
export class FormInput {

  @Input() control: FormControl;
  @Input() inputId: string;
  @Input() label: string;
  @Input() orientation = Orientation.VERTICAL;
  @Input() name: string;
  @Input() required = false;
  @Input() validation = true;
  @Input() submitted: boolean;
}
