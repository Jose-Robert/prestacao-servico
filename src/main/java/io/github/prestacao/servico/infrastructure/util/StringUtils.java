package io.github.prestacao.servico.infrastructure.util;

import java.text.Normalizer;

import org.apache.logging.log4j.util.Strings;

public class StringUtils {

	/**
	 * Remove os acentos de uma string.
	 *
	 * @param str string a ser manipulada
	 * @return string sem acentos
	 */
	public static String unaccent(String str) {
		if (Boolean.TRUE.equals(isEmpty(str))) {
			return "";
		}

		return org.apache.commons.lang3.StringUtils.stripAccents(str);
	}

	/**
	 * Verifica se a string é vazia ou nula.
	 *
	 * @param str string a ser verificada
	 * @return {@code true} se a string for vazia ou nula
	 */
	public static Boolean isEmpty(String str) {
		return org.apache.commons.lang3.StringUtils.isEmpty(str);
	}

	/**
	 * Verifica se a string é vazia, nula ou se contém apenas espaços em branco.
	 *
	 * @param str string a ser verificada
	 * @return {@code true} se a string for vazia, nula ou se contiver apenas
	 *         espaços em branco
	 */
	public static Boolean isBlank(String str) {
		return org.apache.commons.lang3.StringUtils.isBlank(str);
	}

	public static String completeWithZeroLeft(String value, int size) {
		return org.apache.commons.lang3.StringUtils.leftPad(value, size, "0");
	}

	public static void adicionaStringEmListaComSeparador(StringBuilder stb, String item, String separador) {
		if (stb.toString().isEmpty()) {
			stb.append(item);
		} else {
			stb.append(separador).append(item);
		}
	}

	public static String removerAcentos(String str) {
		if (Strings.isEmpty(str)) {
			str = "";
		}
		return Normalizer.normalize(str, Normalizer.Form.NFD).replaceAll("[^\\p{ASCII}]", "");
	}

}