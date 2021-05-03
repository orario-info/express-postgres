-- テーブル定義

-- メモ

DROP TABLE IF EXISTS techsc.memo;
CREATE TABLE IF NOT EXISTS techsc.memo ( 
  idmemo NUMERIC NOT NULL,
  title VARCHAR(20) NOT NULL, 
  note TEXT NOT NULL, 
  PRIMARY KEY (idmemo)
) WITHOUT OIDS;
