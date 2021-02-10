import { Component, Input, Output, EventEmitter } from '@angular/core';

import { FormInput } from '../form-input';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html'
})
export class ChipsComponent extends FormInput {

  @Input() autoFocus = false;
  @Input() textArea = false;
  @Input() blockCopyPaste = false;
  @Input() keyFilter: RegExp | string = /.*/;
  @Input() verticalDivClass = 'ui-sm-12 ui-md-4 ui-lg-3';
  @Input() verticalLabelNgClass = '{ \'ui-g-12 control-label\': true, \'required\': required }';

  @Output() blured: EventEmitter<any> = new EventEmitter();
  @Output() changed: EventEmitter<any> = new EventEmitter();
  @Output() clicked: EventEmitter<any> = new EventEmitter();
  @Output() focused: EventEmitter<any> = new EventEmitter();
}
