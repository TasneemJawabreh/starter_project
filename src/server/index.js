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
    const  url  = req.body;
    const apiKey = process.env.API_KEY;
console.log("kkkk",url.formText);
    try {
        const response = await axios.post('https://api.meaningcloud.com/sentiment-2.1', null, {
            params: {
                key: apiKey,
                url: url.formText,
                lang: 'en', // Language parameter (optional), adjust as needed
            },
        });

        const data = response.data;
console.log(response);
        if (data.status.code !== "0") {
            throw new Error(data.status.msg);
        }
        const polarity = data.score_tag === "P+" || data.score_tag === "P" ? "positive" : 
        data.score_tag === "N+" || data.score_tag === "N" ? "negative" : "neutral";

        const subjectivity = data.subjectivity === "SUBJECTIVE" ? "subjective" : "factual";
        const textSnippet = data.sentence_list && data.sentence_list.length > 0 ? data.sentence_list[0].text : "No snippet available";

        res.json({ 
            polarity: polarity,
            subjectivity: subjectivity,
            text: textSnippet
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


