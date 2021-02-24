CREATE TABLE municipio (
	cdmunicipio BIGINT NOT NULL AUTO_INCREMENT,
	cdibge VARCHAR(7),
 	nome VARCHAR(255) NOT NULL,
  	uf VARCHAR(2),
  	status bit(1),
  	dtcriacao DATETIME,
  	dtatualizacao DATETIME,
  	cdusuacriacao bigint,
  	cdusuatualizacao bigint,
  	versao int(11) NOT NULL DEFAULT '0',
  	PRIMARY KEY (cdmunicipio)
);