package io.github.prestacao.servico.presentation.dto.shared;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MunicipioResponseTO implements Serializable {

	private static final long serialVersionUID = 4163356938851913726L;

	private Long id;

	private String codigoIbge;

	private String nome;

	private String uf;
}
