package io.github.prestacao.servico.presentation.dto.servico;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;

import io.github.prestacao.servico.presentation.dto.cliente.ClienteResponseTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ServicoPrestadoResponseTO implements Serializable {
	
	private static final long serialVersionUID = -2716581643437577888L;

	private Long id;
	
	private String descricao;	
	
	private BigDecimal valor;
	
	private LocalDate dataServico;
	
	private ClienteResponseTO cliente;
	
	private boolean ativo;

}
