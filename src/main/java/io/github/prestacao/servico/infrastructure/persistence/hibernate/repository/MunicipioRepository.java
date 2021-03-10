package io.github.prestacao.servico.infrastructure.persistence.hibernate.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import io.github.prestacao.servico.domain.shared.Municipio;

@Repository
public interface MunicipioRepository extends BaseRepository<Municipio> {
	
	public List<Municipio> findByUf(String uf);

}
