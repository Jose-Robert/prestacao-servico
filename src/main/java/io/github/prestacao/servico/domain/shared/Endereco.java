package io.github.prestacao.servico.domain.shared;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Embeddable
public class Endereco implements Serializable {

	private static final long serialVersionUID = 4883930923017040021L;

	@Column(name = "CEP", length = 8)
	private String cep;

	@ManyToOne
	@JoinColumn(name = "IDTIPOLOGRADOURO")
	private TipoLogradouro tipoLogradouro;

	@Column(name = "RUA")
	private String rua;

	@Column(name = "NUMERO")
	private String numero;

	@Column(name = "COMPLEMENTO")
	private String complemento;

	@Column(name = "BAIRRO")
	private String bairro;

	@ManyToOne
	@JoinColumn(name = "IDMUNICIPIO")
	private Municipio municipio;

	@ManyToOne
	@JoinColumn(name = "IDUF")
	private Uf uf;

	@ManyToOne
	@JoinColumn(name = "IDPAIS")
	private Pais pais;

}
