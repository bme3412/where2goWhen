const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');
const cors = require('cors');  // Add this line

const app = express();
const PORT = 3000;

app.use(cors());  // Add this line
app.use('/assets', express.static('/Users/brendan/Desktop - Brendan’s MacBook Air/whereToGoWhen/assets'));

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