import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { KeyFilterModule } from 'primeng/components/keyfilter/keyfilter';

import { AutoFocusDirective } from '../../../directive/auto-focus.directive';
import { BlockCopyPasteDirective } from '../../../directive/block-copy-paste.directive';
import { ValidationComponent } from '../../validation/validation.component';
import { InputTextComponent } from './input-text.component';

describe('Shared: Component: InputTextComponent', () => {
  let component: InputTextComponent;
  let fixture: ComponentFixture<InputTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        InputTextModule,
        KeyFilterModule
      ],
      declarations: [
        AutoFocusDirective,
        BlockCopyPasteDirective,
        InputTextComponent,
        ValidationComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTextComponent);
    component = fixture.componentInstance;

    component.control = new FormControl();
    component.inputId = 'nome';
    component.label = 'Nome';

    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });
});
