package io.github.prestacao.servico.presentation.dto.shared;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TipoLogradouroResponseTO implements Serializable {

	private static final long serialVersionUID = -5338009359080128839L;
	
	private Long id;

	private String descricao;

	private String codigoTipoLogradouro;
}
