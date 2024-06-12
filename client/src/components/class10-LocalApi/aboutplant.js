import React, { useState } from 'react';
import image from '../images/icon.png';
import { GoogleGenerativeAI } from "@google/generative-ai";

const PlantInfo = () => {
    const [plantName, setPlantName] = useState('');
    const [error, setError] = useState('');
    const [generatedText, setGeneratedText] = useState('');

    const handleInputChange = (e) => {
        setPlantName(e.target.value);
    };

    const generateText = async () => {
        try {
            // Initialize the Gemini model
            const genAI = new GoogleGenerativeAI('AIzaSyA6PTZYqA8cqZSuw8hmD18tpT_As47jOXk'); // Replace 'YOUR_API_KEY' with your actual API key
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            // Generate text based on the plantName entered
            const prompt = `Tell about the plant ${plantName}(give the respone in the form of html elemnts,(dont give doctype,head,title,body tags))`;
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = await response.text();
            console.log(text)
            // Update the state with the generated text
            setGeneratedText(text);
            setError('');
        } catch (error) {
            // Handle errors
            setError('Error occurred while generating text');
            setGeneratedText('');
        }
    };

    return (
        <div className="main-body">
            <div className="search-container">
                <input 
                    type="text" 
                    id="searchInput" 
                    placeholder="Search..." 
                    value={plantName}
                    onChange={handleInputChange}
                />
                <button type="button" id="searchButton" onClick={generateText}>
                    <img className="SearchIcon" src={image} alt="Search" />
                </button>
                </div>
            {generatedText && (
                <div className="generated-text" dangerouslySetInnerHTML={{ __html: generatedText }} />
            )}
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default PlantInfo;
