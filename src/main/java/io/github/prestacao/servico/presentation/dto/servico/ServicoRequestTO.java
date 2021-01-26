package io.github.prestacao.servico.presentation.dto.servico;

import java.io.Serializable;
import java.math.BigDecimal;

import io.github.prestacao.servico.presentation.dto.cliente.ClienteRequestTO;
import lombok.Data;

@Data
public class ServicoRequestTO implements Serializable {
	
	private static final long serialVersionUID = -5290649465754999681L;
	
	private Long id;
	
	private String descricao;
	
	private ClienteRequestTO cliente;
	
	private BigDecimal valor;
}
