import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AIChatbot = () => {
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState("");
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!userInput) return;

    const newConversation = [
      ...conversation,
      { sender: "user", message: userInput },
    ];
    setConversation(newConversation);
    setUserInput(""); // Clear the input box immediately after adding the message

    setLoading(true);

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `You are a chatbot, that provides support for mental health concerns. Provide some immediate strategies to cope up. Have a conversation with the user, limit responses to 50 words. Provide some resources for the user to reach out to as bullet points. Choose from the following resources based on the situation - i. 211 - If you have concerns about your safety and wellbeing, or the safety of others, you can call the Men's Helpline, Women's Helpline or All Genders Helpline. The helplines are free, confidential and available 24 hours a day, 7 days a week. Community resource navigators will connect you with someone who can help or just listen. ii. 811 - For non-emergency advice and information about mental health and addictions, call 811. iii. 988 - Suicide Crisis Helpline provides urgent, live, trauma-informed support by phone and text 24 hours a day, 7 days a week. iv. Good2Talk Nova Scotia - Good2Talk Nova Scotia provides support for university and college students. Call toll-free: 1-833-292-3698.Text GOOD2TALKNS to 686868`,
            },
            { role: "user", content: userInput },
          ],
        },
        {
          headers: {
            Authorization: `Bearer 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`,
            "Content-Type": "application/json",
          },
        }
      );

      setConversation([
        ...newConversation,
        {
          sender: "ai",
          message: response.data.choices[0].message.content.trim(),
        },
      ]);
    } catch (error) {
      console.error("Error generating response:", error);
      setConversation([
        ...newConversation,
        {
          sender: "ai",
          message: "Sorry, there was an error. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-t from-blue-50 to-white pb-20">
      <div className="flex-grow flex flex-col items-center justify-start bg-gray-100 p-4 w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">AI Chatbot</h1>

        <div className="fixed bottom-14 w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-col p-4 max-h-[70vh] overflow-y-scroll bg-gray-100">
            {conversation.map((msg, index) => (
              <div
                key={index}
                className={`flex items-start mb-3 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-full ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  <p>{msg.message}</p>
                </div>
              </div>
            ))}
          </div>

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
