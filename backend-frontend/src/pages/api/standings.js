export default function handler(req, res) {
  const response = [
    { "team": "Palmeiras", "points": 62, "points_lost": 40, "matches": 34, "victories": 18, "draws": 8, "losses": 8, "goals_for": 56, "goals_against": 30, "goal_difference": 26},
    { "team": "Botafogo", "points": 60, "points_lost": 39, "matches": 33, "victories": 18, "draws": 6, "losses": 9, "goals_for": 53, "goals_against": 30, "goal_difference": 23},
    { "team": "Grêmio", "points": 59, "points_lost": 43, "matches": 34, "victories": 18, "draws": 5, "losses": 11, "goals_for": 57, "goals_against": 50, "goal_difference": 7},
    { "team": "Bragantino", "points": 59, "points_lost": 40, "matches": 33, "victories": 16, "draws": 11, "losses": 6, "goals_for": 46, "goals_against": 29, "goal_difference": 17},
    { "team": "Atlético-MG", "points": 57, "points_lost": 45, "matches": 34, "victories": 16, "draws": 9, "losses": 9, "goals_for": 43, "goals_against": 27, "goal_difference": 16},
    { "team": "Flamengo", "points": 57, "points_lost": 42, "matches": 33, "victories": 16, "draws": 9, "losses": 8, "goals_for": 50, "goals_against": 37, "goal_difference": 13},
    { "team": "Athletico-PR", "points": 51, "points_lost": 51, "matches": 34, "victories": 13, "draws": 12, "losses": 9, "goals_for": 47, "goals_against": 39, "goal_difference": 8},
    { "team": "Fluminense", "points": 47, "points_lost": 52, "matches": 33, "victories": 13, "draws": 8, "losses": 12, "goals_for": 43, "goals_against": 42, "goal_difference": 1},
    { "team": "Cuiabá", "points": 47, "points_lost": 55, "matches": 34, "victories": 13, "draws": 8, "losses": 13, "goals_for": 36, "goals_against": 35, "goal_difference": 1},
    { "team": "São Paulo", "points": 46, "points_lost": 53, "matches": 33, "victories": 12, "draws": 10, "losses": 11, "goals_for": 37, "goals_against": 35, "goal_difference": 2},
    { "team": "Corinthians", "points": 44, "points_lost": 58, "matches": 34, "victories": 10, "draws": 14, "losses": 10, "goals_for": 39, "goals_against": 39, "goal_difference": 0},
    { "team": "Fortaleza", "points": 43, "points_lost": 53, "matches": 32, "victories": 12, "draws": 7, "losses": 13, "goals_for": 36, "goals_against": 37, "goal_difference": -1},
    { "team": "Internacional", "points": 43, "points_lost": 59, "matches": 34, "victories": 11, "draws": 10, "losses": 13, "goals_for": 38, "goals_against": 43, "goal_difference": -5},
    { "team": "Santos", "points": 42, "points_lost": 60, "matches": 34, "victories": 11, "draws": 9, "losses": 14, "goals_for": 37, "goals_against": 55, "goal_difference": -18},
    { "team": "Vasco", "points": 40, "points_lost": 59, "matches": 33, "victories": 11, "draws": 7, "losses": 15, "goals_for": 35, "goals_against": 43, "goal_difference": -8},
    { "team": "Bahia", "points": 38, "points_lost": 64, "matches": 34, "victories": 10, "draws": 8, "losses": 16, "goals_for": 39, "goals_against": 47, "goal_difference": -8},
    { "team": "Cruzeiro", "points": 37, "points_lost": 59, "matches": 32, "victories": 9, "draws": 10, "losses": 13, "goals_for": 29, "goals_against": 28, "goal_difference": 1},
    { "team": "Goiás", "points": 35, "points_lost": 67, "matches": 34, "victories": 8, "draws": 11, "losses": 15, "goals_for": 34, "goals_against": 49, "goal_difference": -15},
    { "team": "Coritiba", "points": 29, "points_lost": 73, "matches": 34, "victories": 8, "draws": 5, "losses": 21, "goals_for": 39, "goals_against": 67, "goal_difference": -28},
    { "team": "América-MG", "points": 21, "points_lost": 81, "matches": 34, "victories": 4, "draws": 9, "losses": 21, "goals_for": 39, "goals_against": 71, "goal_difference": -32}
  ];

  return res.status(200).json(response);
}
