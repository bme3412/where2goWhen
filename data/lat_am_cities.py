import pandas as pd
import requests
from io import StringIO
from bs4 import BeautifulSoup

# The URL of the Wikipedia page
url = 'https://en.wikipedia.org/wiki/List_of_the_busiest_airports_in_Latin_America'

# Fetch the content of the URL with requests
response = requests.get(url)

# Use BeautifulSoup to parse the HTML content
soup = BeautifulSoup(response.text, 'html.parser')

# Find the appropriate table using the 'wikitable sortable' class
table = soup.find('table', {'class': 'wikitable sortable'})

# Convert the table to a string
html_string = str(table)

# Use StringIO to read the string as if it were a file
df_list = pd.read_html(StringIO(html_string))

# Assuming the desired table is the first one in the list (index 0)
df = df_list[0]

# Select only the columns we're interested in, assuming the columns are named 'Airport', 'City Served', and 'Country'
# You may need to adjust the column names based on how they are named in the table

# Assuming df is already defined and contains the data from the table
# Renaming the columns as per your requirement
selected_columns_df = df[['Airport', 'City served', 'Country']].copy()
selected_columns_df = selected_columns_df.rename(columns={
    'City served': 'CityServed',
    'Country': 'Country',
    'Airport': 'Airport'
})

# Adding 'Continent' column with default values
selected_columns_df['Continent'] = 'Latin America'  # Modify as per the actual continent

# Define a function to replace the city names
def replace_city_names(city_served):
    city_name_corrections = {
        "Mexico City": "Mexico_City",
        "São Paulo": "Sao_Paulo",
        "Bogotá": "Bogota",
        "Cancún": "Cancun",
        "Panama City": "Panama_City",
        "Buenos Aires": "Buenos_Aires",
        "Brasília" : "Brasilia",
        "San Juan" : "San_Juan",
        "Rio de Janeiro" : "Rio_de_Janeiro",
        "Medellín" : "Medellin",
        "Belo Horizonte":"Belo_Horizonte",
        "Punta Cana":"Punta_Cana",
        "Los Cabos":"Los_Cabos",
        "Porto Alegre":"Porto_Alegre",
        "Puerto Vallarta":"Puerto_Vallarta",
        "San José":"San_Jose",
        "Santo Domingo" :"Santo_Domingo",
    }
    return city_name_corrections.get(city_served, city_served)

# Apply the function to adjust the 'CityServed' column
selected_columns_df['CityServed'] = selected_columns_df['CityServed'].apply(replace_city_names)

# Define the list of cities for which you have photos, using URL-friendly names
cities_with_photos = ['Santiago','Lima','Guadalajara','Tijuana','Monterrey','Campinas','Recife',
                      'Salvador','Cali','Cartagena','Fortaleza','Mexico_City','Sao_Paulo',
                      'Bogota','Cancun','Panama_City','Buenos_Aires','Brasilia','San_Juan',
                      'Rio_de_Janeiro','Medellin','Belo_Horizonte','Punta_Cana','Los_Cabos',
                      'Porto_Alegre','Puerto_Vallarta','San_Jose','Santo_Domingo']

# Base URL for the photos
base_url = "http://localhost:3000/assets/images/cities/"

# Function to generate photo URL
def generate_photo_url(city_url):
    if city_url in cities_with_photos:
        return base_url + city_url.lower() + ".jpg"
    else:
        return None

# Apply the generate_photo_url function to the 'CityServedURL' column to create the 'PhotoURL' column
selected_columns_df['PhotoURL'] = selected_columns_df['CityServed'].apply(generate_photo_url)

# Reorder the columns as per your requirement, excluding 'CityServedURL' if it's not needed in the final CSV
final_df = selected_columns_df[['Country','Airport','CityServed','Continent','PhotoURL']]

# Save the DataFrame to CSV
final_df.to_csv('lat_am_photos.csv', index=False)
