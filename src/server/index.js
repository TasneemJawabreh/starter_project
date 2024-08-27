var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

console.log(__dirname);

// Serve static files from the dist directory
app.use(express.static('dist'));

// Route to serve the index.html file
app.get('/', function(req, res) {
    res.sendFile('../../dist/index.html');
});
const predefinedText = "Your API key is: ";
console.log(`Your API key is ${process.env.API_KEY}`);
//document.getElementById('results1').innerHTML = `<p>${predefinedText}${process.env.API_KEY}</p>`;
// POST Route
app.use(express.json());

/*app.post('/api', (req, res) => {
    res.json({ message: 'Data received' });
});*/
app.post('/api', async (req, res) => {
    const { url } = req.body;
    const apiKey = process.env.API_KEY;

    try {
        const response = await axios.post('https://api.meaningcloud.com/sentiment-2.1', null, {
            params: {
                key: apiKey,
                url: url,
                lang: 'en', // Language parameter (optional), adjust as needed
            },
        });

        const data = response.data;

        if (data.status.code !== "0") {
            throw new Error(data.status.msg);
        }

        res.json({ 
            text: data.sentence_list.map(sentence => sentence.text).join(' '),
            sentiment: data.score_tag,
            subjectivity: data.subjectivity,
        });
    } catch (error) {
        console.error("Error analyzing the article:", error.message);
        res.status(500).json({ error: "Failed to analyze the text from the article", details: error.message });
    }
});






// Designates what port the app will listen to for incoming requests
app.listen(8000, function () {
    console.log('Example app listening on port 8000!');
});


