import json
import requests
requests.packages.urllib3.disable_warnings() # disable certificate warnings

RUN_LOCAL=True

def parse_round(data):
    round = []
    for item in data:
        if item["jogo_ja_comecou"]:
            # print(item)
            round.append({
                "homeTeam" : item["equipes"]["mandante"]["nome_popular"],
                "awayTeam" : item["equipes"]["visitante"]["nome_popular"],
                "homeScore" : item["placar_oficial_mandante"],
                "awayScore" : item["placar_oficial_visitante"],
                "date" : item["data_realizacao"][:10]
            })
    print(f'Found {len(round)} matches')
    return round

def run(_event, _context):
    rounds = {}
    
    try:
        keep_looking = True
        look_for = 1

        while keep_looking:
            print(f'Trying to get round numer {look_for}')
            r = requests.get(f'https://api.globoesporte.globo.com/tabela/d1a37fa4-e948-43a6-ba53-ab24ab3a45b1/fase/fase-unica-campeonato-brasileiro-2023/rodada/{look_for}/jogos/', verify=False)
            data = r.json()

            if len(data) > 0:
                print(f'Got contest number {look_for}')
                new_round = parse_round(data)

                # Insert in map
                rounds[look_for] = new_round

                # Increment
                look_for += 1
            else:
                print(f'No contest number {look_for} found. End.')
                keep_looking = False
                
        # Save the dictionary to a JSON file
        with open("results.json", 'w', encoding='utf-8') as json_file:
            json.dump(rounds, json_file, ensure_ascii=False, indent=2)
    except Exception as e:
        print(e)

if RUN_LOCAL:
    run(None, None)