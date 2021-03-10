package io.github.prestacao.servico.application.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.github.prestacao.servico.application.service.exception.CampoObrigatorioException;
import io.github.prestacao.servico.application.service.exception.CampoTamanhoMaximoException;
import io.github.prestacao.servico.application.service.exception.CpfInvalidoException;
import io.github.prestacao.servico.application.service.exception.CpfJaExistenteException;
import io.github.prestacao.servico.domain.model.Cliente;
import io.github.prestacao.servico.domain.service.ClienteService;
import io.github.prestacao.servico.domain.shared.Municipio;
import io.github.prestacao.servico.domain.shared.Pais;
import io.github.prestacao.servico.domain.shared.TipoLogradouro;
import io.github.prestacao.servico.domain.shared.Uf;
import io.github.prestacao.servico.infrastructure.persistence.hibernate.repository.ClienteRepository;
import io.github.prestacao.servico.infrastructure.persistence.hibernate.repository.MunicipioRepository;
import io.github.prestacao.servico.infrastructure.persistence.hibernate.repository.PaisRepository;
import io.github.prestacao.servico.infrastructure.persistence.hibernate.repository.TipoLogradouroRepository;
import io.github.prestacao.servico.infrastructure.persistence.hibernate.repository.UfRepository;
import io.github.prestacao.servico.infrastructure.util.CpfUtil;

@Service
public class ClienteServiceImpl extends BaseServiceImpl<Cliente, ClienteRepository> implements ClienteService {

	@Autowired
	private ClienteRepository clienteRepository;
	
	@Autowired
	private TipoLogradouroRepository logradouroRepository;
	
	@Autowired
	private MunicipioRepository municipioRepository;
	
	@Autowired
	private UfRepository ufRepository;
	
	@Autowired
	private PaisRepository paisRepository;
	
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
	
	@Override
	public Cliente alternaAtivo(Long id) {
		Cliente cliente = super.buscar(id);
		cliente.setAtivo(!cliente.getAtivo());
		return super.salvar(cliente);
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
	
	public List<TipoLogradouro> listarTipoLogradouros() {
		return logradouroRepository.findAll();
	}

	public List<Municipio> listarMunicipios() {
		return municipioRepository.findAll();
	}

	public List<Uf> listarUfs() {
		return ufRepository.findAll();
	}

	public List<Pais> listarPaises() {
		return paisRepository.findAll();
	}

	public List<Municipio> buscarMunicipiosPorUf(String uf) {
		return municipioRepository.findByUf(uf);
	}
}
