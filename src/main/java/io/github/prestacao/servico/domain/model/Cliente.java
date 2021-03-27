package io.github.prestacao.servico.domain.model;

import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import io.github.prestacao.servico.domain.shared.BaseEntity;
import io.github.prestacao.servico.domain.shared.Endereco;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Entity
@Table(name = "CLIENTE")
public class Cliente extends BaseEntity {

	private static final long serialVersionUID = 3812035399807781219L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "CDCLIENTE")
	private Long id;

	@Column(nullable = false, name = "NOME")
	private String nome;

	@Column(nullable = false, length = 11, name = "CPF")
	private String cpf;

	@Embedded
	private Endereco endereco;

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
		Cliente other = (Cliente) obj;
		if (super.getId() == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
}
