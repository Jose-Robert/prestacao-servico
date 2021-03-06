package io.github.prestacao.servico.presentation.dto.cliente;

import java.io.Serializable;

import io.github.prestacao.servico.domain.shared.Endereco;
import io.github.prestacao.servico.infrastructure.annotation.converter.IdReference;
import lombok.Data;

@Data
public class ClienteRequestTO implements Serializable {

	private static final long serialVersionUID = -5230486751798529175L;

	private String nome;

	private String cpf;
	
	private boolean ativo;
	
	@IdReference(target = Endereco.class, property = "endereco")
	private Long endereco;

}
