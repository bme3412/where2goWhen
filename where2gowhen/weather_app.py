from flask import Flask, request, jsonify
import asyncio
import python_weather
import os

app = Flask(__name__)

async def getweather(city):
    async with python_weather.Client(unit=python_weather.IMPERIAL) as client:
        weather = await client.find(city)
        return {
            "current_temperature": weather.current.temperature,
            "forecasts": [{"date": forecast.date, "high": forecast.high, "low": forecast.low} for forecast in weather.forecasts]
        }

@app.route('/weather', methods=['GET'])
def weather():
    city = request.args.get('city', 'New York')  # Default to New York if no city is provided
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    weather_data = loop.run_until_complete(getweather(city))
    loop.close()
    return jsonify(weather_data)

if __name__ == '__main__':
    if os.name == 'nt':
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    app.run(debug=True)
