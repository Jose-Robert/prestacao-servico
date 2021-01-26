package io.github.prestacao.servico.application.service.impl;

import org.springframework.stereotype.Service;

import io.github.prestacao.servico.application.service.exception.CampoObrigatorioException;
import io.github.prestacao.servico.application.service.exception.CampoTamanhoMaximoException;
import io.github.prestacao.servico.application.service.exception.CpfInvalidoException;
import io.github.prestacao.servico.application.service.exception.CpfJaExistenteException;
import io.github.prestacao.servico.domain.model.Cliente;
import io.github.prestacao.servico.domain.service.ClienteService;
import io.github.prestacao.servico.infrastructure.persistence.hibernate.repository.ClienteRepository;
import io.github.prestacao.servico.infrastructure.util.CpfUtil;

@Service
public class ClienteServiceImpl extends BaseServiceImpl<Cliente, ClienteRepository> implements ClienteService {

	private ClienteRepository clienteRepository;

	public ClienteServiceImpl(ClienteRepository clienteRepository) {
		this.clienteRepository = clienteRepository;
	}

	@Override
	public Cliente salvar(Cliente cliente) {
		validaObrigatoriedadeDosCampos(cliente);
		validaCpf(cliente.getCpf());
		cliente.setCpf(CpfUtil.remove(cliente.getCpf()));
		validaDuplicidade(cliente);
		return super.salvar(cliente);
	}

	@Override
	public Cliente atualizar(Long id, Cliente cliente) {
		validaObrigatoriedadeDosCampos(cliente);
		validaCpf(cliente.getCpf());
		cliente.setCpf(CpfUtil.remove(cliente.getCpf()));
		return super.atualizar(id, cliente);
	}

	private void validaObrigatoriedadeDosCampos(Cliente cliente) {
		validaObrigatoriedadeDoCpf(cliente);
	}

	private void validaObrigatoriedadeDoCpf(Cliente cliente) {
		if (cliente.getCpf() == null && cliente.getCpf().isEmpty()) {
			throw new CampoObrigatorioException("CPF");
		}

		if (cliente.getCpf().length() > 14) {
			throw new CampoTamanhoMaximoException("CPF", "14");
		}

	}

	private void validaCpf(String cpf) {
		if (!CpfUtil.isValid(cpf)) {
			throw new CpfInvalidoException();
		}
	}

	private boolean cpfJaExistente(String cpf) {
		return clienteRepository.existsByCpf(cpf);
	}

	private void validaDuplicidade(Cliente cliente) {
		if (cpfJaExistente(cliente.getCpf())) {
			throw new CpfJaExistenteException();
		}
	}
}
