package io.github.prestacao.servico.application.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import io.github.prestacao.servico.domain.model.Cliente;
import io.github.prestacao.servico.domain.service.ClienteService;
import io.github.prestacao.servico.infrastructure.service.ConverterService;
import io.github.prestacao.servico.infrastructure.service.ResponseServiceImpl;
import io.github.prestacao.servico.presentation.ResponseTO;
import io.github.prestacao.servico.presentation.dto.cliente.ClienteRequestTO;
import io.github.prestacao.servico.presentation.dto.cliente.ClienteResponseTO;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

	@Autowired
	private ClienteService clienteService;
	
	@Autowired
	private ResponseServiceImpl responseService;
	
	@Autowired
	private ConverterService converterService;
	
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

}
