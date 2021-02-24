CREATE TABLE tipologradouro (
	cdtipologradouro BIGINT NOT NULL AUTO_INCREMENT,
	descricao VARCHAR(50) NOT NULL,
	cdtiplogradouro VARCHAR(10),
	status bit(1),
  	dtcriacao DATETIME,
  	dtatualizacao DATETIME,
  	cdusuacriacao bigint,
  	cdusuatualizacao bigint,
  	versao int(11) NOT NULL DEFAULT '0',
  	PRIMARY KEY (cdtipologradouro)
);