package io.github.prestacao.servico.application.service.exception;

import lombok.Getter;

@Getter
public class CampoObrigatorioException extends RuntimeException {

	private static final long serialVersionUID = -4792509148061511516L;

	public CampoObrigatorioException(String message) {
		super(message);
	}
}
