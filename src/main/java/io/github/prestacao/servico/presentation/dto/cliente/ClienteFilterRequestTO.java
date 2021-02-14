package io.github.prestacao.servico.presentation.dto.cliente;

import java.io.Serializable;
import java.time.LocalDateTime;

import io.github.prestacao.servico.domain.model.Cliente;
import io.github.prestacao.servico.infrastructure.annotation.specification.SpecificationEntity;
import io.github.prestacao.servico.infrastructure.annotation.specification.SpecificationField;
import io.github.prestacao.servico.infrastructure.persistence.hibernate.specification.SpecificationOperation;
import lombok.Getter;
import lombok.Setter;

@SpecificationEntity(Cliente.class)
@Getter
@Setter
public class ClienteFilterRequestTO implements Serializable {

	private static final long serialVersionUID = 6260088059566028993L;

	@SpecificationField(property = "id")
	private Long id;

	@SpecificationField(property = "nome", operation = SpecificationOperation.LIKE_IGNORE_CASE)
	private String nome;

	@SpecificationField(property = "cpf", operation = SpecificationOperation.LIKE_IGNORE_CASE)
	private String cpf;
	
	@SpecificationField(property = "dataCriacao")
	private LocalDateTime dataCriacao;

	@SpecificationField(property = "ativo")
	private boolean ativo;

	public ClienteFilterRequestTO() {
		super();
	}

}