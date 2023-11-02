import requests
from bs4 import BeautifulSoup
import pandas as pd

url = 'https://en.wikipedia.org/wiki/List_of_international_airports_by_country'

response = requests.get(url)
soup = BeautifulSoup(response.content, 'html.parser')

data = []

def extract_airport_info(header_tag, continent_name, subregion_name=None, country_name=None):
    next_tag = header_tag.find_next_sibling()
    while next_tag and next_tag.name != 'h2' and next_tag.name != 'h3' and next_tag.name != 'h4':
        if next_tag.name == 'table':
            rows = next_tag.find_all('tr')[1:]
            for row in rows:
                cols = row.find_all('td')
                if len(cols) >= 3:
                    location = cols[0].text.strip()
                    airport_name = cols[1].text.strip()
                    airport_code = cols[2].text.strip()
                    data.append([continent_name, subregion_name, country_name, location, airport_name, airport_code])
        next_tag = next_tag.find_next_sibling()

# Loop through continents (h2)
for continent_tag in soup.find_all('h2'):
    continent = continent_tag.find('span', class_='mw-headline')
    if continent:
        continent_name = continent.text
        next_h3 = continent_tag.find_next_sibling('h3')
        
        while next_h3:
            country_or_subregion = next_h3.find('span', class_='mw-headline').text
            next_h4 = next_h3.find_next_sibling('h4')
            
            # If there are h4 tags under the current h3, then the h3 represents a sub-region
            if next_h4:
                subregion_name = country_or_subregion
                while next_h4:
                    country_name = next_h4.find('span', class_='mw-headline').text
                    extract_airport_info(next_h4, continent_name, subregion_name, country_name)
                    next_h4 = next_h4.find_next_sibling('h4')
                next_h3 = next_h3.find_next_sibling('h3')
            else:
                # h3 represents a country with no subdivisions
                country_name = country_or_subregion
                extract_airport_info(next_h3, continent_name, None, country_name)
                next_h3 = next_h3.find_next_sibling('h3')

df = pd.DataFrame(data, columns=['Continent', 'SubRegion', 'Country', 'Location', 'AirportName', 'AirportCode'])

df.to_csv('airports.csv')
