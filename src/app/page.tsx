"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react';





export default function Page() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  
  const botAvatar = 'https://cdn.discordapp.com/attachments/1117889670634811443/1125792978246586399/Piwe-2.png';



  const sendMessage = async () => {
    console.log("send message")
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/convchain', { query: inputMessage });
      
      const newMessage = response.data;

      setMessages([...messages, { user: inputMessage, bot: newMessage.bot }]);
      setInputMessage(''); // Limpia el input
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
    }
  }

  const handleInputChange = (event) => {
    setInputMessage(event.target.value);
  }

  const handleInputKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-gray-100 text-gray-800 p-10">
      <div className="flex flex-col w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="flex flex-col flex-grow p-4 overflow-auto space-y-4">
          {messages.map((message, index) => (
            <React.Fragment key={index}>
              <div className="flex w-full mt-2 space-x-3 max-w-xs">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300 p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                    <p className="text-sm">{message.user}</p>
                  </div>
                  <span className="text-xs text-gray-500 leading-none mt-1">Recién</span>
                </div>
              </div>
              <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                <div className="flex flex-col">
                  <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                    <p className="text-sm">{message.bot}</p>
                  </div>
                  <span className="text-xs text-gray-500 leading-none mt-1">Recién</span>
                </div>
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300 p-1">
                  <img src={botAvatar} alt="Bot Avatar" className="w-full h-full rounded-full" />
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
        <div className="bg-gray-300 p-4">
          <input
            className="flex items-center h-10 w-full rounded px-3 text-sm"
            type="text"
            placeholder="Type your message…"
            value={inputMessage}
            onChange={handleInputChange}
            onKeyPress={handleInputKeyPress}
          />
        </div>
      </div>
    </div>
  );
}