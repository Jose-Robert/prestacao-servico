CREATE TABLE cliente (
	cdcliente BIGINT NOT NULL AUTO_INCREMENT,
	nome VARCHAR(255) NOT NULL,
	cpf VARCHAR(11) NOT NULL,
	idendereco BIGINT DEFAULT NULL,
	status bit(1),
  	dtcriacao DATETIME,
  	dtatualizacao DATETIME,
  	cdusuacriacao bigint,
  	cdusuatualizacao bigint,
  	versao int(11) NOT NULL DEFAULT '0',
	PRIMARY KEY (cdcliente),
	CONSTRAINT FK_clienteidendereco_enderecocdendereco FOREIGN KEY (idendereco) REFERENCES endereco (cdendereco)
);