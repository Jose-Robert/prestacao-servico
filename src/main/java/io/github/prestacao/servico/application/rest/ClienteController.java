package io.github.prestacao.servico.application.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import io.github.prestacao.servico.application.service.impl.ClienteServiceImpl;
import io.github.prestacao.servico.domain.model.Cliente;
import io.github.prestacao.servico.domain.service.ClienteService;
import io.github.prestacao.servico.infrastructure.persistence.hibernate.specification.SpecificationFactory;
import io.github.prestacao.servico.infrastructure.service.ConverterService;
import io.github.prestacao.servico.infrastructure.service.ResponseServiceImpl;
import io.github.prestacao.servico.presentation.ResponseTO;
import io.github.prestacao.servico.presentation.dto.cliente.ClienteFilterRequestTO;
import io.github.prestacao.servico.presentation.dto.cliente.ClienteReducedResponseTO;
import io.github.prestacao.servico.presentation.dto.cliente.ClienteRequestTO;
import io.github.prestacao.servico.presentation.dto.cliente.ClienteResponseTO;

@RestController
@RequestMapping("/clientes")
public class ClienteController {

	@Autowired
	private ClienteService clienteService;

	@Autowired
	private ClienteServiceImpl service;

	@Autowired
	private ResponseServiceImpl responseService;

	@Autowired
	private ConverterService converterService;

	@Autowired
	private SpecificationFactory<Cliente> specificationFactory;
	
	@GetMapping
	public ResponseEntity<ResponseTO<Page<ClienteReducedResponseTO>>> listar(ClienteFilterRequestTO filterRequestTO,
			Pageable pageable) {

		Specification<Cliente> specification = specificationFactory.create(filterRequestTO);
        Page<Cliente> page = service.listar(specification, pageable);
        Page<ClienteReducedResponseTO> responseTOPage = converterService.convert(page,
        		ClienteReducedResponseTO.class);
		return responseService.ok(responseTOPage);
	}
	
	@PostMapping
	public ResponseEntity<ResponseTO<ClienteResponseTO>> salvar(@RequestBody ClienteRequestTO requestTO) {
		Cliente cliente = converterService.convert(requestTO, Cliente.class);
		cliente = clienteService.salvar(cliente);
		ClienteResponseTO responseTO = converterService.convert(cliente, ClienteResponseTO.class);
		return responseService.created(responseTO);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<ResponseTO<ClienteResponseTO>> buscar(@PathVariable Long id) {
		Cliente cliente = clienteService.buscar(id);
		ClienteResponseTO responseTO = converterService.convert(cliente, ClienteResponseTO.class);
		return responseService.ok(responseTO);
	}
	
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void remover(@PathVariable Long id) {
		clienteService.remover(id);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<ResponseTO<ClienteResponseTO>> atualizar(@PathVariable Long id, @RequestBody ClienteRequestTO requestTO) {
		Cliente cliente = converterService.convert(requestTO, Cliente.class);
		Cliente clienteSaved = clienteService.atualizar(id, cliente);
		ClienteResponseTO responseTO = converterService.convert(clienteSaved, ClienteResponseTO.class);
		return responseService.created(responseTO);
	}

	@PatchMapping("/{id}/ativo")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void alternaAtivo(@PathVariable Long id) {
		clienteService.alternaAtivo(id);
	}

}
