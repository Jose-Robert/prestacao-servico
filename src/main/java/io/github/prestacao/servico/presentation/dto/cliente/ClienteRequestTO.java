package io.github.prestacao.servico.presentation.dto.cliente;

import java.io.Serializable;

import lombok.Data;

@Data
public class ClienteRequestTO implements Serializable {

	private static final long serialVersionUID = -5230486751798529175L;

	private String nome;

	private String cpf;

}