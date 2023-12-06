import json
import MySQLdb

INPUT_FILE='results.json'

def parse_data(results):
    migrations = []
    
    for round_number, matches in results.items():
        for match in matches:
            row = (round_number, match['homeTeam'], match['awayTeam'], match['homeScore'], match['awayScore'], match['date'], match['started'])
            migrations.append(row)
    
    return migrations


# Open the file in read mode
with open(INPUT_FILE, 'r') as file:
    # Load JSON data from the file
    results = json.load(file)
    
# Connect to the database
connection = MySQLdb.connect(
  host=DATABASE_HOST,
  user=DATABASE_USERNAME,
  passwd=DATABASE_PASSWORD,
  db=DATABASE,
  autocommit=True,
  ssl_mode="VERIFY_IDENTITY",
  ssl={ "ca": "/etc/ssl/certs/ca-certificates.crt" }
)

try:
    # Create a cursor to interact with the database
    cursor = connection.cursor()
    
    # Truncate
    truncate_query = "TRUNCATE TABLE brasileirao23.matches"
    cursor.execute(truncate_query)
    
    print("Table truncated!")

    # Insert multiple rows into 'matches' table using executemany()
    insert_query = """
    INSERT INTO brasileirao23.matches (
        round,
        homeTeam,
        awayTeam,
        homeScore,
        awayScore,
        matchDate,
        started
    )
    VALUES (%s, %s, %s, %s, %s, %s, %s)
    """

    # Data to be inserted for multiple rows
    data_to_insert = parse_data(results)

    # Execute the insert query with executemany()
    cursor.executemany(insert_query, data_to_insert)

    # Commit the transaction
    connection.commit()

    print("Data inserted successfully!")

    # Execute "SELECT * FROM matches" query
    cursor.execute("SELECT * FROM matches")

    # Fetch all the rows
    rows = cursor.fetchall()

    # Print out the selected rows
    print("Selected rows from 'matches' table:")
    for row in rows:
        print(row)

except MySQLdb.Error as e:
    print("MySQL Error:", e)

finally:
    # Close the cursor and connection
    cursor.close()
    connection.close()