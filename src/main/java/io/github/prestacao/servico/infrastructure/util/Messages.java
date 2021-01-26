package io.github.prestacao.servico.infrastructure.util;

import java.awt.event.KeyEvent;
import java.io.Serializable;
import java.text.MessageFormat;
import java.util.MissingResourceException;
import java.util.ResourceBundle;

import javax.swing.KeyStroke;

import org.apache.commons.lang3.StringUtils;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class Messages implements Serializable {

	private static final long serialVersionUID = -3097634159066542473L;
	private static final String BUNDLE_NAME = "messages";
	private static final ResourceBundle RESOURCE_BUNDLE = ResourceBundle.getBundle(BUNDLE_NAME);

	public static String getString(String key) {
		try {
			return RESOURCE_BUNDLE.getString(key);
		} catch (MissingResourceException e) {
			StackTraceElement caller = e.getStackTrace()[4];
			log.warn("Recurso não encontrado: '" + key + "'");
			log.warn("  Ponto de busca do recurso: " + caller.toString());

			return '!' + key + '!';
		}
	}

	public static String getString(String key, Object[] args) {
		return MessageFormat.format(getString(key), args);
	}

	public static int getKeyCode(String key) {
		try {
			String stroke = RESOURCE_BUNDLE.getString(key);
			return KeyStroke.getKeyStroke(stroke).getKeyCode();
		} catch (MissingResourceException e) {
			StackTraceElement caller = e.getStackTrace()[4];
			log.warn("Recurso não encontrado: '" + key + "'");
			log.warn("  Ponto de busca do recurso: " + caller.toString());

			return KeyEvent.VK_UNDEFINED;
		}
	}

	public static boolean hasMessage(String key) {
		try {
			return RESOURCE_BUNDLE.getObject(key) != null;
		} catch (MissingResourceException mre) {
			return false;
		}
	}

	/**
	 * Recupera uma mensagem do arquivo de properties.
	 * 
	 * @param key A chave da propriedade.
	 * @return O valor da propriedade.
	 */
	public static String getMessage(String key) {
		return getMessage(RESOURCE_BUNDLE, key);
	}

	/**
	 *         Metodo que retorna a descricao de uma mensagem informada no arquivo
	 *         .properties
	 * @param bundle
	 * @param codMsg
	 * @param params
	 * @return String
	 */
	public static String getMessage(ResourceBundle bnd, String codMsg, String... params) {
		String retorno = null;
		if (bnd != null && codMsg != null) {
			boolean existeMsg = bnd.containsKey(codMsg);
			while (existeMsg) {
				retorno = bnd.getString(codMsg);
				if (StringUtils.isNotEmpty(retorno)) {
					if (retorno.startsWith("${") && retorno.trim().endsWith("}")) {
						codMsg = retorno.replaceFirst("\\$", "").replaceFirst("\\{", "").replaceFirst("\\}", "").trim();
						existeMsg = bnd.containsKey(codMsg);
					} else {
						existeMsg = false;
					}
				} else {
					existeMsg = false;
				}
			}
		}
		return getTextMessageReplace(retorno, params);
	}

	/**
	 *         Metodo que sobrescreve os valores dos parametros, na descricao de uma
	 *         mensagem
	 * @param descMsg
	 * @param params
	 * @return String
	 */
	public static String getTextMessageReplace(String descMsg, String... params) {
		if (descMsg != null && params != null) {
			MessageFormat mf = new MessageFormat(descMsg);
			descMsg = mf.format(params, new StringBuffer(), null).toString();
		}
		return descMsg;
	}

	/**
	 * Metodo que sobrescreve os valores dos parametros, na descricao de uma
	 * mensagem obtida atraves do arquivo .properties pelo codigo da mensagem
	 * 
	 * @param codMsg
	 * @param values
	 * @return String
	 */
	public static String getMessageReplace(String codMsg, String... params) {
		String line = RESOURCE_BUNDLE.getString(codMsg);
		return getTextMessageReplace(line, params);
	}
}
