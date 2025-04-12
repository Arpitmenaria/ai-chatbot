const axios = require('axios');
const Message = require('../models/Message');

const sendMessageToAI = async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(
      'https://production.api.cohere.com/v1/chat',
      {
        message: message,
        chat_history: [],
        model: 'command-r',
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.COHERE_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const aiMessage = response.data.text;

    // Save to DB
    const newMessage = new Message({
      userMessage: message,
      aiMessage: aiMessage,
      userId: req.user.id,
    });
    await newMessage.save();

    res.status(200).json({ aiMessage });
  } catch (error) {
    console.error("AI Error:", error.message);
    res.status(500).json({ error: 'Failed to fetch AI response' });
  }
};

module.exports = { sendMessageToAI };
