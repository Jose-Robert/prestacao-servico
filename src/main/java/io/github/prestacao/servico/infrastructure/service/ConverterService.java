package io.github.prestacao.servico.infrastructure.service;

import java.lang.reflect.Field;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.stereotype.Component;

import io.github.prestacao.servico.infrastructure.annotation.converter.ChildReference;
import io.github.prestacao.servico.infrastructure.annotation.converter.IdReference;
import io.github.prestacao.servico.infrastructure.factory.RepositoryFactory;
import io.github.prestacao.servico.infrastructure.service.exception.ConverterException;
import io.github.prestacao.servico.infrastructure.service.exception.InformationNotFoundException;
import io.github.prestacao.servico.infrastructure.util.FieldUtils;
import io.github.prestacao.servico.presentation.dto.shared.EnumResponseTO;

@Component
public class ConverterService {

	@Autowired
	private RepositoryFactory repositoryFactory;
	
	@Autowired
	public ModelMapper modelMapper;
	
	public <T> T convert(Object data, Class<T> destinationType) {
		T target = modelMapper.map(data, destinationType);

		return refreshReferences(data, target);
	}

	public <T> T convert(Enum<?> data, Class<T> destinationType) {
		T target = modelMapper.map(data, destinationType);
		try {
			Field fieldTarget = target.getClass().getDeclaredField("name");
			fieldTarget.setAccessible(true);
			fieldTarget.set(target, data.name());
		} catch (Exception e) {
			throw new ConverterException(e);
		}

		return target;
	}

	public <T> Page<T> convert(Page<?> dataPage, Class<T> destinationType) {
		return dataPage.map(data -> convert(data, destinationType));
	}

	public <T> List<T> convert(List<?> dataList, Class<T> destinationType) {
		if (!dataList.isEmpty() && dataList.get(0) instanceof Enum<?>) {
			return dataList.stream().map(data -> convert((Enum<?>) data, destinationType)).collect(Collectors.toList());
		}
		return dataList.stream().map(data -> convert(data, destinationType)).collect(Collectors.toList());
	}

	public <T> Set<T> convert(Set<?> dataList, Class<T> destinationType) {
		if (dataList.stream().anyMatch(s -> s instanceof Enum<?>)) {
			return dataList.stream().map(data -> convert((Enum<?>) data, destinationType)).collect(Collectors.toSet());
		}
		return dataList.stream().map(data -> convert(data, destinationType)).collect(Collectors.toSet());
	}

	private <T> T refreshReferences(Object data, T target) {
		List<Field> fields = FieldUtils.getAllFields(data.getClass());

		for (Field field : fields) {
			ChildReference childReference = field.getAnnotation(ChildReference.class);
			IdReference idReference = field.getAnnotation(IdReference.class);

			fillChildReference(data, target, field, childReference);

			fillIdReference(data, target, field, idReference);

			if (field.getGenericType() instanceof Class && ((Class<?>) field.getGenericType()).isEnum()) {
				try {
					Field fieldTarget = target.getClass().getDeclaredField(field.getName());
					field.setAccessible(true);
					fieldTarget.setAccessible(true);
					if (!(fieldTarget.getGenericType() instanceof Class
							&& ((Class<?>) fieldTarget.getGenericType()) == EnumResponseTO.class)) {
						continue;
					}

					Enum<?> fieldValue = (Enum<?>) field.get(data);
					fieldTarget.set(target, convert(fieldValue, EnumResponseTO.class));
				} catch (Exception e) {
				}
			}
		}

		return target;
	}

	private <T> void fillIdReference(Object data, T target, Field field, IdReference idReference) {
		if (idReference != null) {
			field.setAccessible(true);

			try {
				SimpleJpaRepository<?, Long> repository = repositoryFactory.create(idReference.target());
				Field fieldTarget = target.getClass().getDeclaredField(idReference.property());
				fieldTarget.setAccessible(true);

				Object fieldValue = field.get(data);

				if (fieldValue == null) {
					return;
				}

				if (field.get(data) instanceof List) {
					fieldTarget.set(target, repository.findAllById(FieldUtils.getLongValues(data, field)));
				} else if (field.get(data) instanceof Set) {
					fieldTarget.set(target,
							new HashSet<>(repository.findAllById(FieldUtils.getLongValues(data, field))));
				} else {
					Optional<?> value = repository.findById((Long) fieldValue);

					if (!value.isPresent()) {
						throw new InformationNotFoundException(fieldTarget.getName());
					}

					fieldTarget.set(target, value.get());
				}
			} catch (NoSuchFieldException | IllegalAccessException exception) {
				throw new ConverterException(exception);
			}
		}
	}

	private <T> void fillChildReference(Object data, T target, Field field, ChildReference childReference) {
		if (childReference != null) {
			Field fieldTarget;
			try {
				field.setAccessible(true);
				fieldTarget = target.getClass().getDeclaredField(childReference.property());
				fieldTarget.setAccessible(true);

				Object fieldValue = field.get(data);
				Object targetValue = fieldTarget.get(target);
				refreshReferences(fieldValue, targetValue);
			} catch (NoSuchFieldException | IllegalAccessException exception) {
				throw new ConverterException(exception);
			}
		}
	}

}
