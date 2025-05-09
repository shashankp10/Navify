import React, { useState } from "react";
import { Send } from "lucide-react";
import axios from "axios";

import Navify from "../Img/Navify.svg"

const PromptBox = ({ selectedWebsite, closePromptBox }) => {
  const [isOpen, setIsOpen] = useState(true); // start open
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text:
        "Hello!! How may I assist you in " +
        selectedWebsite.charAt(0).toUpperCase() +
        selectedWebsite.slice(1) +
        " ?",
    },
    // { type: "bot", text: "Hello!! How may I assist you in " + {selectedWebsite} + " ?" },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!userInput.trim() || !selectedWebsite) {
      return alert("Please enter a message and select a website.");
    }

    const currentInput = userInput;
    setUserInput("");
    setIsLoading(true);

    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "user", text: currentInput },
    ]);

    try { // How to login for the passbook of the empoyee?
      const response = await axios.post(
        // "https://navify-backend.onrender.com/api/v1/navify",
        "http://localhost:8000/api/v1/navify",
        {
          prompt: currentInput,
          websiteName: selectedWebsite,
        }
      );

      const results = response.data.results;
      const relevantResults = results.filter((result) => result.score > 0);

      if (relevantResults.length === 0) {
        setMessages((prev) => [
          ...prev,
          { type: "bot", text: "No relevant results found for your query." },
        ]);
      } else {
        const topResult = relevantResults[0];
        const links = relevantResults.map((r) => ({
          url: r.url,
          label: r.url,
        }));

        setMessages((prev) => [
          ...prev,
          { type: "bot", text: topResult.relevantContent, links },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: "Failed to get a response from the server." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    isOpen && (
      <div className="fixed top-20 right-0 w-[60vh] h-[75vh] max-w-full max-h-[80vh] bg-blue-200 shadow-xl rounded-lg border border-gray-300 overflow-hidden z-20 flex flex-col">
        <div className="flex justify-between items-center bg-blue-500 text-white pr-3">
          <div className="flex justify-between items-center">
            <img src={Navify} alt="Navify" className="size-16"/>
            <h3 className="text-xl font-semibold">Navify</h3>
          </div>
          <button onClick={closePromptBox} className="text-white">
            &times;
          </button>
        </div>

        <div className="flex-grow p-3 overflow-y-auto h-[58vh] border-gray-200">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-4 ${
                msg.type === "user" ? "flex justify-end" : "flex justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] ${
                  msg.type === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`p-3 rounded-lg shadow-sm ${
                    msg.type === "user"
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-white text-gray-800 rounded-bl-none"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
                {msg.links && (
                  <div className="mt-3 space-y-2 bg-white/80 p-3 rounded-lg shadow-sm overflow-x-hidden text-wrap">
                    <p className="text-xs font-medium text-gray-500 mb-2">
                      Related Links:
                    </p>
                    {msg.links.map((link, i) => (
                      <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-blue-600 hover:text-blue-800 text-sm py-1 px-2 rounded-md hover:bg-blue-50 transition break-all"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="bg-white p-4 rounded-lg shadow-sm rounded-bl-none">
                <div className="flex space-x-2">
                  <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce delay-200"></div>
                  <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce delay-400"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {selectedWebsite && (
          <div className="text-sm text-gray-700 mb-2 px-2">
            <span className="font-medium text-blue-600">Selected Website:</span>{" "}
            {selectedWebsite.charAt(0).toUpperCase() + selectedWebsite.slice(1)}
          </div>
        )}

        <div className="p-2 flex">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-grow rounded-lg p-2"
            placeholder="Type your query..."
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white w-10 h-10 rounded-full hover:bg-blue-600 ml-2 flex items-center justify-center transform rotate-45"
          >
            <Send />
          </button>
        </div>
      </div>
    )
  );
};

export default PromptBox;
