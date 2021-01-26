package io.github.prestacao.servico.infrastructure.util;

import javax.faces.application.FacesMessage;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.validator.FacesValidator;
import javax.faces.validator.Validator;
import javax.faces.validator.ValidatorException;

import org.springframework.stereotype.Component;

import io.github.prestacao.servico.infrastructure.validator.CnpjValidator;

@Component(value = "cnpjUtil")
@FacesValidator
public class CnpjUtil implements Validator {

	public static final String CNPJ_INVALIDO = "CNPJ inválido.";

	public static boolean isValid(String cnpj) {
		cnpj = remove(String.valueOf(cnpj));
		return CnpjValidator.validaCNPJ(cnpj);
	}

	private static String remove(String CNPJ) {
		CNPJ = CNPJ.replace(".", "");
		CNPJ = CNPJ.replace("/", "");
		CNPJ = CNPJ.replace("-", "");
		return CNPJ;
	}

	@Override
	public void validate(FacesContext context, UIComponent component, Object valor) {
		valor = remove(String.valueOf(valor));
		if (!CnpjValidator.validaCNPJ(String.valueOf(valor))) {
			final FacesMessage message = new FacesMessage();
			message.setSeverity(FacesMessage.SEVERITY_ERROR);
			message.setSummary(CNPJ_INVALIDO);
			throw new ValidatorException(message);
		}
	}
}
