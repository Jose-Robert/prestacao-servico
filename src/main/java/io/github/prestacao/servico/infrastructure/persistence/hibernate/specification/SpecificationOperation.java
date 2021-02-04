package io.github.prestacao.servico.infrastructure.persistence.hibernate.specification;

public enum SpecificationOperation {

    EQUAL, EQUAL_IGNORE_CASE,
    LIKE, LIKE_IGNORE_CASE,
    GREATER_THAN, GREATER_THAN_OR_EQUAL,
    LESS_THAN, LESS_THAN_OR_EQUAL, EXISTS, IN, BETWEEN, 
    BETWEEN_DATE, BETWEEN_DATETIME

}