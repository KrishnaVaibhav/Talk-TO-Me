import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Journal = () => {
  const navigate = useNavigate();

  // States for storing the journal responses
  const [dayStatus, setDayStatus] = useState("");
  const [whatWentWell, setWhatWentWell] = useState("");
  const [whatNotWentWell, setWhatNotWentWell] = useState("");
  const [summary, setSummary] = useState(""); // To hold the AI-generated response
  const [loading, setLoading] = useState(false); // Track loading state
  const [expanded, setExpanded] = useState(false); // State to track expansion

  const handleSubmit = async () => {
    setLoading(true); // Start loading

    // Create the input for the AI model
    const inputText = `Day Status: ${dayStatus}\nWhat Went Well: ${whatWentWell}\nWhat Did Not Go Well: ${whatNotWentWell}`;

    try {
      // Make a request to OpenAI API directly (client-side)
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "You are a helpful assistant that summarizes journal entries in a positive and motivating tone, do that in about a 30-50 words, focus on motivating and showing the positives of how the day went and some tips to do better.",
            },
            {
              role: "user",
              content: `Summarize the following journal in a positive and motivating tone: ${inputText}`,
            },
          ],
          max_tokens: 120,
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer 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`,
            "Content-Type": "application/json",
          },
        }
      );

      // Set the AI-generated summary as the response
      setSummary(response.data.choices[0].message.content.trim());
    } catch (error) {
      console.error("Error generating summary:", error);
      setSummary(
        "Sorry, there was an error generating the summary. Please try again."
      );
    } finally {
      setLoading(false); // Stop loading
      setExpanded(true); // Expand the container after submission
    }
  };

  // Navigate back to home screen
  const goBack = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-t from-blue-50 to-white pb-20">
      <div
        className={`flex-grow flex flex-col items-center justify-start bg-gray-100 p-4 transition-all duration-300 ${
          expanded ? "h-auto" : "h-full"
        } w-full mx-auto`}
      >
        <h1 className="text-2xl font-bold mb-4">Journal Your Day</h1>
        <div className="w-full overflow-y-scroll max-h-[70vh] flex flex-col items-center">
          <div className="mb-4 w-1/2">
            <label
              htmlFor="dayStatus"
              className="block text-sm font-medium mb-2"
            >
              How was the day?
            </label>
            <textarea
              id="dayStatus"
              className="w-full p-2 border rounded"
              rows="3"
              value={dayStatus}
              onChange={(e) => setDayStatus(e.target.value)}
            />
          </div>

          <div className="mb-4 w-1/2">
            <label
              htmlFor="whatWentWell"
              className="block text-sm font-medium mb-2"
            >
              What went well?
            </label>
            <textarea
              id="whatWentWell"
              className="w-full p-2 border rounded"
              rows="3"
              value={whatWentWell}
              onChange={(e) => setWhatWentWell(e.target.value)}
            />
          </div>

          <div className="mb-4 w-1/2">
            <label
              htmlFor="whatNotWentWell"
              className="block text-sm font-medium mb-2"
            >
              What did not go well?
            </label>
            <textarea
              id="whatNotWentWell"
              className="w-full p-2 border rounded"
              rows="3"
              value={whatNotWentWell}
              onChange={(e) => setWhatNotWentWell(e.target.value)}
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-1/2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
            disabled={loading}
          >
            {loading ? "Generating..." : "Submit"}
          </button>

          {summary && (
            <div className="mt-6 bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded shadow-md w-1/2">
              <p className="text-center">{summary}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Journal;
