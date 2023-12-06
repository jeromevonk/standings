import { format } from 'date-fns'; 

export const standingsService = {
  getStandings,
};

const ITERATE_BY_ROUNDS = [1, 2, 3, 4, 5, 7, 8];
const ITERATE_BY_TEAM = [6];

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

    if (ITERATE_BY_ROUNDS.includes(option)) {
      iterateByRounds(standings, matches, option, subOption);
    } else if (ITERATE_BY_TEAM) {
      iterateByTeam(standings, matches, option, subOption);
    }
  }

  // Convert 
  return convertStandingsToArray(standings);
}

// -----------------------------------------------
// Iterate by round in crescent order
// -----------------------------------------------
function iterateByRounds(standings, matches, option, subOption) {
  const details = {
    startRound: 1,
    endRound: 38,
    calculateHome: true,
    calculateAway: true,
  }

  switch (option) {
    case 1:
      // No changes
      break;

    case 2:
      details.calculateAway = false;
      break;

    case 3:
      details.calculateHome = false;
      break;

    case 4:
      details.endRound = 19
      break;

    case 5:
      details.startRound = 20;
      details.endRound = 38
      break;

    case 6:
      // N/A here
      break;

    case 7:
      details.endRound = subOption;
      break;

    case 8:
      details.dateLimit = format(subOption, 'yyyy-MM-dd'); 
      break;
  }

  for (let i = details.startRound; i <= details.endRound; i++) {
    const round = matches[i];

    for (const match of round) {
      calculateMatch(standings, match, details.calculateHome, details.calculateAway, details.dateLimit)
    }
  }
}

// -----------------------------------------------
// Iterate by team
// -----------------------------------------------
function iterateByTeam(standings, matches, _option, subOption) {
  // Get matches order by date in descending order
  const sortedMatches = getMatchesInDescendingOrder(matches);

  // Get array of teams
  const teamNames = Object.keys(standings);
  
  // For every team
  for (const team of teamNames) {
    let toFind = subOption;

    // Look for last X matches
    for (let i = 0; i < sortedMatches.length && toFind > 0; i++) {
      const match = sortedMatches[i];
      
      // Did the team play at home, away?
      if (team === match.homeTeam) {
        calculateMatch(standings, match, true, false, false);
        toFind--;
      } else if(team === match.awayTeam) {
        calculateMatch(standings, match, false, true, false);
        toFind--;
      }
    }
  }
}

// -----------------------------------------------
// Util
// -----------------------------------------------
function convertStandingsToArray(standings) {
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

function calculateMatch(standings, match, calculateHome, calculateAway, dateLimit) {
  const { homeTeam, awayTeam, homeScore, awayScore, started, date } = match;

  // If the game has started 
  // AND
  // if dateLimit defined, it's greather than or equal the date
  // THEN
  // consider the match
  if (started && !(dateLimit && date > dateLimit)) {

    // The home team
    if (calculateHome) calculateStandings(standings[homeTeam], homeScore, awayScore)

    // The away team
    if (calculateAway) calculateStandings(standings[awayTeam], awayScore, homeScore)
  }
}

function getResults(score, oponentScore) {
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

function calculateStandings(team, score, oponentScore) {
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

function getMatchesInDescendingOrder(matches) {
  // Flatten the matches
  const matchesArray = Object.values(matches).flat();

  // Sort by date descending
  return matchesArray
    .filter(item => item.started)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}