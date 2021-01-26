package io.github.prestacao.servico.infrastructure.service;

import java.net.URI;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import io.github.prestacao.servico.presentation.ResponseTO;

@Service
public class ResponseServiceImpl {

	public <T> ResponseEntity<ResponseTO<T>> created(T data) {
		return ResponseEntity.status(HttpStatus.CREATED).body(new ResponseTO<T>(data));
	}

	public <T> ResponseEntity<ResponseTO<T>> created(T data, String locationURI) {
		return ResponseEntity.created(URI.create(locationURI)).body(new ResponseTO<T>(data));
	}

	public <T> ResponseEntity<ResponseTO<T>> ok(T data) {
		return ResponseEntity.ok(new ResponseTO<T>(data));
	}

	public <T> ResponseEntity<T> notFound() {
		return ResponseEntity.notFound().build();
	}

	public ResponseEntity<?> noContent() {
		return ResponseEntity.noContent().build();
	}

}
