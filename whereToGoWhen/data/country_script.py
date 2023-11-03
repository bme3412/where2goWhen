from bs4 import BeautifulSoup
import pandas as pd
import requests

# URL of the website
url = "https://en.wikivoyage.org/wiki/Asia"

response = requests.get(url)

# Ensure the request was successful
response.raise_for_status()
base_url = "https://en.wikivoyage.org/wiki/{}"
soup = BeautifulSoup(response.content, 'html.parser')

td_tags = soup.select('div#region_list td > b')

# Extract the region names
region_names = [tag.find('a', title=True).text for tag in td_tags if tag.find('a', title=True)]

data = []

# For each region, format the URL, fetch the page content, and extract country names
for region in region_names:
    url = base_url.format(region)
    response = requests.get(url)
    
    # Make sure the request was successful
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Find the country names for this region
        country_tags = soup.select('div#region_list td > b')
        countries = [tag.find('a', title=True).text for tag in country_tags if tag.find('a', title=True)]
        
        for country in countries:
            country_url = base_url.format(country)
            country_response = requests.get(country_url)

            if country_response.status_code == 200:
                country_soup = BeautifulSoup(country_response.content, 'html.parser')
                
                # Find the cities that match the specified structure
                city_tags = country_soup.select('li span.vcard span.noprint.listing-coordinates[style="display:none"] span.geo')
                
                cities = [tag.parent.parent.parent.find('a', title=True).text for tag in city_tags if tag.parent.parent.parent.find('a', title=True)]
                
                for city in cities:
                    data.append({
                        "Region": region,
                        "Country": country,
                        "City": city
                    })
# Convert the data to a dataframe
df = pd.DataFrame(data)

# Save the dataframe to CSV
df.to_csv('asia_cities.csv', index=False)

print("Saved data to asia_cities.csv")
