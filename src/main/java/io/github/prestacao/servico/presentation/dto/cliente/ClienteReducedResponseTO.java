package io.github.prestacao.servico.presentation.dto.cliente;

import java.io.Serializable;
import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClienteReducedResponseTO implements Serializable {
	
	private static final long serialVersionUID = 3529315043658391184L;

	private Long id;

    private String nome;
    
    private String cpf;
    
    private LocalDateTime dataCriacao;
    
    private boolean ativo;
    
    
    @Override
    public String toString() {
        return String.format("ClienteReducedResponseTO [id=%s, nome=%s, cpf=%s, ativo=%s]",
        		id, nome, cpf, ativo);
    }

}
