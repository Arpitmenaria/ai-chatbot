import React, { useState } from 'react';
import axios from 'axios';

const ChatBox = () => {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const userMessage = { sender: 'user', text: userInput };
    setMessages(prev => [...prev, userMessage]);

    try {
      const res = await axios.post(
        'http://localhost:5000/api/chat',
        { message: userInput },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );

      const aiMessage = { sender: 'ai', text: res.data.aiMessage };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      setMessages(prev => [...prev, { sender: 'ai', text: 'Something went wrong.' }]);
    }

    setUserInput('');
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.sender}`}>
            <span>{msg.sender === 'user' ? '🧑‍💻' : '🤖'} {msg.text}</span>
          </div>
        ))}
      </div>

      <div className="input-box">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
