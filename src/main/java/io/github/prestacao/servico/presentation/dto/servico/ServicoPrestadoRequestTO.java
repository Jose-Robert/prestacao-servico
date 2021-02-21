package io.github.prestacao.servico.presentation.dto.servico;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;

import io.github.prestacao.servico.domain.model.Cliente;
import io.github.prestacao.servico.infrastructure.annotation.converter.IdReference;
import lombok.Data;

@Data
public class ServicoPrestadoRequestTO implements Serializable {
	
	private static final long serialVersionUID = -5290649465754999681L;
	
	private Long id;
	
	private String descricao;
	
	@IdReference(target = Cliente.class, property = "cliente")
	private Long cliente;
	
	private BigDecimal valor;
	
	private LocalDate dataServico;
	
	private boolean ativo;
}
