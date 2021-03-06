package io.github.prestacao.servico.presentation.dto.shared;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaisResponseTO implements Serializable {

	private static final long serialVersionUID = 3770890371311216320L;
	
	private Long id;
	
	private String nome;
	
	private String nomePt;
	
	private String sigla;
	
	private Integer bacen;

}
