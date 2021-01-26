package io.github.prestacao.servico.application.handler;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import io.github.prestacao.servico.application.service.exception.CampoObrigatorioException;
import io.github.prestacao.servico.application.service.exception.CampoTamanhoMaximoException;

@ControllerAdvice
@Order(Ordered.HIGHEST_PRECEDENCE)
public class ValidacaoExceptionHandler extends BaseExceptionHandler {

    @ExceptionHandler({ CampoObrigatorioException.class })
    public ResponseEntity<Object> handleEsteCampoObrigatorioException(CampoObrigatorioException exception, WebRequest request) {
        Object[] args = { exception.getMessage() };
        return handleException(exception, HttpStatus.BAD_REQUEST, request, "validacao.campo-obrigatorio", args);
    }
    
    @ExceptionHandler({ CampoTamanhoMaximoException.class })
    public ResponseEntity<Object> handleCampoTamanhoMaximoException(CampoTamanhoMaximoException exception, WebRequest request) {
        return handleException(exception, HttpStatus.BAD_REQUEST, request, "validacao.campo-tamanho-maximo", exception.getArgs());
    }
    
}
