import requests
from bs4 import BeautifulSoup
import pandas as pd

url = 'https://en.wikipedia.org/wiki/List_of_the_busiest_airports_in_the_European_Union'

response = requests.get(url)
soup = BeautifulSoup(response.content, 'html.parser')

# Find the table by identifying the anchor with id="2021" and then looking for the table immediately following it.
section_anchor = soup.find('span', {'id': '2021'})
table = section_anchor.find_parent().find_next_sibling('table')

data = []

# Extract the relevant data from the table
for row in table.find_all('tr')[1:]:  # Skipping the header row
    cols = row.find_all('td')
    if len(cols) >= 4:  # Check if there are at least 4 columns
        country = cols[1].text.strip()
        airport = cols[2].text.strip()
        city_served = cols[3].text.strip()
        data.append([country, airport, city_served])

# Convert the data into a DataFrame
df = pd.DataFrame(data, columns=['Country', 'Airport', 'CityServed'])

# Save the data to a CSV file
df.to_csv('euro_airports.csv')
