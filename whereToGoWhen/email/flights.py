"""from: https://aviationstack.com/dashboard"""
import requests
import pandas as pd
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import pytz
import schedule, time


params = {
    'access_key': ''
}

api_result = requests.get('http://api.aviationstack.com/v1/flights', params)

api_response = api_result.json()


def find_planes():
    params = {
        'access_key': '2494fe0f91eb1f3d38f7ad3e6c1318ee'
    }

    api_result = requests.get(
        'http://api.aviationstack.com/v1/flights', params)

    api_response = api_result.json()

    # Convert the 'data' part of the response to a DataFrame
    df = pd.json_normalize(api_response['data'])
    df = df[df['departure.airport'].notna()]
    df = df[df['arrival.airport'].notna()]
    df = df[df['flight_status']=='active']
    # Convert the 'UTC_Timestamp' column to datetime objects
    # Convert columns to datetime format (if not already converted)
    df_active = df[df['flight_status'] == 'active'].copy()

    df_active['departure.estimated'] = pd.to_datetime(df_active['departure.estimated'])
    df_active['arrival.estimated'] = pd.to_datetime(df_active['arrival.estimated'])

    # Timezone for Boston
    boston_tz = pytz.timezone('America/New_York')

    # Convert times to Boston time
    df_active.loc[:, 'Departure estimated NYC'] = df_active['departure.estimated'].dt.tz_convert(boston_tz)
    df_active.loc[:, 'Arrival estimated NYC'] = df_active['arrival.estimated'].dt.tz_convert(boston_tz)



    df_print = df_active[['flight_date', 'departure.airport', 'arrival.airport','departure.delay','departure.estimated', 'departure.actual','arrival.estimated', 'arrival.actual',
                         'Departure estimated NYC','Arrival estimated NYC']]
    return df_print


def send_email():
    
    planes = find_planes()
    print('API called')
    # Convert DataFrame to HTML
    html = planes.to_html()

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
    text = "Check out all thm planes."
    part1 = MIMEText(text, "plain")
    part2 = MIMEText(html, "html")
    message.attach(part1)
    message.attach(part2)

    # Sending the email
    server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
    server.login(sender_email, password)
    server.sendmail(sender_email, receiver_email, message.as_string())
    server.quit()
    print("Email sent!")



# Schedule the email to be sent every hour from 13:00 to 20:00
for hour in range(13, 21):
    schedule.every().day.at(f"{hour:02d}:00").do(lambda:send_email())

# Keep running the scheduler
while True:
    schedule.run_pending()
    time.sleep(1)