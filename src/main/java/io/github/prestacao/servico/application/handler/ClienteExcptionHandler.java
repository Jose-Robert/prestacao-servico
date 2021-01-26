package io.github.prestacao.servico.application.handler;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import io.github.prestacao.servico.application.service.exception.CpfInvalidoException;
import io.github.prestacao.servico.application.service.exception.CpfJaExistenteException;

@ControllerAdvice
@Order(Ordered.HIGHEST_PRECEDENCE)
public class ClienteExcptionHandler extends BaseExceptionHandler {
	
	@ExceptionHandler({ CpfInvalidoException.class })
	public ResponseEntity<Object> handleCpfInvalidoException(CpfInvalidoException exception, WebRequest request) {
		return handleException(exception, HttpStatus.BAD_REQUEST, request, "cliente.cpf-invalido");
	}
	
	@ExceptionHandler({ CpfJaExistenteException.class })
	public ResponseEntity<Object> handleCpfJaExistenteException(CpfJaExistenteException exception, WebRequest request) {
		return handleException(exception, HttpStatus.BAD_REQUEST, request, "cliente.cpf-existente");
	}
}
