import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

import { SpinnerModule } from 'primeng/components/spinner/spinner';

import { BlockCopyPasteDirective } from '../../../directive/block-copy-paste.directive';
import { AutoFocusDirective } from '../../../directive/auto-focus.directive';
import { ValidationComponent } from '../../validation/validation.component';
import { SpinnerComponent } from './spinner.component';

describe('Shared: Component: SpinnerComponent', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        SpinnerModule
      ],
      declarations: [
        AutoFocusDirective,
        BlockCopyPasteDirective,
        SpinnerComponent,
        ValidationComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;

    component.control = new FormControl();
    component.inputId = 'valor';
    component.label = 'Valor';

    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });
});
