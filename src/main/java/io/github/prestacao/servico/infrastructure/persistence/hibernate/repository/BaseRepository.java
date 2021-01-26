package io.github.prestacao.servico.infrastructure.persistence.hibernate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.NoRepositoryBean;

import io.github.prestacao.servico.domain.shared.BaseEntity;

/**
 * @author José Robert
 *
 * @param <T>
 * @param <ID>
 */
@NoRepositoryBean
public interface BaseRepository<T extends BaseEntity> extends JpaRepository<T, Long>, JpaSpecificationExecutor<T> {

}
