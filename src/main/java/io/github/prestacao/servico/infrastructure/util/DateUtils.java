package io.github.prestacao.servico.infrastructure.util;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;

public class DateUtils implements Serializable {

	private static final long serialVersionUID = 1365562943349391912L;

	public static final String PATTERN_DAY_MONTH_YEAR = "dd/MM/yyyy";
	public static final String PATTERN_DAY_MONTH_YEAR_HOUR_MINUTE_SECOND = "dd/MM/yyyy HH:mm:ss";

	public static Long findDiferencaAnos(LocalDate first, LocalDate second) {
		if (first == null || second == null) {
			return null;
		}

		return ChronoUnit.YEARS.between(first, second);
	}

	public static long getIdade(LocalDate dataNascimento) {
		Period tempoVivo = Period.between(dataNascimento, LocalDate.now());
		return tempoVivo.getYears();
	}

	public static boolean isIgualOuAntes(LocalDate origem, LocalDate data) {
		return origem.isEqual(data) || origem.isBefore(data);
	}

	public static boolean isIgualOuDepois(LocalDate origem, LocalDate data) {
		return origem.isEqual(data) || origem.isAfter(data);
	}

	public static String formataLocalDateTime(LocalDateTime data, String padrao) {
		if (data != null) {
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern(padrao);
			return data.format(formatter);
		}

		return "";
	}

	public static String formataLocalDate(LocalDate data, String padrao) {
		if (data != null) {
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern(padrao);
			return data.format(formatter);
		}

		return "";
	}

}