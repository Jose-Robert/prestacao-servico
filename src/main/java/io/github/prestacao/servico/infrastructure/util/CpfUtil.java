package io.github.prestacao.servico.infrastructure.util;

import javax.faces.application.FacesMessage;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.validator.FacesValidator;
import javax.faces.validator.Validator;
import javax.faces.validator.ValidatorException;

import org.springframework.stereotype.Component;

import io.github.prestacao.servico.infrastructure.validator.CpfValidator;

@Component(value = "cpfUtil")
@FacesValidator
public class CpfUtil implements Validator {

	public static final String CPF_INVALIDO = "CPF inválido.";

	public static boolean isValid(String cpf) {
		cpf = remove(String.valueOf(cpf));
		return CpfValidator.validaCPF(cpf);
	}

	public static String remove(String cpf) {
		cpf = cpf.replace(".", "");
		cpf = cpf.replace("-", "");
		return cpf;
	}

	@Override
	public void validate(final FacesContext arg0, final UIComponent arg1, Object valor) {
		valor = remove(String.valueOf(valor));
		if (!isValid(String.valueOf(valor))) {
			final FacesMessage message = new FacesMessage();
			message.setSeverity(FacesMessage.SEVERITY_ERROR);
			message.setSummary(CPF_INVALIDO);
			throw new ValidatorException(message);
		}
	}

}
