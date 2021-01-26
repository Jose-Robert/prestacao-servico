package io.github.prestacao.servico.presentation.dto.shared;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EnumResponseTO implements Serializable {

	private static final long serialVersionUID = -14517743322944927L;

	private Integer id;
	private String name;
	private String descricao;

	public EnumResponseTO() {
	}

	public EnumResponseTO(Integer id, String name, String descricao) {
		super();
		this.id = id;
		this.name = name;
		this.descricao = descricao;
	}

}