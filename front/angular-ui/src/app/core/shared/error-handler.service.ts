import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { isObject } from 'util';

import { Route } from '@app/shared/enum/route.enum';
import { ToastService } from '@app/shared/service/toast.service';
import { environment } from '@env/environment';
import { HttpStatus } from '@app/shared/enum/http-status.enum';

@Injectable()
export class ErrorHandlerService {

  // private readonly oauth2ErrorMessages: Map<OAuth2Error, string> = new Map([
  //   [OAuth2Error.INVALID_REQUEST, 'Requisição inválida'],
  //   [OAuth2Error.INVALID_CLIENT, 'Cliente inválido'],
  //   [OAuth2Error.INVALID_GRANT, 'Credenciais inválidas'],
  //   [OAuth2Error.INVALID_SCOPE, 'Escopo inválido'],
  //   [OAuth2Error.INVALID_TOKEN, 'Token inválido'],
  //   [OAuth2Error.INSUFFICIENT_SCOPE, 'Escopo insuficiente'],
  //   [OAuth2Error.UNAUTHORIZED, 'Acesso não autorizado'],
  //   [OAuth2Error.UNAUTHORIZED_CLIENT, 'Cliente não autorizado'],
  //   [OAuth2Error.UNSUPPORTED_GRANT_TYPE, 'Tipo de credenciais não suportado'],
  //   [OAuth2Error.UNSUPPORTED_RESPONSE_TYPE, 'Tipo de resposta não suportado'],
  //   [OAuth2Error.ACCESS_DENIED, 'Acesso negado'],
  // ]);

  constructor(
    private toastService: ToastService,
    private router: Router
  ) { }

  handleHttpErrorResponse(httpErrorResponse: HttpErrorResponse): void {
    if (HttpStatus.UNAUTHORIZED === httpErrorResponse.status) {
      this.printMessages(httpErrorResponse);
      this.router.navigate([`/${Route.LOGIN}`]);
      return;
    }

    if(HttpStatus.FORBIDDEN === httpErrorResponse.status) {
      this.router.navigate([`/${Route.HOME}`]);
      return;
    }

    if (!environment.production) {
      console.error(`Erro ${httpErrorResponse.status} - ${httpErrorResponse.message}`, httpErrorResponse);
    }

    this.printMessages(httpErrorResponse);
  }

  private printMessages(httpErrorResponse: HttpErrorResponse): void {
    const errors: string[] = httpErrorResponse.error.errors;

    if (!errors) {
      this.printCustomMessage(httpErrorResponse);
      return;
    }

    errors.forEach(error => this.toastService.addError('Erro', error));
  }

  private printCustomMessage(httpErrorResponse: HttpErrorResponse): void {
    const error = httpErrorResponse.error;

    if (this.isOAuth2Error(error)) {
      const message = error.error_description;
      this.toastService.addError(message);
      return;

    }

    this.printGenericMessage();
  }

  private printGenericMessage(): void {
    this.toastService.addError('Erro', 'Ocorreu um erro durante a solicitação');
  }

  private isOAuth2Error(error: any): boolean {
    return isObject(error) && Object.keys(error).includes('error');
  }
}
