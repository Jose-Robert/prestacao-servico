import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/components/common/messageservice';

import { ToastService } from '@app/shared/service/toast.service';
import { ErrorHandlerService } from './error-handler.service';

describe('Core: ErrorHandlerService', () => {
  let service: ErrorHandlerService;
  let toastService: ToastService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        ErrorHandlerService,
        ToastService,
        MessageService
      ]
    });
  });

  beforeEach(inject([ErrorHandlerService], (errorHandlerService: ErrorHandlerService) => {
    service = errorHandlerService;
    toastService = TestBed.get(ToastService);
    router = TestBed.get(Router);
  }));

  beforeEach(() => {
    spyOn(toastService, 'addError');
    spyOn(console, 'error');
    spyOn(router, 'navigate');
  });

  it('deve criar e injetar o serviço', () => {
    expect(service).toBeTruthy();
  });

  it('deve imprimir duas mensagens de erro HTTP', () => {
    const httpErrorResponse = new HttpErrorResponse({
      error: {
        errors: ['Erro 1', 'Erro 2']
      },
      headers: null,
      status: 400,
      statusText: null,
      url: null
    });

    service.handleHttpErrorResponse(httpErrorResponse);

    expect(toastService.addError).toHaveBeenCalledTimes(2);
  });

  it('deve imprimir uma mensagem de acesso negado do OAuth2', () => {
    const httpErrorResponse = new HttpErrorResponse({
      error: {
        error: 'access_denied'
      },
      headers: null,
      status: 400,
      statusText: null,
      url: null
    });

    service.handleHttpErrorResponse(httpErrorResponse);

    expect(toastService.addError).toHaveBeenCalledWith('Erro', 'Acesso negado');
  });

  it('deve redirecionar para a tela de Login se o status HTTP for 401', () => {
    const httpErrorResponse = new HttpErrorResponse({
      error: {
        error: 'unauthorized'
      },
      headers: null,
      status: 401,
      statusText: null,
      url: null
    });

    service.handleHttpErrorResponse(httpErrorResponse);

    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('deve imprimir a mensagem de erro HTTP genérica', () => {
    const httpErrorResponse = new HttpErrorResponse({
      error: {},
      headers: null,
      status: 400,
      statusText: null,
      url: null
    });

    service.handleHttpErrorResponse(httpErrorResponse);

    expect(toastService.addError).toHaveBeenCalledWith('Erro', 'Ocorreu um erro durante a solicitação');
  });

  it('deve imprimir uma mensagem de erro HTTP no console', () => {
    const httpErrorResponse = new HttpErrorResponse({
      error: {
        errors: ['Credenciais inválidas']
      },
      headers: null,
      status: 400,
      statusText: null,
      url: null
    });

    service.handleHttpErrorResponse(httpErrorResponse);

    expect(console.error).toHaveBeenCalled();
  });
});
