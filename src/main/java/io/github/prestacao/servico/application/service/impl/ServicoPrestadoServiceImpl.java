package io.github.prestacao.servico.application.service.impl;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.text.ParseException;

import org.springframework.stereotype.Service;

import io.github.prestacao.servico.application.service.exception.CampoObrigatorioException;
import io.github.prestacao.servico.domain.model.ServicoPrestado;
import io.github.prestacao.servico.domain.service.ServicoPrestadoService;
import io.github.prestacao.servico.infrastructure.persistence.hibernate.repository.ServicoPrestadoRepository;
import io.github.prestacao.servico.infrastructure.util.ConverterUtil;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ServicoPrestadoServiceImpl extends BaseServiceImpl<ServicoPrestado, ServicoPrestadoRepository> 
	implements ServicoPrestadoService {
	
	@Override
	public ServicoPrestado salvar(ServicoPrestado servicoPrestado) {
		this.validaCamposObrigatorios(servicoPrestado);
		formatarValor(servicoPrestado);
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

		if (servicoPrestado.getDataServicoPrestado() == null) {
			throw new CampoObrigatorioException("Data do Serviço");
		}
	}
	
	private void formatarValor(ServicoPrestado servicoPrestado) {
		DecimalFormat decimalFormat = new DecimalFormat();
		decimalFormat.setParseBigDecimal(true);
		String valor = ConverterUtil.formatarMoeda(servicoPrestado.getValor());
		try {
			servicoPrestado.setValor((BigDecimal) decimalFormat.parse(valor));
		} catch (ParseException e) {
			e.printStackTrace();
		}
	}

}
