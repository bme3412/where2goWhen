import pandas as pd

# Read the CSV files into DataFrames
euro_photos_df = pd.read_csv('euro_photos.csv')
lat_am_photos_df = pd.read_csv('lat_am_photos.csv')

# Concatenate the DataFrames
combined_df = pd.concat([euro_photos_df, lat_am_photos_df], ignore_index=True)

# Drop duplicates based on the 'CityServed' column, keeping the first entry
combined_df = combined_df.drop_duplicates(subset=['CityServed'], keep='first')

# Save the concatenated DataFrame to a new CSV file without duplicates and without the index column
combined_df.to_csv('city_photos.csv', index=False)
