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

import io.github.prestacao.servico.domain.model.ServicoPrestado;
import io.github.prestacao.servico.domain.service.ServicoPrestadoService;
import io.github.prestacao.servico.infrastructure.persistence.hibernate.specification.SpecificationFactory;
import io.github.prestacao.servico.infrastructure.service.ConverterService;
import io.github.prestacao.servico.infrastructure.service.ResponseServiceImpl;
import io.github.prestacao.servico.presentation.ResponseTO;
import io.github.prestacao.servico.presentation.dto.servico.ServicoPrestadoFilterResquestTO;
import io.github.prestacao.servico.presentation.dto.servico.ServicoPrestadoReducedResponseTO;
import io.github.prestacao.servico.presentation.dto.servico.ServicoPrestadoRequestTO;
import io.github.prestacao.servico.presentation.dto.servico.ServicoPrestadoResponseTO;


@RestController
@RequestMapping("/servicos-prestados")
public class ServicoPrestadoController {
	
	@Autowired
	private ServicoPrestadoService servico;
	
	@Autowired
	private ResponseServiceImpl responseService;

	@Autowired
	private ConverterService converterService;

	@Autowired
	private SpecificationFactory<ServicoPrestado> specificationFactory;
	
	@PostMapping
	public ResponseEntity<ResponseTO<ServicoPrestadoResponseTO>> salvar(@RequestBody ServicoPrestadoRequestTO requestTO) {
		ServicoPrestado servicoPrestado = converterService.convert(requestTO, ServicoPrestado.class);
		servicoPrestado = servico.salvar(servicoPrestado);
		ServicoPrestadoResponseTO responseTO = converterService.convert(servicoPrestado, ServicoPrestadoResponseTO.class);
		return responseService.created(responseTO);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<ResponseTO<ServicoPrestadoResponseTO>> buscar(@PathVariable Long id) {
		ServicoPrestado servicoPrestado = servico.buscar(id);
		ServicoPrestadoResponseTO responseTO = converterService.convert(servicoPrestado, ServicoPrestadoResponseTO.class);
		return responseService.ok(responseTO);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<ResponseTO<ServicoPrestadoResponseTO>> atualizar(@PathVariable Long id, @RequestBody ServicoPrestadoRequestTO requestTO) {
		ServicoPrestado servicoPrestado = converterService.convert(requestTO, ServicoPrestado.class);
		ServicoPrestado servicoPrestadoSaved = servico.atualizar(id, servicoPrestado);
		ServicoPrestadoResponseTO responseTO = converterService.convert(servicoPrestadoSaved, ServicoPrestadoResponseTO.class);
		return responseService.created(responseTO);
	}
	
	@GetMapping
	public ResponseEntity<ResponseTO<Page<ServicoPrestadoReducedResponseTO>>> listar(ServicoPrestadoFilterResquestTO filterRequestTO,
			Pageable pageable) {

		Specification<ServicoPrestado> specification = specificationFactory.create(filterRequestTO);
        Page<ServicoPrestado> page = servico.listar(specification, pageable);
        Page<ServicoPrestadoReducedResponseTO> responseTOPage = converterService.convert(page, ServicoPrestadoReducedResponseTO.class);
		return responseService.ok(responseTOPage);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void remover(@PathVariable Long id) {
		servico.remover(id);
	}
	
	@PatchMapping("/{id}/ativo")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void alternaAtivo(@PathVariable Long id) {
		servico.alternaAtivo(id);
	}

}
