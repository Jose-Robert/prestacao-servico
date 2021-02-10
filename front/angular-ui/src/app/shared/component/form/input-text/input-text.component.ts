import { Component, Input, Output, EventEmitter } from '@angular/core';

import { FormInput } from '../form-input';

export enum Type {
  EMAIL = 'email',
  TEXT = 'text'
}

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html'
})
export class InputTextComponent extends FormInput {

  @Input() autoFocus = false;
  @Input() textArea = false;
  @Input() blockCopyPaste = false;
  @Input() email = false;
  @Input() minlength: number = null;
  @Input() maxlength: number = null;
  @Input() placeholder = '';
  @Input() keyFilter: RegExp | string = /.*/;
  @Input() type = Type.TEXT;
  @Input() verticalDivClass = 'ui-sm-12 ui-md-4 ui-lg-3';
  @Input() verticalLabelNgClass = '{ \'ui-g-12 control-label\': true, \'required\': required }';

  @Output() blured: EventEmitter<any> = new EventEmitter();
  @Output() changed: EventEmitter<any> = new EventEmitter();
  @Output() clicked: EventEmitter<any> = new EventEmitter();
  @Output() focused: EventEmitter<any> = new EventEmitter();
}
