package io.github.prestacao.servico.application.handler;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import io.github.prestacao.servico.infrastructure.service.MessageService;
import io.github.prestacao.servico.presentation.ResponseTO;

public class BaseExceptionHandler extends ResponseEntityExceptionHandler {

	@Autowired
	private MessageService messageService;

	@Override
	protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException exception,
			HttpHeaders headers, HttpStatus status, WebRequest request) {
		ResponseTO<List<String>> response = new ResponseTO<>();
		response.setErrors(getErrors(exception.getBindingResult()));
		logger.error(exception.getMessage(), exception);
		return handleExceptionInternal(exception, response, headers, HttpStatus.BAD_REQUEST, request);
	}

	protected ResponseEntity<Object> handleException(Exception exception, HttpStatus status, WebRequest request,
			String key) {
		return handleException(exception, status, request, key, null);
	}

	protected ResponseEntity<Object> handleException(Exception exception, HttpStatus status, WebRequest request,
			String key, Object[] args) {
		ResponseTO<List<String>> response = new ResponseTO<>(Arrays.asList((messageService.getMessage(key, args))));
		logger.error(exception.getMessage(), exception);
		return handleExceptionInternal(exception, response, new HttpHeaders(), status, request);
	}

	protected List<String> getErrors(BindingResult bindingResult) {
		List<String> errors = new ArrayList<>();
		bindingResult.getFieldErrors().forEach(e -> errors.add(messageService.getMessage(e)));

		return errors;
	}

}
