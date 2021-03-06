package io.github.prestacao.servico.presentation.dto.shared;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UfResponseTO implements Serializable {

	private static final long serialVersionUID = 50873285435530885L;
	
	private Long id;
	
	private Integer codigoUf;
	
	private String nome;
	
	private String sigla;
	
	private Integer regiao;
}
