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
processed_cities = set()  # This will help to track processed cities.

for row in table.find_all('tr')[1:]:  # Skipping the header row
    cols = row.find_all('td')
    if len(cols) >= 4:  # Check if there are at least 4 columns
        country = cols[1].text.strip()
        airport = cols[2].text.strip()
        city_served = cols[3].text.strip()
        
        # Applying the desired name changes
        if city_served == "Palma de Mallorca":
            city_served = "Mallorca"
        elif city_served == "Málaga":
            city_served = "Malaga"
        elif city_served == "Düsseldorf":
            city_served = "Dusseldorf"
        elif city_served == "Cologne/Bonn":
            city_served = "Cologne"
        elif city_served == "Gran Canaria":
            city_served = "Canaria"
        elif city_served == "Milan/Bergamo":
            city_served = "Milan"
        
        
            
        # Check if city is already processed
        if city_served not in processed_cities:
            data.append([country, airport, city_served])
            processed_cities.add(city_served)  # Mark the city as processed.

# Convert the data into a DataFrame
df = pd.DataFrame(data, columns=['Country', 'Airport', 'CityServed'])

# Add the PhotoURL column
cities_with_photos = ['Alicante','Amsterdam','Athens', 'Barcelona', 'Berlin','Bologna','Brussels','Bucharest','Budapest','Canaria','Catania','Cologne','Copenhagen','Dublin','Dusseldorf','Frankfurt','Hamburg','Helsinki','Heraklion','Ibiza','Lisbon','Lyon','Madrid', 'Malaga','Mallorca','Marseille','Milan','Munich','Naples','Nice','Palermo','Paris', 'Porto','Prague','Rome','Seville','Stockholm','Stuttgart','Valencia','Vienna','Tenerife','Thessaloniki','Toulouse','Venice','Warsaw']
base_url = "http://localhost:3000/assets/images/cities/"

def generate_photo_url(city):
    if city in cities_with_photos:
        return base_url + city.lower() + ".jpg"
    else:
        return None

df['PhotoURL'] = df['CityServed'].apply(lambda city: generate_photo_url(city))

# Save the data to a CSV file
df.to_csv('euro_photos.csv')
