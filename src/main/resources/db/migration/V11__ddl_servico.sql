CREATE TABLE servico (
	cdservico BIGINT NOT NULL AUTO_INCREMENT,
	descricao VARCHAR(255) NOT NULL,
	valor DECIMAL(19,2) DEFAULT NULL,
	data DATE DEFAULT NULL,
	idcliente BIGINT DEFAULT NULL,
	status bit(1),
  	dtcriacao DATETIME,
  	dtatualizacao DATETIME,
  	cdusuacriacao bigint,
  	cdusuatualizacao bigint,
  	versao int(11) NOT NULL DEFAULT '0',
	PRIMARY KEY (cdservico),
	CONSTRAINT FK_servicoidcliente_clientecdcliente FOREIGN KEY (idcliente) REFERENCES cliente (cdcliente)
);