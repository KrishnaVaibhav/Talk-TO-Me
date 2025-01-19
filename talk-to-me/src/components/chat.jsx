import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AIChatbot = () => {
  const navigate = useNavigate();

  // States for storing the conversation
  const [userInput, setUserInput] = useState("");
  const [conversation, setConversation] = useState([]); // To store user and AI messages
  const [loading, setLoading] = useState(false); // Track loading state

  const handleSubmit = async () => {
    if (!userInput) return; // Don't submit if input is empty

    // Add the user's message to the conversation
    setConversation([...conversation, { sender: "user", message: userInput }]);

    setLoading(true); // Start loading

    try {
      // Make a request to OpenAI API directly (client-side)
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o-mini",
          messages: [
            { role: "system", 
              content: `
              You are a chatbot, that provides support for mental health concerns. Provide some immediate strategies to cope up. Have a conversation with the user, limit responses to 50 words. Provide some resources for the user to reach out to as bullet points.  
              Choose from the following resources based on the situation - 
              i. 211 - If you have concerns about your safety and wellbeing, or the safety of others, you can call the Men's Helpline, Women's Helpline or All Genders Helpline. The helplines are free, confidential and available 24 hours a day, 7 days a week.
              Community resource navigators will connect you with someone who can help or just listen.
              ii. 811 - For non-emergency advice and information about mental health and addictions, call 811.
              iii. 988 - Suicide Crisis Helpline provides urgent, live, trauma-informed support by phone and text 24 hours a day, 7 days a week.
              iv. Good2Talk Nova Scotia - Good2Talk Nova Scotia provides support for university and college students. Call toll-free: 1-833-292-3698.Text GOOD2TALKNS to 686868
              `},
            { role: "user", content: userInput },
          ],
        },
        {
          headers: {
            "Authorization": `Bearer openai`,
            "Content-Type": "application/json",
          },
        }
      );

      // Add the AI's response to the conversation
      setConversation([
        ...conversation,
        { sender: "ai", message: response.data.choices[0].message.content.trim() },
      ]);
      setUserInput(""); // Clear user input
    } catch (error) {
      console.error("Error generating response:", error);
      setConversation([
        ...conversation,
        { sender: "ai", message: "Sorry, there was an error. Please try again." },
      ]);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Navigate back to home screen
  const goBack = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-t from-blue-50 to-white pb-20">
      <div className="flex-grow flex flex-col items-center justify-start bg-gray-100 p-4 w-full max-w-3xl">
        <div className="flex items-center justify-start w-full mb-4">
          <button onClick={goBack} className="text-blue-500 flex items-center">
            <FaArrowLeft className="mr-2" /> Back to Home
          </button>
        </div>

        <h1 className="text-3xl font-bold mb-6 text-center">AI Chatbot</h1>

        {/* Chat Container */}
        <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-col p-4 h-96 overflow-y-scroll bg-gray-50">
            {conversation.map((msg, index) => (
              <div
                key={index}
                className={`flex items-start mb-3 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white rounded-l-none"
                      : "bg-gray-200 text-gray-800 rounded-r-none"
                  }`}
                >
                  <p>{msg.message}</p>
                </div>
              </div>
            ))}
          </div>

          {/* User Input Section */}
          <div className="flex items-center p-4 bg-white border-t">
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your message here..."
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="2"
            />
            <button
              onClick={handleSubmit}
              className="ml-3 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg"
              disabled={loading}
            >
              {loading ? "Thinking..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatbot;
