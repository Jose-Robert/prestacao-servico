import { Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { StringUtils } from '../../util/string-utils';

export enum Orientation {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical'
}

export class FormInput {

  @Input() control: FormControl;
  @Input() inputId: string;
  @Input() label: string;
  @Input() orientation = Orientation.VERTICAL;
  @Input() name: string;
  @Input() required = false;
  @Input() validation = true;
  @Input() submitted: boolean;
  @Input() verticalDivClass = 'ui-sm-12 ui-md-4 ui-lg-3';
}
