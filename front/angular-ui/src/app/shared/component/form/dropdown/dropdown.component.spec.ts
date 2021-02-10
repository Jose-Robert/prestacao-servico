import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

import { DropdownModule } from 'primeng/components/dropdown/dropdown';

import { AutoFocusDirective } from '../../../directive/auto-focus.directive';
import { ValidationComponent } from '../../validation/validation.component';
import { DropdownComponent } from './dropdown.component';

describe('Shared: Component: DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        DropdownModule
      ],
      declarations: [
        AutoFocusDirective,
        DropdownComponent,
        ValidationComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;

    component.control = new FormControl();
    component.label = 'Opção';
    component.inputId = 'opcao';

    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });
});
