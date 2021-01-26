package io.github.prestacao.servico.infrastructure.factory;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.stereotype.Component;

@Component
public class RepositoryFactory {

    @Autowired
    private EntityManager entityManager;

    public <T> SimpleJpaRepository<T, Long> create(Class<T> domainClass) {
        return new SimpleJpaRepository<>(domainClass, entityManager);
    }

}