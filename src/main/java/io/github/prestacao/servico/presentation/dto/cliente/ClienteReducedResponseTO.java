package io.github.prestacao.servico.presentation.dto.cliente;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClienteReducedResponseTO {
	
	private Long id;

    private String nome;
    
    private String cpf;
    
    private LocalDateTime dataCadastro;
    
    private Boolean ativo;
    
    
    @Override
    public String toString() {
        return String.format("ClienteReducedResponseTO [id=%s, descricao=%s, ativo=%s]", id, nome, cpf, dataCadastro, ativo);
    }

}
