package io.github.prestacao.servico.presentation.dto.shared;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EnderecoResponseTO implements Serializable {
	
	private static final long serialVersionUID = 3618665410110254563L;

	private Long id;

	private String cep;

	private TipoLogradouroResponseTO tipoLogradouro;

	private String rua;

	private String numero;

	private String complemento;

	private String bairro;

	private MunicipioResponseTO municipio;

	private UfResponseTO uf;

	private PaisResponseTO pais;

}
