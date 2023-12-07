"""from: https://aviationstack.com/dashboard"""
import requests
import pandas as pd
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import pytz
import schedule, time
from datetime import datetime
import pytz
import time
import sched

# Function to convert UTC time to a specified timezone
def convert_time(row, column_name, new_timezone):
    # Parse the datetime and set timezone to UTC
    dt = pd.to_datetime(row[column_name]).replace(tzinfo=pytz.UTC)

    # Convert to the new timezone
    return dt.astimezone(pytz.timezone(new_timezone))

def fetch_and_process_active_flights(access_key):
    # Fetch data from API
    params = {'access_key': access_key}
    api_result = requests.get('http://api.aviationstack.com/v1/flights', params)

    # Convert JSON to DataFrame
    json_data = api_result.json()
    df = pd.json_normalize(json_data['data'])

    # Filter active flights and create a copy to avoid SettingWithCopyWarning
    df_active = df[df['flight_status'] == 'active'].copy()

    # Convert departure times to local and New York time
    nyc_timezone = 'America/New_York'
    for col in ['departure.scheduled', 'departure.estimated']:
        df_active[f'{col}.local'] = df_active.apply(lambda row: convert_time(row, col, row['departure.timezone']), axis=1)
        df_active[f'{col}.NYC'] = df_active.apply(lambda row: convert_time(row, col, nyc_timezone), axis=1)

    # Select and sort relevant columns
    columns_to_display = [
        'flight.number', 'flight_date', 'flight_status', 'departure.airport',
        'departure.timezone', 'departure.scheduled', 'departure.scheduled.local',
        'departure.scheduled.NYC', 'departure.estimated', 'departure.estimated.local',
        'departure.estimated.NYC'
    ]
    return df_active[columns_to_display].sort_values(by=['departure.scheduled.NYC'])


# Example usage
access_key = ''
df_active_flights = fetch_and_process_active_flights(access_key)

# Your original send_email function (make sure 'planes' parameter is passed)
def send_email(planes):
    print('Preparing to send email...')
    # Check if 'planes' is a valid DataFrame and convert to HTML; otherwise, use a default message
    if isinstance(planes, pd.DataFrame) and not planes.empty:
        html = planes.to_html()
    else:
        html = "<p>No data available to display.</p>"

    # Gmail credentials and recipient
    sender_email = "erhardbr@gmail.com"
    receiver_email = "erhardbr@gmail.com"
    password = "wmsp sbbd pqml xabc"

    # Email content
    message = MIMEMultipart("alternative")
    message["Subject"] = "Up in the Air"
    message["From"] = sender_email
    message["To"] = receiver_email

    # Email body (text and HTML)
    text = "Check out all the planes."
    part1 = MIMEText(text, "plain")
    part2 = MIMEText(html, "html")
    message.attach(part1)
    message.attach(part2)

    # Sending the email
    try:
        server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
        server.login(sender_email, password)
        server.sendmail(sender_email, receiver_email, message.as_string())
        server.quit()
        print("Email sent successfully.")
    except Exception as e:
        print(f"Failed to send email: {e}")

# Modified send_email_notification to use send_email function
def send_email_notification(flight_number, flight_details):
    print(f"Email sent: Flight {flight_number} has left")
    send_email(flight_details)

def check_flights_and_notify(df):
    # Get current time in NYC
    nyc_time = datetime.now(pytz.timezone('America/New_York'))

    for index, row in df.iterrows():
        # Convert 'departure.estimated.NYC' to datetime object
        estimated_departure = pd.to_datetime(row['departure.estimated.NYC'])

        # Check if current time is later than estimated departure time
        if nyc_time > estimated_departure:
            flight_details = pd.DataFrame([row])
            send_email_notification(row['flight.number'], flight_details)
        print(f'Not yet for {row["flight.number"]}')
       

# Example usage
# df_active_flights = your DataFrame
check_flights_and_notify(df_active_flights)

def scheduled_job():
    print("Fetching and processing active flights...")
    access_key = ''
    df_active_flights = fetch_and_process_active_flights(access_key)
    check_flights_and_notify(df_active_flights)
    print("Finished processing.")

# Schedule the job to run every hour
schedule.every(1).hours.do(scheduled_job)

print("Scheduler started. Running scheduled jobs every hour.")
while True:
    schedule.run_pending()
    time.sleep(1)