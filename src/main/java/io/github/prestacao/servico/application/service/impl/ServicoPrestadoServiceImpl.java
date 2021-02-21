package io.github.prestacao.servico.application.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import io.github.prestacao.servico.application.service.exception.CampoObrigatorioException;
import io.github.prestacao.servico.domain.model.Cliente;
import io.github.prestacao.servico.domain.model.ServicoPrestado;
import io.github.prestacao.servico.domain.service.ClienteService;
import io.github.prestacao.servico.domain.service.ServicoPrestadoService;
import io.github.prestacao.servico.infrastructure.persistence.hibernate.repository.ServicoPrestadoRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ServicoPrestadoServiceImpl extends BaseServiceImpl<ServicoPrestado, ServicoPrestadoRepository> 
	implements ServicoPrestadoService {
	
	private final ClienteService clienteService;
	
	@Override
	public ServicoPrestado salvar(ServicoPrestado servicoPrestado) {
		this.validaCamposObrigatorios(servicoPrestado);
		return super.salvar(servicoPrestado);
	}
	
	@Override
	public ServicoPrestado atualizar(Long id, ServicoPrestado servicoPrestado) {
		this.validaCamposObrigatorios(servicoPrestado);
		return super.atualizar(id, servicoPrestado);
	}

	private void validaCamposObrigatorios(ServicoPrestado servicoPrestado) {
		
		if (servicoPrestado.getDescricao() == null) {
			throw new CampoObrigatorioException("Descrição");
		}

		if (servicoPrestado.getValor() == null) {
			throw new CampoObrigatorioException("Valor");
		}

		if (servicoPrestado.getDataServico() == null) {
			throw new CampoObrigatorioException("Data do Serviço");
		}
	}
	
	public List<Cliente> listarClientes() {
		return clienteService.listar();
	}
}
