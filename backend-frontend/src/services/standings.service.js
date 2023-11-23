export const standingsService = {
  getStandings,
};

const calculateMatch = (standings, match) => {
  const { homeTeam, awayTeam, homeScore, awayScore, started } = match;

  if (started) {
    // The home team
    calculateStandings(standings[homeTeam], homeScore, awayScore)
    
    // The away team
    calculateStandings(standings[awayTeam], awayScore, homeScore)
  }
}

function getStandings(matches, option, subOption) {
  const standings = {
    "América-MG": { "points": 0, "pointsLost": 0, "matches": 0, "victories": 0, "draws": 0, "losses": 0, "goalsFor": 0, "goalsAgainst": 0, "goalDifference": 0 },
    "Palmeiras": { "points": 0, "pointsLost": 0, "matches": 0, "victories": 0, "draws": 0, "losses": 0, "goalsFor": 0, "goalsAgainst": 0, "goalDifference": 0 },
    "Coritiba": { "points": 0, "pointsLost": 0, "matches": 0, "victories": 0, "draws": 0, "losses": 0, "goalsFor": 0, "goalsAgainst": 0, "goalDifference": 0 },
    "Corinthians": { "points": 0, "pointsLost": 0, "matches": 0, "victories": 0, "draws": 0, "losses": 0, "goalsFor": 0, "goalsAgainst": 0, "goalDifference": 0 },
    "Fortaleza": { "points": 0, "pointsLost": 0, "matches": 0, "victories": 0, "draws": 0, "losses": 0, "goalsFor": 0, "goalsAgainst": 0, "goalDifference": 0 },
    "Fluminense": { "points": 0, "pointsLost": 0, "matches": 0, "victories": 0, "draws": 0, "losses": 0, "goalsFor": 0, "goalsAgainst": 0, "goalDifference": 0 },
    "Santos": { "points": 0, "pointsLost": 0, "matches": 0, "victories": 0, "draws": 0, "losses": 0, "goalsFor": 0, "goalsAgainst": 0, "goalDifference": 0 },
    "São Paulo": { "points": 0, "pointsLost": 0, "matches": 0, "victories": 0, "draws": 0, "losses": 0, "goalsFor": 0, "goalsAgainst": 0, "goalDifference": 0 },
    "Bragantino": { "points": 0, "pointsLost": 0, "matches": 0, "victories": 0, "draws": 0, "losses": 0, "goalsFor": 0, "goalsAgainst": 0, "goalDifference": 0 },
    "Cruzeiro": { "points": 0, "pointsLost": 0, "matches": 0, "victories": 0, "draws": 0, "losses": 0, "goalsFor": 0, "goalsAgainst": 0, "goalDifference": 0 },
    "Atlético-MG": { "points": 0, "pointsLost": 0, "matches": 0, "victories": 0, "draws": 0, "losses": 0, "goalsFor": 0, "goalsAgainst": 0, "goalDifference": 0 },
    "Athletico-PR": { "points": 0, "pointsLost": 0, "matches": 0, "victories": 0, "draws": 0, "losses": 0, "goalsFor": 0, "goalsAgainst": 0, "goalDifference": 0 },
    "Flamengo": { "points": 0, "pointsLost": 0, "matches": 0, "victories": 0, "draws": 0, "losses": 0, "goalsFor": 0, "goalsAgainst": 0, "goalDifference": 0 },
    "Botafogo": { "points": 0, "pointsLost": 0, "matches": 0, "victories": 0, "draws": 0, "losses": 0, "goalsFor": 0, "goalsAgainst": 0, "goalDifference": 0 },
    "Internacional": { "points": 0, "pointsLost": 0, "matches": 0, "victories": 0, "draws": 0, "losses": 0, "goalsFor": 0, "goalsAgainst": 0, "goalDifference": 0 },
    "Goiás": { "points": 0, "pointsLost": 0, "matches": 0, "victories": 0, "draws": 0, "losses": 0, "goalsFor": 0, "goalsAgainst": 0, "goalDifference": 0 },
    "Grêmio": { "points": 0, "pointsLost": 0, "matches": 0, "victories": 0, "draws": 0, "losses": 0, "goalsFor": 0, "goalsAgainst": 0, "goalDifference": 0 },
    "Bahia": { "points": 0, "pointsLost": 0, "matches": 0, "victories": 0, "draws": 0, "losses": 0, "goalsFor": 0, "goalsAgainst": 0, "goalDifference": 0 },
    "Vasco": { "points": 0, "pointsLost": 0, "matches": 0, "victories": 0, "draws": 0, "losses": 0, "goalsFor": 0, "goalsAgainst": 0, "goalDifference": 0 },
    "Cuiabá": { "points": 0, "pointsLost": 0, "matches": 0, "victories": 0, "draws": 0, "losses": 0, "goalsFor": 0, "goalsAgainst": 0, "goalDifference": 0 },
  }

  if (Object.keys(matches).length !== 0) {

    for (let i = 1; i <= 38; i++) {
      const round = matches[i];
      
      for (const match of round) {
        calculateMatch(standings, match)
      }
    }
  }

  // Convert 
  const sorted = [];
  for (const [key, value] of Object.entries(standings)) {
    sorted.push({
      team: key,
      ...value
    })
  }

  return sorted;
}

const getResults = (score, oponentScore) => {
  const results = {
    points: 0, 
    pointsLost: 0,
    victory: 0, 
    draw: 0,
    loss: 0, 
    goalsFor: score, 
    goalsAgainst: oponentScore,
    goalDifference: score - oponentScore 
  }

  if (score > oponentScore) {
    results.points = 3
    results.victory = 1
  } else if (score == oponentScore) {
    results.points = 1
    results.pointsLost = 2
    results.draw = 1

  } else {
    results.pointsLost = 3
    results.loss = 1
  }

  return results;
}
    
const calculateStandings = (team, score, oponentScore) => {
  const results = getResults(score, oponentScore)
  team.matches += 1
  team.points += results.points
  team.pointsLost += results.pointsLost
  team.victories += results.victory
  team.draws += results.draw
  team.losses += results.loss
  team.goalsFor += results.goalsFor
  team.goalsAgainst += results.goalsAgainst
  team.goalDifference += results.goalDifference
}