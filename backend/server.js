const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3001;

app.use(express.static(path.join(__dirname, '../client/build')));
app.use(bodyParser.json());

app.post('/search', async(req, res) => {
    try {
        const plantName = req.body.plantName;
        console.log(`Received plant name: ${plantName}`);

        // Make a request to Gemini API to retrieve information about the plant
        const response = await GET(`https://geminiapi.com/plants?name=${plantName}`, {
            headers: {
                'Authorization': `AIzaSyCo1Mt2xZ2LG-eYZamSTUbZqsfcTuEiWZM`  // Replace YOUR_API_KEY with your actual API key
            }
        });
        
        console.log(`Received response from Gemini API: ${response.data}`);

        const plantInfo = response.data;

        // Send the plant information back to the frontend
        res.json(plantInfo);
    } catch (error) {
        console.error('Error occurred while processing request:', error);
        res.status(500).json({ error: 'Failed to process request' });
    }
});

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(port, () => {
    console.log(`Backend server is running on port ${port}`);
});
