package io.github.prestacao.servico.presentation.dto.shared;

import java.io.Serializable;

import io.github.prestacao.servico.domain.shared.Municipio;
import io.github.prestacao.servico.domain.shared.Pais;
import io.github.prestacao.servico.domain.shared.TipoLogradouro;
import io.github.prestacao.servico.domain.shared.Uf;
import io.github.prestacao.servico.infrastructure.annotation.converter.IdReference;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EnderecoRequestTO implements Serializable {
	
	private static final long serialVersionUID = 3618665410110254563L;

	private String cep;

	@IdReference(target = TipoLogradouro.class, property = "tipoLogradouro")
	private Long tipoLogradouro;

	private String rua;

	private String numero;

	private String complemento;

	private String bairro;

	@IdReference(target = Municipio.class, property = "municipio")
	private Long municipio;

	@IdReference(target = Uf.class, property = "uf")
	private Long uf;

	@IdReference(target = Pais.class, property = "pais")
	private Long pais;
}
