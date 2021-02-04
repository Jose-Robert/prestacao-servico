package io.github.prestacao.servico.infrastructure.annotation.specification;

import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import io.github.prestacao.servico.infrastructure.persistence.hibernate.specification.SpecificationOperation;


@Retention(RUNTIME)
@Target({ FIELD })
public @interface SpecificationField {

    public String property() default "";
    
    public String join() default "";

    public SpecificationOperation operation() default SpecificationOperation.EQUAL;

}
