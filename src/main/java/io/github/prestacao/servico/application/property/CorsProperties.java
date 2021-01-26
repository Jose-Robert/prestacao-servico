package io.github.prestacao.servico.application.property;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import org.springframework.validation.annotation.Validated;

@Component
@Validated
@ConfigurationProperties("prestacao-servico.cors")
public class CorsProperties {

    private String allowedOrigin;

    public String getAllowedOrigin() {
        if(allowedOrigin == null) {
            setAllowedOrigin("*");
        }
        return allowedOrigin;
    }

    public void setAllowedOrigin(String allowedOrigin) {
        this.allowedOrigin = allowedOrigin;
    }

}