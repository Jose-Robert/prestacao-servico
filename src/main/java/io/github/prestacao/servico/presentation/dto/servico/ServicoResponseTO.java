package io.github.prestacao.servico.presentation.dto.servico;

import java.io.Serializable;
import java.math.BigDecimal;

import io.github.prestacao.servico.presentation.dto.cliente.ClienteRequestTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ServicoResponseTO implements Serializable {
	
	private static final long serialVersionUID = -2716581643437577888L;

	private Long id;
	
	private String descricao;
	
	private ClienteRequestTO cliente;
	
	private BigDecimal valor;

}