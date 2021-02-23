package io.github.prestacao.servico.domain.shared;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Entity
@Table(name = "ENDERECO")
public class Endereco extends BaseEntity {
	
	private static final long serialVersionUID = 4883930923017040021L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "CDENDERECO")
	private Long id;
	
	@Column(name = "CEP", length = 8)
	private String cep;

	@ManyToOne
    @JoinColumn(name = "IDTIPOLOGRADOURO", referencedColumnName = "CDTIPOLOGRADOURO")
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
    @JoinColumn(name = "IDMUNICIPIO", referencedColumnName = "CDMUNICIPIO")
	private Municipio municipio;
	
	@ManyToOne
    @JoinColumn(name = "IDUF", referencedColumnName = "CDUF")
	private Uf uf;

	@ManyToOne
    @JoinColumn(name = "IDPAIS", referencedColumnName = "CDPAIS")
	private Pais pais;
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = super.hashCode();
		result = prime * result + ((super.getId() == null) ? 0 : super.getId().hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (!super.equals(obj))
			return false;
		if (getClass() != obj.getClass())
			return false;
		Endereco other = (Endereco) obj;
		if (super.getId() == null) {
			if (other.getId() != null)
				return false;
		} else if (!id.equals(other.getId()))
			return false;
		return true;
	}
	
}
