package io.github.prestacao.servico.application.service.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CampoTamanhoMaximoException extends RuntimeException {

	private static final long serialVersionUID = -2419164056224622081L;

	private final String nome;
	private final String tamanho;

	public CampoTamanhoMaximoException(String nome, String tamanho) {
		this.nome = nome;
		this.tamanho = tamanho;
	}

	public Object[] getArgs() {
		return new Object[] { nome, tamanho };
	}
}