const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');
const cors = require('cors');
const dotenv = require('dotenv'); // Add dotenv for environment variables
const corsOptions = {
    origin: 'https://wheretogowhen.vercel.app',
    optionsSuccessStatus: 200
  };
  
  app.use(cors(corsOptions));
  
// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors()); // Enable CORS
app.use('/assets', express.static('assets'));


app.get('/api/maps-key', (req, res) => {
    res.json({ apiKey: process.env.API_KEY });
});


// Existing endpoint to serve city_photos.csv
app.get('/data', (req, res) => {
    const results = [];

    fs.createReadStream("/Users/brendan/Desktop - Brendan’s MacBook Air/whereToGoWhen/data/city_photos.csv")
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            res.json(results);
        });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
