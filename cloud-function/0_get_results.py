import json
import requests
requests.packages.urllib3.disable_warnings() # disable certificate warnings

OUTPUT_FILE='results.json'
RUN_LOCAL=True

def parse_round(data):
    round = []
    for item in data:
        round.append({
            "homeTeam" : item["equipes"]["mandante"]["nome_popular"],
            "awayTeam" : item["equipes"]["visitante"]["nome_popular"],
            "homeScore" : item["placar_oficial_mandante"],
            "awayScore" : item["placar_oficial_visitante"],
            "date" : item["data_realizacao"][:10],
            "started" : item["jogo_ja_comecou"]
        })
    return round

def run(_event, _context):
    rounds = {}
    
    try:
        for i in range(1, 39):
            print(f'Get round number {i}')
            r = requests.get(f'https://api.globoesporte.globo.com/tabela/d1a37fa4-e948-43a6-ba53-ab24ab3a45b1/fase/fase-unica-campeonato-brasileiro-2023/rodada/{i}/jogos/', verify=False)
            data = r.json()

            if len(data) > 0:
                new_round = parse_round(data)

                # Insert in map
                rounds[i] = new_round
            else:
                print(f'No contest number {i} found. End.')
                
        # Save the dictionary to a JSON file
        with open(OUTPUT_FILE, 'w', encoding='utf-8') as json_file:
            json.dump(rounds, json_file, ensure_ascii=False, indent=2)
    except Exception as e:
        print(e)

if RUN_LOCAL:
    run(None, None)