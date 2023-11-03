import requests
from bs4 import BeautifulSoup
import pandas as pd

url = 'https://en.wikipedia.org/wiki/List_of_the_busiest_airports_in_Asia'
response = requests.get(url)
soup = BeautifulSoup(response.content, 'html.parser')

# Find the table by identifying the anchor with id="2018" and then looking for the table immediately following it.
section_anchor = soup.find('span', {'id': '2018_statistics'})
table = section_anchor.find_parent().find_next_sibling('table')

data = []
processed_cities = set()  # This will help to track processed cities.

for row in table.find_all('tr')[1:]:  # Skipping the header row
    cols = row.find_all('td')
    if len(cols) >= 4:  # Check if there are at least 4 columns
        country = cols[1].text.strip()
        airport = cols[2].text.strip()
        city_served = cols[3].text.strip()
        

                
        # Check if city is already processed
        if city_served not in processed_cities:
            data.append([country, airport, city_served])
            processed_cities.add(city_served)  # Mark the city as processed.

# Convert the data into a DataFrame
df = pd.DataFrame(data, columns=['Country', 'Airport', 'CityServed'])
# Add the Continent column
df['Continent'] = 'Asia'  # Assigning 'Europe' to each row in the column 'Continent'


# Add the PhotoURL column
cities_with_photos = ['Beijing','Dubai','Tokyo','Delhi','Singapore','Manila','Doha','Istanbul']
base_url = "http://localhost:3000/assets/images/cities/"

def generate_photo_url(city):
    if city in cities_with_photos:
        return base_url + city.lower() + ".jpg"
    else:
        return None

df['PhotoURL'] = df['CityServed'].apply(lambda city: generate_photo_url(city))

# Save the data to a CSV file
df.to_csv('asia_photos.csv')
