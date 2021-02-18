package io.github.prestacao.servico.presentation.dto.servico;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ServicoPrestadoReducedResponseTO implements Serializable {

	private static final long serialVersionUID = -4279449532669085845L;

	private Long id;

	private String descricao;

	@JsonProperty(value = "cpf")
    protected String clienteCpf;
	
	private BigDecimal valor;
	
	private LocalDate dataServicoPrestado;
	
	private boolean ativo;

}
