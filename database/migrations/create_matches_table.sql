CREATE TABLE brasileirao23.matches (
  id INT auto_increment NOT NULL,
  round SMALLINT UNSIGNED NOT NULL,
  homeTeam varchar(20) NOT NULL,
  awayTeam varchar(20) NOT NULL,
  homeScore SMALLINT UNSIGNED NULL,
  awayScore SMALLINT UNSIGNED NULL,
  matchDate varchar(10) NOT NULL,
  started BOOL NOT NULL,
  PRIMARY KEY (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- INSERT INTO
--   brasileirao23.matches (
--     round,
--     homeTeam,
--     awayTeam,
--     homeScore,
--     awayScore,
--     matchDate,
--     started
--   )
-- VALUES
-- (1, 'P', 'A', 1, 0, '2023-10-13', false)
-- (1, 'P', 'A', 1, 0, '2023-10-14', false)
-- (1, 'P', 'A', 1, 0, '2023-10-15', false)
-- ;