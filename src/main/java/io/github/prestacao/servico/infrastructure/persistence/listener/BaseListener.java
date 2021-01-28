package io.github.prestacao.servico.infrastructure.persistence.listener;

import java.time.LocalDateTime;

import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;

import io.github.prestacao.servico.domain.shared.BaseEntity;

public class BaseListener {

    @PrePersist
    public void onPrePersist(BaseEntity genericEntity) {
        genericEntity.setDataCriacao(LocalDateTime.now());
    }

    @PreUpdate
    public void onPreUpdate(BaseEntity genericEntity) {
        genericEntity.setDataAtualizacao(LocalDateTime.now());
    }

}
