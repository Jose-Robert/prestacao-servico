package io.github.prestacao.servico.application.service.impl;

import org.springframework.stereotype.Service;

import io.github.prestacao.servico.domain.service.EnderecoService;
import io.github.prestacao.servico.domain.shared.Endereco;
import io.github.prestacao.servico.infrastructure.persistence.hibernate.repository.EnderecoRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EnderecoServiceImpl extends BaseServiceImpl<Endereco, EnderecoRepository> implements EnderecoService {


}
