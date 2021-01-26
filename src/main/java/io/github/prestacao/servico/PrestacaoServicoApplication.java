package io.github.prestacao.servico;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories
@ComponentScan(basePackages = { "io.github.prestacao.servico" })
public class PrestacaoServicoApplication {

	public static void main(String[] args) {
		SpringApplication.run(PrestacaoServicoApplication.class, args);
	}

}
