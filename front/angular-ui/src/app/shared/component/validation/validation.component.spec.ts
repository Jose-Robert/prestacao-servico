import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, Validators } from '@angular/forms';

import { ValidationComponent } from './validation.component';
import { ValidationType } from './validation-type.enum';

describe('Shared: Component: ValidationComponent', () => {
  let component: ValidationComponent;
  let fixture: ComponentFixture<ValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ValidationComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve habilitar a validação se houver erro e o formulário tiver sido submetido', () => {
    component.control = new FormControl(null, Validators.required);
    component.submitted = true;

    expect(component.enableValidation()).toBe(true);
  });

  it('deve habilitar a validação se houver erro e o control tiver sido tocado', () => {
    component.control = new FormControl(null, Validators.required);
    component.control.markAsTouched();

    expect(component.enableValidation()).toBe(true);
  });

  it('não deve habilitar a validação se não houverem erros', () => {
    component.control = new FormControl();
    component.submitted = true;

    expect(component.enableValidation()).toBe(false);
  });

  it('não deve habilitar a validação se o formulário não tiver sido submetido', () => {
    component.control = new FormControl(null, Validators.required);
    component.submitted = false;

    expect(component.enableValidation()).toBe(false);
  });

  it('deve obter os nomes dos erros do control', () => {
    component.control = new FormControl(null, [Validators.required]);

    expect(component.errors).toEqual(jasmine.objectContaining(['required']));
  });

  it('deve obter uma mensagem de erro personalizada', () => {
    component.messages = [{ type: ValidationType.REQUIRED, message: 'Preenchimento obrigatório' }];

    expect(component.getMessage('required')).toEqual('Preenchimento obrigatório');
  });

  it('deve obter a mensagem de erro padrão para a validação required', () => {
    component.control = new FormControl(null, [Validators.required]);

    expect(component.getMessage('required')).toEqual('Este campo é obrigatório');
  });
});
