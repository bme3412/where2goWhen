import pandas as pd
from bs4 import BeautifulSoup
import requests

# URL of the website
url = "https://en.wikivoyage.org/wiki/Latin_America"


response = requests.get(url)

# Ensure the request was successful
response.raise_for_status()
soup = BeautifulSoup(response.content, 'html.parser')


# Initialize lists to store the extracted data
continents = []
regions_list = []
countries = []

# Find all the region sections
regions = soup.find_all('h4')
# Verify that the 'South_America' section exists
south_america_header = soup.find('span', {'id': 'South_America'})  # Often the actual headers might be in <span> tags within <h3>
if south_america_header:
    # Assuming 'div' with 'id=region_list' follows the header
    region_list_div = south_america_header.find_next_sibling('div', {'id': 'region_list'})
    if region_list_div:
        south_america_tables = region_list_div.find_all('table')
        for table in south_america_tables:
            country_name = table.find('a').get_text()
            continents.append('South America')
            regions_list.append('South America')
            countries.append(country_name)
    else:
        print("Could not find the region list div for South America.")
else:
    print("Could not find the South America header.")


# Function to extract data for each region
def extract_region_data(region_header, continent_name):
    region_name = region_header.get_text()
    region_tables = region_header.find_next('div', {'id': 'region_list'}).find_all('table')
    
    for table in region_tables:
        country_name = table.find('a').get_text()
        continents.append(continent_name)
        regions_list.append(region_name)
        countries.append(country_name)

# Process Caribbean and Central America regions
for region in regions:
    extract_region_data(region, 'North America')

# Process South America
south_america_tables = south_america_header.find_next('div', {'id': 'region_list'}).find_all('table')
for table in south_america_tables:
    country_name = table.find('a').get_text()
    continents.append('South America')
    regions_list.append('South America')
    countries.append(country_name)

# Create DataFrame
df = pd.DataFrame({
    'Continent': continents,
    'Region': regions_list,
    'Country': countries
})

df.to_csv('latin_america.csv')
