import json

def print_results(sorted_standings):
    print(f"{'Team':<15} {'J':<3} {'P':<3} {'PP':<3} {'V':<3} {'E':<3} {'D':<3} {'GP':<3} {'GC':<3} {'SG':<3}")
    for key, value in sorted_standings:
        print(f"{key:<15} {value['J']:<3} {value['P']:<3} {value['PP']:<3} {value['V']:<3} {value['E']:<3} {value['D']:<3} {value['GP']:<3} {value['GC']:<3} {value['SG']:<3}")
        
def read_results_from_file(filename):
    with open(filename, 'r', encoding='utf-8') as file:
        rounds = json.load(file)
    return rounds

def write_csv_file(filename, sorted_standings):    
    with open(filename, 'w') as csv_file:
        # Write header
        csv_file.write("Team,J,P,PP,V,E,D,GP,GC,SG\n")

        # Write data
        for team, stats in sorted_standings:
            csv_file.write(f"{team},{stats['J']},{stats['P']},{stats['PP']},{stats['V']},{stats['E']},{stats['D']},{stats['GP']},{stats['GC']},{stats['SG']}\n")