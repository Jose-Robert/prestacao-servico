import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { SelectItem } from 'primeng/components/common/selectitem';
import { MultiSelectItem } from 'primeng/components/multiselect/multiselect';

import { FormInput } from '../form-input';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html'
})
export class MultiSelectComponent extends FormInput {

  @Input() autoFocus = false;
  @Input() options: MultiSelectItem[];
  @Input() displaySelectedLabel;

  @Output() blured: EventEmitter<any> = new EventEmitter();
  @Output() changed: EventEmitter<any> = new EventEmitter();
  @Output() focused: EventEmitter<any> = new EventEmitter();
  @Output() panelHided: EventEmitter<any> = new EventEmitter();
  @Output() panelShowed: EventEmitter<any> = new EventEmitter();
}
