from util import read_results_from_file, print_results, write_csv_file
from standings import get_results, empty_standings, sort_by_param, calculate_match
import copy

INPUT_FILE = "results.json"
OUTPUT_FILE = "csv/sorted_RETURNO.csv"

rounds = read_results_from_file(INPUT_FILE)
standings = copy.deepcopy(empty_standings)

FIRST_ROUND = 20
LAST_ROUND = 38

# For every round we want
for i in range(FIRST_ROUND, LAST_ROUND + 1):
    round = rounds[str(i)]
    
    # Get every match
    for match in round:
        calculate_match(standings, match)
        
# Print to console
sorted_standings = sort_by_param(standings, 'P', descending = True)
print_results(sorted_standings)

# Writing to CSV file
write_csv_file(OUTPUT_FILE, sorted_standings)