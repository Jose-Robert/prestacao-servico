package io.github.prestacao.servico.domain.shared;

import java.io.Serializable;
import java.lang.reflect.Field;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import javax.persistence.Version;
import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.domain.Persistable;

import com.fasterxml.jackson.annotation.JsonIgnore;

import io.github.prestacao.servico.infrastructure.persistence.listener.BaseListener;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@Getter
@Setter
@MappedSuperclass
@EntityListeners(BaseListener.class)
public abstract class BaseEntity implements Persistable<Long>, Serializable {

	private static final long serialVersionUID = 1L;
	
	@Column(name = "STATUS")
    protected Boolean ativo;
    
    @CreatedDate
    @Column(name = "DTCRIACAO")
    protected LocalDateTime dataCriacao;

    @CreatedBy
    @Column(name = "CDUSUACRIACAO")
    protected Long idUsuarioCriacao;

    @LastModifiedDate
    @Column(name = "DTATUALIZACAO")
    protected LocalDateTime dataAtualizacao;

    @LastModifiedBy
    @Column(name = "CDUSUATUALIZACAO")
    protected Long idUsuarioAtualizacao;

    @Version
    @Column(name = "VERSAO", nullable = false, columnDefinition = "INTEGER DEFAULT 0")
    protected Integer version;

    @Override
    public Long getId() {
        Long retorno = null;
        try {
            retorno = (Long) getIdField().get(Long.class);
        } catch (Exception e) {
            log.error("erro ao obter getId da entidade ", e);
        }
        return retorno;
    }

    @JsonIgnore
    public Field getIdField() {
        Field retorno = null;
        Class<?> actualClass = getClass();

        try {
            do {
                for (Field fieldSequenceId : actualClass.getDeclaredFields()) {
                    fieldSequenceId.setAccessible(true);
                    if (checkIdField(fieldSequenceId)) {
                        retorno = fieldSequenceId;
                        actualClass = actualClass.getSuperclass();
                    }
                }
            } while (Objects.isNull(retorno) && !Object.class.equals(actualClass));
        } catch (Exception e) {
            log.error("erro ao obter getIdField da entidade ", e);
        }
        return retorno;
    }

    private static boolean checkIdField(Field field) {
        return !Objects.isNull(field.getAnnotation(Id.class));
    }

    public Set<ConstraintViolation<BaseEntity>> validationsConstraintsFails() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        return validator.validate(this);
    }
    
    public void alternarAtivo() {
        setAtivo(!ativo);
    }

    @JsonIgnore
    @Override
    public boolean isNew() {
        return getId() == null;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        BaseEntity other = (BaseEntity) obj;
        if (getId() == null) {
            if (other.getId() != null)
                return false;
        } else if (!getId().equals(other.getId()))
            return false;
        return true;
    }


}
