import { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbox = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/chat`,
        {
          message,
        }
      );
      setResponse(formatResponse(data.reply));
      setMessage("");
    } catch (error) {
      console.error("Error sending message", error);
      setResponse("Error connecting to chatbot.");
    }
  };

  const formatResponse = (text) => {
    const formattedText = text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold for **
      .replace(/\*(.*?)\*/g, "<em>$1</em>") // Italics for *
      .replace(/\n/g, "<br />"); // New line to <br />
    return formattedText;
  };

  return (
    <>
      <div
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-500 text-white flex items-center justify-center rounded-full shadow-lg cursor-pointer hover:bg-blue-600 transition duration-300 z-50"
        onClick={toggleChatbox}
      >
        💬
      </div>

      {isOpen && (
        <div
          className="fixed bottom-20 right-6 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
          style={{
            maxHeight: "500px",
            overflowY: "auto",
          }}
        >
          <div className="bg-blue-500 text-white px-4 py-2 flex justify-between items-center">
            <h4 className="font-semibold">Fruzoz Chatbot</h4>
            <button
              onClick={toggleChatbox}
              className="text-white hover:text-gray-300"
            >
              ❌
            </button>
          </div>

          <div
            className="p-4"
            style={{
              maxHeight: "400px",
              overflowY: "auto",
            }}
          >
            <textarea
              rows="3"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask for a recipe..."
            />
            <button
              onClick={sendMessage}
              className="mt-2 w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
            >
              Send
            </button>
            {response && (
              <div
                className="mt-4 text-gray-700 overflow-auto"
                dangerouslySetInnerHTML={{ __html: response }}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
