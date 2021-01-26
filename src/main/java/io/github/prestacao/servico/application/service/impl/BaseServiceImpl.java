package io.github.prestacao.servico.application.service.impl;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.glassfish.jersey.internal.guava.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.transaction.annotation.Transactional;

import io.github.prestacao.servico.application.service.exception.RecursoErroExclusaoException;
import io.github.prestacao.servico.application.service.exception.RecursoObjetoNuloException;
import io.github.prestacao.servico.domain.shared.BaseEntity;
import io.github.prestacao.servico.infrastructure.persistence.hibernate.repository.BaseRepository;
import io.github.prestacao.servico.infrastructure.util.BeanUtils;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public abstract class BaseServiceImpl<T extends BaseEntity, R extends BaseRepository<T>> {

	@Autowired
	protected R repository;

	@Transactional
	public T salvar(T entidade) {
		try {
			validaNulo(entidade);
		} catch (Exception e) {
			log.error(e.getMessage());
			throw e;
		}
		return getRepository().save(entidade);
	}

	@Transactional
	public T atualizar(Long id, T entidade) {
		validaNulo(entidade);
		T entidadeSalva = copiarAlterados(id, entidade);

		return getRepository().save(entidadeSalva);
	}

	protected T copiarAlterados(Long id, T entidade) {
		T savedEntity = buscar(id);
		BeanUtils.copyProperties(entidade, savedEntity);
		return savedEntity;
	}

	public Long contar() {
		return repository.count();
	}

	public List<T> listar() {
		return Lists.newArrayList(repository.findAll());
	}

	@Transactional(readOnly = true)
	public Page<T> listar(Specification<T> specification, Pageable pageable) {
		return repository.findAll(specification, pageable);
	}

	@Transactional(readOnly = true)
	public List<T> listar(Specification<T> specification) {
		return repository.findAll(specification);
	}

	public T buscar(Long id) {
		Optional<T> retorno = repository.findById(id);
		if (retorno.isPresent()) {
			return retorno.get();
		}
		return null;
	}

	@Transactional
	public T alternaAtivo(Long id) {
		T entity = buscar(id);
		entity.alternarAtivo();

		return atualizar(id, entity);
	}

	public boolean existe(Long id) {
		return !Objects.isNull(id) && repository.existsById(id);
	}

	@Transactional(rollbackFor = Throwable.class)
	public void remover(Long id) {
		try {
			repository.deleteById(id);
		} catch (Exception e) {
			throw new RecursoErroExclusaoException();
		}
	}

	@Transactional(rollbackFor = Throwable.class)
	public void removerTodos() {
		repository.deleteAll();
	}

	protected void validaNulo(T entidade) {
		if (entidade == null) {
			throw new RecursoObjetoNuloException();
		}
	}

	public R getRepository() {
		return repository;
	}

}
