from collections import namedtuple

empty_standings = {
    "América-MG": {"P": 0, "PP": 0, "J": 0, "V": 0, "E": 0, "D": 0, "GP": 0, "GC": 0, "SG": 0, "%": 0 },
    "Palmeiras": {"P": 0, "PP": 0, "J": 0, "V": 0, "E": 0, "D": 0, "GP": 0, "GC": 0, "SG": 0, "%": 0 },
    "Coritiba": {"P": 0, "PP": 0, "J": 0, "V": 0, "E": 0, "D": 0, "GP": 0, "GC": 0, "SG": 0, "%": 0 },
    "Corinthians": {"P": 0, "PP": 0, "J": 0, "V": 0, "E": 0, "D": 0, "GP": 0, "GC": 0, "SG": 0, "%": 0 },
    "Fortaleza": {"P": 0, "PP": 0, "J": 0, "V": 0, "E": 0, "D": 0, "GP": 0, "GC": 0, "SG": 0, "%": 0 },
    "Fluminense": {"P": 0, "PP": 0, "J": 0, "V": 0, "E": 0, "D": 0, "GP": 0, "GC": 0, "SG": 0, "%": 0 },
    "Santos": {"P": 0, "PP": 0, "J": 0, "V": 0, "E": 0, "D": 0, "GP": 0, "GC": 0, "SG": 0, "%": 0 },
    "São Paulo": {"P": 0, "PP": 0, "J": 0, "V": 0, "E": 0, "D": 0, "GP": 0, "GC": 0, "SG": 0, "%": 0 },
    "Bragantino": {"P": 0, "PP": 0, "J": 0, "V": 0, "E": 0, "D": 0, "GP": 0, "GC": 0, "SG": 0, "%": 0 },
    "Cruzeiro": {"P": 0, "PP": 0, "J": 0, "V": 0, "E": 0, "D": 0, "GP": 0, "GC": 0, "SG": 0, "%": 0 },
    "Atlético-MG": {"P": 0, "PP": 0, "J": 0, "V": 0, "E": 0, "D": 0, "GP": 0, "GC": 0, "SG": 0, "%": 0 },
    "Athletico-PR": {"P": 0, "PP": 0, "J": 0, "V": 0, "E": 0, "D": 0, "GP": 0, "GC": 0, "SG": 0, "%": 0 },
    "Flamengo": {"P": 0, "PP": 0, "J": 0, "V": 0, "E": 0, "D": 0, "GP": 0, "GC": 0, "SG": 0, "%": 0 },
    "Botafogo": {"P": 0, "PP": 0, "J": 0, "V": 0, "E": 0, "D": 0, "GP": 0, "GC": 0, "SG": 0, "%": 0 },
    "Internacional": {"P": 0, "PP": 0, "J": 0, "V": 0, "E": 0, "D": 0, "GP": 0, "GC": 0, "SG": 0, "%": 0 },
    "Goiás": {"P": 0, "PP": 0, "J": 0, "V": 0, "E": 0, "D": 0, "GP": 0, "GC": 0, "SG": 0, "%": 0 },
    "Grêmio": {"P": 0, "PP": 0, "J": 0, "V": 0, "E": 0, "D": 0, "GP": 0, "GC": 0, "SG": 0, "%": 0 },
    "Bahia": {"P": 0, "PP": 0, "J": 0, "V": 0, "E": 0, "D": 0, "GP": 0, "GC": 0, "SG": 0, "%": 0 },
    "Vasco": {"P": 0, "PP": 0, "J": 0, "V": 0, "E": 0, "D": 0, "GP": 0, "GC": 0, "SG": 0, "%": 0 },
    "Cuiabá": {"P": 0, "PP": 0, "J": 0, "V": 0, "E": 0, "D": 0, "GP": 0, "GC": 0, "SG": 0, "%": 0 },
}

# Define a named tuple for results
Results = namedtuple('Results', ['points', 'points_lost','victory', 'draw', 'loss', 'goals_for', 'goals_against', 'goal_difference'])
    
def get_results(score, oponent_score):
    if score > oponent_score:
        points = 3
        points_lost = 0
        victory = 1
        draw = 0
        loss = 0
    elif score == oponent_score:
        points = 1
        points_lost = 2
        victory = 0
        draw = 1
        loss = 0
    else:
        points = 0
        points_lost = 3
        victory = 0
        draw = 0
        loss = 1
    return Results(points, points_lost, victory, draw, loss, score, oponent_score, (score - oponent_score))

def sort_by_param(standings, param, descending = True):
    return sorted(
        standings.items(), 
        key=lambda x: (x[1][param], x[1]['V'], x[1]['SG'], x[1]['GP']), #TODO fix this for PP descending
        reverse = descending)

def calculate_standings(team, score, oponent_score):
    results = get_results(score, oponent_score)
    team['J'] += 1
    team['P'] += results.points
    team['PP'] += results.points_lost
    team['V'] += results.victory 
    team['E'] += results.draw 
    team['D'] += results.loss
    team['GP'] += results.goals_for
    team['GC'] += results.goals_against
    team['SG'] += results.goal_difference
    
def calculate_match(standings, match):
    homeTeam = match["homeTeam"]
    awayTeam = match["awayTeam"]
    homeScore = match["homeScore"]
    awayScore = match["awayScore"]
    
    # The home team
    calculate_standings(standings[homeTeam], homeScore, awayScore)
    
    # The away team
    calculate_standings(standings[awayTeam], awayScore, homeScore)