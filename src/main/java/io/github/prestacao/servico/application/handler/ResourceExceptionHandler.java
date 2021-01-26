package io.github.prestacao.servico.application.handler;

import java.text.MessageFormat;
import java.util.List;
import java.util.stream.Collectors;

import javax.validation.ConstraintViolationException;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import io.github.prestacao.servico.application.service.exception.RecursoErroExclusaoException;
import io.github.prestacao.servico.application.service.exception.RecursoObjetoNuloException;
import io.github.prestacao.servico.infrastructure.service.exception.InformationNotFoundException;
import io.github.prestacao.servico.presentation.ResponseTO;


@ControllerAdvice
public class ResourceExceptionHandler extends BaseExceptionHandler {


    @ExceptionHandler({ RuntimeException.class })
    public ResponseEntity<Object> handleRuntimeException(RuntimeException exception, WebRequest request) {
        return handleException(exception, HttpStatus.BAD_REQUEST, request, "resource.invalid-operation");
    }

    @ExceptionHandler({ InformationNotFoundException.class })
    public ResponseEntity<Object> handleInformationNotFoundException(InformationNotFoundException exception,
            WebRequest request) {
        return handleException(exception, HttpStatus.NOT_FOUND, request, "resource.information-not-found");
    }
    
    @ExceptionHandler({ RecursoObjetoNuloException.class })
    public ResponseEntity<Object> handleRecursoObjetoNuloException(RecursoObjetoNuloException exception,
            WebRequest request) {
        return handleException(exception, HttpStatus.NOT_FOUND, request, "resource.null-object");
    }

    @ExceptionHandler({ RecursoErroExclusaoException.class })
    public ResponseEntity<Object> handleRecursoNaoSeuException(RecursoErroExclusaoException exception, WebRequest request) {
        return handleException(exception, HttpStatus.BAD_REQUEST, request, "error.exclusao.generico");
    }

    @ExceptionHandler({ DuplicateKeyException.class })
    public ResponseEntity<Object> handleDuplicateKeyException(DuplicateKeyException exception, WebRequest request) {
        return handleException(exception, HttpStatus.BAD_REQUEST, request, exception.getMessage());
    }

    @ExceptionHandler({ DataIntegrityViolationException.class })
    public ResponseEntity<Object> handleDataIntegrityViolationException(DataIntegrityViolationException exception,
            WebRequest request) {
        return handleException(exception, HttpStatus.BAD_REQUEST, request, "resource.invalid-operation");
    }

    @ExceptionHandler({ ConstraintViolationException.class })
    public ResponseEntity<Object> handleConstraintViolationException(ConstraintViolationException exception,
            WebRequest request) {
        List<String> errors = exception.getConstraintViolations().stream()
                .map(e -> MessageFormat.format("{0}: ".concat(e.getMessage()), e.getPropertyPath()))
                .collect(Collectors.toList());
        ResponseTO<String> responseTO = new ResponseTO<>(errors);
        logger.error(exception.getMessage(), exception);
        return handleExceptionInternal(exception, responseTO, new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }

}