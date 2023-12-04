import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import requests
import pandas as pd

import os
from dotenv import load_dotenv

# Function to fetch weather data
def get_weather_data(lat, lon, api_key, exclude='current,minutely,daily'):
    url = f"https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={exclude}&appid={api_key}"
    response = requests.get(url)
    return response.json()

# Function to send email with weather data in HTML format
def send_weather_email(sender_email, receiver_email, password, html_weather_data):
    # Setup email
    message = MIMEMultipart("alternative")
    message["Subject"] = "Weather Update"
    message["From"] = sender_email
    message["To"] = receiver_email

    # Attach HTML weather data to email body
    part = MIMEText(html_weather_data, "html")
    message.attach(part)

    # Sending the email
    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
        server.login(sender_email, password)
        server.sendmail(sender_email, receiver_email, message.as_string())

    print("Email sent with weather update!")



# Replace with your details
latitude = "40.712776"
longitude = "-74.005974"
api_key = os.getenv("API_KEY")
sender_email = os.getenv("SENDER_EMAIL")
receiver_email = os.getenv("RECEIVER_EMAIL")
password = os.getenv("EMAIL_PASSWORD")


# Get weather data
weather_data = get_weather_data(latitude, longitude, api_key)
# Extracting hourly weather data
hourly_data = weather_data['hourly']


# Convert to DataFrame and format
df = pd.DataFrame(hourly_data)
df['dt'] = pd.to_datetime(df['dt'], unit='s')
df['weather_description'] = df['weather'].apply(lambda x: x[0]['description'])
df.drop('weather', axis=1, inplace=True)
df['temp'] = df['temp'] - 273.15
df['feels_like'] = df['feels_like'] - 273.15

# Convert the DataFrame to HTML
html_weather_data = df[['dt', 'temp', 'feels_like', 'weather_description']].to_html(index=False)

# Send email with weather data
send_weather_email(sender_email, receiver_email, password, html_weather_data)
