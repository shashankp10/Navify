import React, { useState } from 'react';
import axios from 'axios';
import navifyIcon from '../Img/navi.png';
import { Send } from 'lucide-react';

const PromptBox = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hello! How can I help you?' },
  ]);
  const [userInput, setUserInput] = useState('');

  const toggleChatbox = () => setIsOpen((prevState) => !prevState);

  const handleInputChange = (e) => setUserInput(e.target.value);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return; // Prevent empty messages

    // Update messages with user's input
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: 'user', text: userInput },
    ]);

    const currentUrl = window.location.href; // Get current URL

    try {
      const response = await axios.post('http://localhost:8000/api/v1/navify', {
        prompt: userInput,
        url: currentUrl,
      });

      // Check if response data is valid
      if (response.status === 200 && response.data) {
        const { content, links } = response.data;

        // Append bot's response to messages
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            type: 'bot',
            text: content || 'No response content found.',
            links: Array.isArray(links) ? links : [], // Ensure links is an array
          },
        ]);
      } else {
        console.error('Unexpected response format:', response);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            type: 'bot',
            text: 'Sorry, something went wrong.',
          },
        ]);
      }
    } catch (error) {
      console.error('Error fetching response:', error.message || error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          type: 'bot',
          text: 'Failed to get a response from the server.',
        },
      ]);
    }

    // Clear user input
    setUserInput('');
  };

  return (
    <div className="relative">
      {/* Navify Icon */}
      <div
        className="fixed bottom-24 right-5 w-[90px] h-[90px] bg-blue-500 border border-white rounded-full flex items-center justify-center cursor-pointer z-10"
        onClick={toggleChatbox}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <a href="#">
          <img src={navifyIcon} width="60" alt="Navify" />
        </a>
      </div>

      {/* Dialog Box */}
      <div
        className={`fixed bottom-[200px] right-20 text-center bg-blue-200 text-black w-[13rem] p-2 px-8 rounded-lg border border-blue-500 z-10 opacity-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : ''}`}
      >
        <div
          className="absolute w-[13px] h-[2px] bg-white"
          style={{ bottom: '30px', left: '104%', transform: 'translateX(-50%)' }}
        ></div>

        <div
          className="absolute w-[2px] h-[45px] bg-white"
          style={{ bottom: '-15px', left: '107%', transform: 'translateX(-50%)' }}
        ></div>

        Click here to fasten your search!
      </div>

      {/* Chatbox Card on Click */}
      {isOpen && (
        <div className="fixed top-20 right-0 w-[50vh] h-[75vh] max-w-full max-h-[80vh] bg-blue-200 shadow-xl rounded-lg border border-gray-300 overflow-hidden z-20 flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center bg-blue-500 text-white p-3">
            <h3 className="text-lg font-semibold">Navify</h3>
            <button
              onClick={toggleChatbox}
              className="text-white hover:text-gray-200"
              aria-label="Close Chat"
            >
              &times;
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-grow p-3 overflow-y-auto h-[58vh] border-gray-200">
            {messages.map((msg, index) => (
              <div key={index} className="mb-2">
                <p
                  className={`p-2 rounded text-sm w-max max-w-full break-words ${
                    msg.type === 'user'
                      ? 'bg-blue-400 text-white self-end'
                      : 'bg-blue-100 text-gray-700'
                  }`}
                >
                  {msg.text}
                </p>
                {/* Display Links if Available */}
                {msg.links &&
                  msg.links.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-blue-700 underline mt-1"
                    >
                      {link.label}
                    </a>
                  ))}
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-2 flex bottom-0 w-full">
            <input
              type="text"
              value={userInput}
              onChange={handleInputChange}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-grow rounded-lg p-2 focus:outline-none "
              placeholder="Type here..."
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 text-white w-10 h-10 rounded-full hover:bg-blue-600 transform rotate-45 flex items-center justify-center ml-2"
            >
              <Send className="text-2xl" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromptBox;