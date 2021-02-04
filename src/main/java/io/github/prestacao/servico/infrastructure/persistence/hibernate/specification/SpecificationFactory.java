package io.github.prestacao.servico.infrastructure.persistence.hibernate.specification;


import java.lang.reflect.Field;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaBuilder.In;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import io.github.prestacao.servico.infrastructure.annotation.specification.SpecificationEntity;
import io.github.prestacao.servico.infrastructure.annotation.specification.SpecificationField;
import io.github.prestacao.servico.infrastructure.util.FieldUtils;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class SpecificationFactory<T> {

    private CriteriaBuilder criteriaBuilder;

    private Root<T> root;

    private List<Predicate> predicates;

    public Specification<T> create(Object data) {
        return (r, query, builder) -> {
            try {
                this.criteriaBuilder = builder;
                this.root = r;
                predicates = new ArrayList<>();

                SpecificationEntity specificationEntity = data.getClass().getAnnotation(SpecificationEntity.class);
                List<Field> dataFields = FieldUtils.getAllFields(data.getClass());
                List<Field> entityFields = FieldUtils.getAllFields(specificationEntity.value());

                for (Field field : dataFields) {
                    field.setAccessible(true);
                    Object value = field.get(data);

                    if (hasEntityThisProperty(entityFields, field, value)) {
                        addPredicate(field, field.get(data));
                    }
                }

                return this.criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));
            } catch (IllegalArgumentException | IllegalAccessException e) {
                log.error(e.getMessage(), e);
            }

            return null;
        };
    }

    private boolean hasEntityThisProperty(List<Field> entityFields, Field field, Object value) {
        return value != null && entityFields.stream().anyMatch(ef -> hasEntityFieldEqualProperty(field, ef));
    }

    private boolean hasEntityFieldEqualProperty(Field field, Field ef) {
        if (!hasSpecificationField(field)) {
            return false;
        }

        SpecificationField specificationField = field.getAnnotation(SpecificationField.class);
        String property = propertyExists(specificationField) ? specificationField.property() : field.getName();
        
        property = property.contains(".") ? property.substring(0, property.indexOf('.'))
                : property;
        
        return joinExists(specificationField) ? ef.getName().equals(specificationField.join()) : ef.getName().equals(property);

    }
    
    private boolean propertyExists(SpecificationField specificationField) {
        return specificationField.property() != null && !specificationField.property().isEmpty();
    }
    
    private boolean joinExists(SpecificationField specificationField) {
        return specificationField.join() != null && !specificationField.join().isEmpty();
    }

    private void addPredicate(Field field, Object value) {
        if (field.isAnnotationPresent(SpecificationField.class)) {
            SpecificationField specificationField = field.getAnnotation(SpecificationField.class);
            String property = findProperty(field, specificationField);
            SpecificationOperation operation = specificationField.operation();
            Predicate predicate = null;

            if (value instanceof Number) {
                predicate = buildPredicate(property, Integer.parseInt(value.toString()), operation);
            } else if (value instanceof Boolean) {
                predicate = buildPredicate(property, (Boolean) value, operation);
            } else if (value instanceof LocalDate) {
                predicate = buildPredicate(property, LocalDate.parse(value.toString()), operation);
            } else if (value instanceof LocalDateTime) {
                predicate = buildPredicate(property, LocalDateTime.parse(value.toString()), operation);
            } else if (value instanceof Enum<?>) {
                predicate = buildPredicate(property, (Enum<?>) value);
            } else if (value instanceof Collection<?>) {
                predicate = joinExists(specificationField)
                        ? buildPredicate(specificationField.join(), property, (Collection<?>) value, operation)
                        : buildPredicate(property, (Collection<?>) value, operation);
            } else {
                predicate = buildPredicate(property, value.toString(), operation);
            }

            predicates.add(predicate);
        }
    }

    private String findProperty(Field field, SpecificationField specificationField) {

        if (joinExists(specificationField)) {
            return specificationField.property();
        }

        return !propertyExists(specificationField) ? field.getName() : specificationField.property();
    }

    @SuppressWarnings("unchecked")
    private Predicate buildPredicate(String property, Integer value, SpecificationOperation operation) {
        Path<Integer> path = (Path<Integer>) generatePath(property);
        switch (operation) {
        case EQUAL:
            return criteriaBuilder.equal(path, value);
        case GREATER_THAN:
            return criteriaBuilder.greaterThan(path, value);
        case LESS_THAN:
            return criteriaBuilder.lessThan(path, value);
        case GREATER_THAN_OR_EQUAL:
            return criteriaBuilder.greaterThan(path, value);
        case LESS_THAN_OR_EQUAL:
            return criteriaBuilder.lessThanOrEqualTo(path, value);
        default:
            return criteriaBuilder.equal(path, value);
        }
    }

    @SuppressWarnings("unchecked")
    private Predicate buildPredicate(String property, Boolean value, SpecificationOperation operation) {
        Path<Boolean> path = (Path<Boolean>) generatePath(property);
        if (operation.equals(SpecificationOperation.EXISTS)) {
            return value.booleanValue() ? criteriaBuilder.isNotNull(path)
                    : criteriaBuilder.isNull(path);
        }

        return criteriaBuilder.equal(path, value);
    }

    @SuppressWarnings("unchecked")
    private Predicate buildPredicate(String property, Enum<?> value) {
        Path<Enum<?>> path = (Path<Enum<?>>) generatePath(property);
        return criteriaBuilder.equal(path, value);
    }
    
    private Predicate buildPredicate(String property, Collection<?> values, SpecificationOperation operation) {
        switch (operation) {
        case BETWEEN_DATETIME:
            return buildPredicateDateTime(property, values.stream().map(v -> LocalDate.parse(v.toString())).collect(Collectors.toList()));
        case BETWEEN_DATE:
            return buildPredicateDate(property, values.stream().map(v -> LocalDate.parse(v.toString())).collect(Collectors.toList()));
        case IN:
            return buildPredicate(property, values);
        default:
            return buildPredicate(property, values);
        }
    }
    
    private Predicate buildPredicate(String join, String property, Collection<?> values,
            SpecificationOperation operation) {
        if (operation.equals(SpecificationOperation.IN)) {
            return buildPredicate(join, property, values);
        }

        return buildPredicate(property, values);
    }
    
    @SuppressWarnings("unchecked")
    private Predicate buildPredicateDateTime(String property, List<LocalDate> values) {
        LocalDateTime begin = values.get(0).atStartOfDay();
        LocalDateTime end = values.size() == 1 ? values.get(0).atTime(LocalTime.MAX) : values.get(1).atTime(LocalTime.MAX);
        Path<LocalDateTime> path = (Path<LocalDateTime>) generatePath(property);

        return criteriaBuilder.between(path, begin, end);
    }
    
    @SuppressWarnings("unchecked")
    private Predicate buildPredicateDate(String property, List<LocalDate> values) {
        LocalDate begin = values.get(0);
        LocalDate end = values.size() == 1 ? values.get(0) : values.get(1);
        Path<LocalDate> path = (Path<LocalDate>) generatePath(property);

        return criteriaBuilder.between(path, begin, end);
    }
    
    private Predicate buildPredicate(String property, Collection<?> values) {
        In<Object> in = criteriaBuilder.in(root.get(property));
        values.stream().forEach(in::value);
        return in;
    }
    
    private Predicate buildPredicate(String join, String property, Collection<?> values) {
        Path<Object> path = root.join(join).get(property);
        return path.in(values);
    }
    
    @SuppressWarnings("unchecked")
    private Predicate buildPredicate(String property, LocalDate value, SpecificationOperation operation) {
        Path<LocalDate> path = (Path<LocalDate>) generatePath(property);
        switch (operation) {
        case EQUAL:
            return criteriaBuilder.equal(path, value);
        case GREATER_THAN:
            return criteriaBuilder.greaterThan(path, value);
        case LESS_THAN:
            return criteriaBuilder.lessThan(path, value);
        case GREATER_THAN_OR_EQUAL:
            return criteriaBuilder.greaterThanOrEqualTo(path, value);
        case LESS_THAN_OR_EQUAL:
            return criteriaBuilder.lessThanOrEqualTo(path, value);
        default:
            return criteriaBuilder.equal(path, value);
        }
    }

    @SuppressWarnings("unchecked")
    private Predicate buildPredicate(String property, LocalDateTime value, SpecificationOperation operation) {
        Path<LocalDateTime> path = (Path<LocalDateTime>) generatePath(property);
        switch (operation) {
        case EQUAL:
            return criteriaBuilder.equal(path, value);
        case GREATER_THAN:
            return criteriaBuilder.greaterThan(path, value);
        case LESS_THAN:
            return criteriaBuilder.lessThan(path, value);
        case GREATER_THAN_OR_EQUAL:
            return criteriaBuilder.greaterThanOrEqualTo(path, value);
        case LESS_THAN_OR_EQUAL:
            return criteriaBuilder.lessThanOrEqualTo(path, value);
        default:
            return criteriaBuilder.equal(path, value);
        }
    }

    @SuppressWarnings("unchecked")
    private Predicate buildPredicate(String property, String value, SpecificationOperation operation) {
        Path<?> path = generatePath(property);
        switch (operation) {
        case EQUAL:
            return criteriaBuilder.equal(path, value);
        case EQUAL_IGNORE_CASE:
            return criteriaBuilder.equal(criteriaBuilder.lower((Path<String>) path), value.toLowerCase());
        case LIKE_IGNORE_CASE:
            return criteriaBuilder.like(criteriaBuilder.lower((Path<String>) path), "%" + value.toLowerCase() + "%");
        default:
            return criteriaBuilder.equal(path, value);
        }
    }
    
    private Path<?> generatePath(String property) {
        Path<?> path = null;
        List<String> list = new ArrayList<>(Arrays.asList(property.split("\\.")));
        for (String p : list) {
            if (path == null) {
                path = root.get(p);
            } else {

                path = path.get(p);
            }
        }
        return path;
    }
    
    private boolean hasSpecificationField(Field field) {
        return field.isAnnotationPresent(SpecificationField.class);
    }

}
