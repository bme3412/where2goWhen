import smtplib
import schedule
import time
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def send_email():
    # Gmail credentials and recipient
    sender_email = "erhardbr@gmail.com"
    receiver_email = "erhardbr@gmail.com"
    password = "wmsp sbbd pqml xabc"

    # Email content
    message = MIMEMultipart("alternative")
    message["Subject"] = "Scheduled Email"
    message["From"] = sender_email
    message["To"] = receiver_email

    # Email body
    text = "Hi, this is a scheduled email from Gmail."
    part = MIMEText(text, "plain")
    message.attach(part)

    # Sending the email
    server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
    server.login(sender_email, password)
    server.sendmail(sender_email, receiver_email, message.as_string())
    server.quit()
    print("Email sent!")

# Schedule the email (example: send on a specific date and time)
schedule.every().day.at("18:26").do(send_email)  # Adjust the time as needed

# Keep running the scheduler
while True:
    schedule.run_pending()
    time.sleep(1)
