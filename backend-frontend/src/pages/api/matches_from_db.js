// const mysql = require('mysql2/promise');
const connection = mysql.createConnection('dummy')

export default async function handler(req, res) {
  const [rows] = await (await connection).execute('SELECT * FROM matches');

  const results = {};

  // Create empty arrays for rounds
  for (let i = 1; i <= 38; i++) {
    results[i] = [];
  }

  for (const row of rows) {
    results[row.round].push({
      homeTeam: row.homeTeam,
      awayTeam: row.awayTeam,
      homeScore: row.homeScore,
      awayScore: row.awayScore,
      date: row.matchDate,
      started: !!row.started
    })
  }

  return res.status(200).json(results);
}