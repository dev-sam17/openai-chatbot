const axios = require('axios');
require('dotenv').config()

const API_URL = "https://api.openai.com/v1/chat/completions"

async function sendResponse(input) {
    let data = {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user" }],
        temperature: 0.7
    }

    data.messages[0].content = input

    const config = {
        headers: {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        }
    }

    const response = await axios.post(API_URL, data, config)
    const choices = response.data.choices[0]
    const text = choices.message.content
    console.log('Response: \n',text)
    return text
}

module.exports = {
    sendResponse,
}