package io.github.prestacao.servico.presentation.dto.servico;

import java.io.Serializable;
import java.time.LocalDate;

import io.github.prestacao.servico.domain.model.ServicoPrestado;
import io.github.prestacao.servico.infrastructure.annotation.specification.SpecificationEntity;
import io.github.prestacao.servico.infrastructure.annotation.specification.SpecificationField;
import io.github.prestacao.servico.infrastructure.persistence.hibernate.specification.SpecificationOperation;
import lombok.Getter;
import lombok.Setter;

@SpecificationEntity(ServicoPrestado.class)
@Getter
@Setter
public class ServicoPrestadoFilterResquestTO implements Serializable {

	private static final long serialVersionUID = -8332764158672025682L;

	@SpecificationField(property = "id")
	private Long id;

	@SpecificationField(property = "descricao", operation = SpecificationOperation.LIKE_IGNORE_CASE)
	private String descricao;

	@SpecificationField(property = "cliente.nome", operation = SpecificationOperation.LIKE_IGNORE_CASE)
	private String clienteNome;
	
	@SpecificationField(property = "dataServico")
	private LocalDate dataServico;

	@SpecificationField(property = "ativo")
	private boolean ativo;
	
	public ServicoPrestadoFilterResquestTO() {
		super();
	}
}
