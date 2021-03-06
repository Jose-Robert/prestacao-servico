package io.github.prestacao.servico.presentation.dto.cliente;

import java.io.Serializable;
import java.time.LocalDateTime;

import io.github.prestacao.servico.presentation.dto.shared.EnderecoResponseTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClienteResponseTO implements Serializable {

	private static final long serialVersionUID = -5230486751798529175L;

	private Long id;

	private String nome;

	private String cpf;
	
	private LocalDateTime dataCriacao;
	
	private boolean ativo;
	
	private EnderecoResponseTO endereco;

}
