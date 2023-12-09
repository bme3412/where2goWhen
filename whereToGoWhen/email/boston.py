import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import requests
import pandas as pd
import schedule
import time
from datetime import datetime, timedelta

# Function to fetch weather data
def get_weather_data(lat, lon, date, tz, api_key):
    url = f"https://api.openweathermap.org/data/3.0/onecall/day_summary?lat={lat}&lon={lon}&units=imperial&date={date}&tz={tz}&appid={api_key}"
    response = requests.get(url)
    return response.json()

# Function to send email with weather data in HTML format
def send_weather_email(sender_email, receiver_email, password, today_weather, tomorrow_weather):
    # Setup email
    message = MIMEMultipart("alternative")
    message["Subject"] = "Today in Boston"
    message["From"] = sender_email
    message["To"] = receiver_email

    # Format weather data as HTML
    html = f"""
    <html>
        <body>
            <h2>Weather Update for {today_weather['date']}</h2>
            <p>Temperature: Min: {today_weather['temperature']['min']}°, Max: {today_weather['temperature']['max']}°</p>
            <p>Humidity: {today_weather['humidity']['afternoon']}%</p>
            <p>Wind: {today_weather['wind']['max']['speed']} mph, Direction - {today_weather['wind']['max']['direction']}</p>
            <p>Precipitation: {today_weather['precipitation']['total']} mm</p>
            <p>Pressure: {today_weather['pressure']['afternoon']} hPa</p>
            <p>Cloud Cover: {today_weather['cloud_cover']['afternoon']}%</p>
            <h2>Weather Update for {tomorrow_weather['date']}</h2>
            <p>Temperature: Min: {tomorrow_weather['temperature']['min']}°, Max: {tomorrow_weather['temperature']['max']}°</p>
            <p>Humidity: {tomorrow_weather['humidity']['afternoon']}%</p>
            <p>Wind: {tomorrow_weather['wind']['max']['speed']} mph, Direction - {tomorrow_weather['wind']['max']['direction']}</p>
            <p>Precipitation: {tomorrow_weather['precipitation']['total']} mm</p>
            <p>Pressure: {tomorrow_weather['pressure']['afternoon']} hPa</p>
            <p>Cloud Cover: {tomorrow_weather['cloud_cover']['afternoon']}%</p>

        </body>
    </html>
    """

    # Attach HTML weather data to email body
    part = MIMEText(html, "html")
    message.attach(part)

    # Sending the email
    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
        server.login(sender_email, password)
        server.sendmail(sender_email, receiver_email, message.as_string())

    print("Email sent with weather update!")


# Replace with your details
latitude = "42.361145"
longitude = "-71.057083"
today = datetime.now().strftime("%Y-%m-%d")
tomorrow = (datetime.now() + timedelta(days=1)).strftime("%Y-%m-%d")
tz = '+02:00'
api_key='b8c7d88227a34aa268f693c64f746122'
SENDER_EMAIL='erhardbr@gmail.com'
RECEIVER_EMAIL='erhardbr@gmail.com'
EMAIL_PASSWORD='wmsp sbbd pqml xabc'


# Fetch weather data
today_weather = get_weather_data(latitude, longitude, today, tz, api_key)
tomorrow_weather = get_weather_data(latitude, longitude, tomorrow, tz,api_key)

# Schedule the email
schedule.every().day.at("07:00").do(send_weather_email, SENDER_EMAIL, RECEIVER_EMAIL, EMAIL_PASSWORD, today_weather, tomorrow_weather)  # Adjust the time as needed


# Keep running the scheduler
while True:
    schedule.run_pending()
    time.sleep(1)
