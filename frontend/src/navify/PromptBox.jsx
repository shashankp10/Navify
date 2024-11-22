import React, { useState } from "react";
import axios from "axios";
import navifyIcon from "../Img/Navify.jpg";
import { Send } from "lucide-react";

const PromptBox = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hello!! How may I assist you?" },
  ]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedWebsite, setSelectedWebsite] = useState(null);

  const websites = ["innovationcloud", "supabase", "DJB", "GeeksForGeeks", "Nike", "takeuforward"];

  const toggleChatbox = () => setIsOpen((prevState) => !prevState);

  const handleInputChange = (e) => setUserInput(e.target.value);

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
  
    try {
      const response = await axios.post("http://localhost:8000/api/v1/navify", {
        prompt: currentInput,
        websiteName: selectedWebsite,
      });
  
      if (response.status === 200 && response.data) {
        const results = response.data.results;
        const relevantResults = results.filter((result) => result.score > 0);
  
        if (relevantResults.length === 0) {
          // No relevant results found
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              type: "bot",
              text: "No relevant results found for your query.",
            },
          ]);
        } else {
          // Handle relevant results
          const topResult = relevantResults[0];
          const links = relevantResults.map((result) => ({
            url: result.url,
            label: result.url,
          }));
  
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              type: "bot",
              text: topResult.relevantContent,
              links: links,
            },
          ]);
        }
      }
    } catch (error) {
      console.error("Error fetching response:", error.message || error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          type: "bot",
          text: "Failed to get a response from the server.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="relative">
      <div
        className="fixed bottom-24 right-5 w-[90px] h-[90px] bg-blue-500 border border-white rounded-full flex items-center justify-center cursor-pointer z-10 overflow-hidden"
        onClick={toggleChatbox}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <a href="#">
          <img
            src={navifyIcon}
            alt="Navify"
            className="w-full h-full object-cover"
          />
        </a>
      </div>

      <div
        className={`fixed bottom-[200px] right-20 text-center bg-blue-200 text-black w-[13rem] p-2 px-8 rounded-lg border border-blue-500 z-10 transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <p>Click here to fasten your search!</p>
      </div>

      {isOpen && (
        <div className="fixed top-20 right-0 w-[50vh] h-[75vh] max-w-full max-h-[80vh] bg-blue-200 shadow-xl rounded-lg border border-gray-300 overflow-hidden z-20 flex flex-col">
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

          <div className="flex-grow p-3 overflow-y-auto h-[58vh] border-gray-200">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  msg.type === "user"
                    ? "flex justify-end"
                    : "flex justify-start"
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
                    <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">
                      {msg.text}
                    </p>
                  </div>
                  {msg.links && msg.links.length > 0 && (
                    <div className="mt-3 space-y-2 bg-white/80 p-3 rounded-lg shadow-sm">
                      <p className="text-xs font-medium text-gray-500 mb-2">
                        Related Links:
                      </p>
                      {msg.links.map((link, i) => (
                        <a
                          key={i}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-blue-600 hover:text-blue-800 text-sm py-1 px-2 rounded-md hover:bg-blue-50 transition-colors duration-200 overflow-hidden text-ellipsis"
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
                    <div
                      className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0s" }}
                    ></div>
                    <div
                      className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-2 flex flex-col bottom-0 w-full">
            <div className="mb-2">
              <p className="text-sm text-gray-800 mb-1">Select a website:</p>
              <div className="flex flex-wrap space-x-2">
                {websites.map((website) => (
                  <button
                    key={website}
                    onClick={() => setSelectedWebsite(website)}
                    className={`px-2 py-2 my-1 rounded-lg text-sm ${
                      selectedWebsite === website
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {website.charAt(0).toUpperCase() + website.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex">
              <input
                type="text"
                value={userInput}
                onChange={handleInputChange}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-grow rounded-lg p-2 focus:outline-none"
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
        </div>
      )}
    </div>
  );
};

export default PromptBox;
