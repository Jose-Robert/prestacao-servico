package io.github.prestacao.servico.infrastructure.persistence.hibernate.repository;

import org.springframework.stereotype.Repository;

import io.github.prestacao.servico.domain.model.Cliente;

@Repository
public interface ClienteRepository extends BaseRepository<Cliente> {

	boolean existsByCpf(String cpf);
	
}
