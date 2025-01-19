import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ChatContext } from "../../context/chatContext";
import { FaHeartbeat, FaTint, FaWalking } from "react-icons/fa"; // Importing FontAwesome icons
import Chat from "../../components/chat";

const Home = () => {
  const { chatClicked } = useContext(ChatContext);
  const [greeting, setGreeting] = useState("");
  const [quote, setQuote] = useState("");

  const wellnessQuotes = [
    "Take a deep breath. It's just a bad day, not a bad life.",
    "Stay hydrated and take short breaks to recharge yourself.",
    "Consistency, not perfection, is the key to progress.",
    "Move your body, even if it's just a short stretch!",
    "Your mind is your garden. Keep it nourished with positive thoughts.",
  ];

  const navigate = useNavigate();

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) {
        setGreeting("Good Morning, Sahil");
      } else if (hour < 17) {
        setGreeting("Good Afternoon, Sahil");
      } else {
        setGreeting("Good Evening, Sahil");
      }
    };

    updateGreeting();
    const intervalId = setInterval(updateGreeting, 60000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const randomQuote =
      wellnessQuotes[Math.floor(Math.random() * wellnessQuotes.length)];
    setQuote(randomQuote);
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-t from-blue-50 to-white pb-20">
      <div className="flex-grow w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        {/* Header Section */}
        <h1 className="text-2xl font-semibold text-center text-teal-600 mb-2">Talk to Me</h1>
        <p className="text-center text-sm font-medium text-gray-600 mb-4">
          A Gen AI based Workplace Stress Management Assistant
        </p>
        <p className="text-center text-lg text-gray-700 mb-6">{greeting}</p>

        {/* Quote Section */}
        <div className="bg-teal-100 border-l-4 border-teal-600 text-teal-700 p-4 mt-6 rounded-lg shadow-md">
          <p className="text-center text-lg italic">"{quote}"</p>
        </div>

        {/* Dashboard Table Section */}
        <div className="mt-8 bg-teal-50 border-l-4 border-teal-600 text-teal-700 p-4 rounded-lg shadow-lg bg-opacity-60 backdrop-blur-sm">
          <table className="w-full text-center">
            <thead>
              <tr className="flex justify-around w-full">
                <th className="text-sm font-small text-teal-600 flex items-center justify-center">
                  <FaHeartbeat className="mr-2" />
                  Heartbeat
                </th>
                <th className="text-sm font-small text-teal-600 flex items-center justify-center">
                  <FaTint className="mr-2" />
                  Blood Pressure
                </th>
                <th className="text-sm font-small text-teal-600 flex items-center justify-center">
                  <FaWalking className="mr-2" />
                  Movement
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="flex justify-around w-full">
                <td className="py-4 text-small text-gray-700 flex items-center justify-center">
                  70 bpm
                </td>
                <td className="py-4 text-small text-gray-700 flex items-center justify-center">
                  122/82 mmHg
                </td>
                <td className="py-4 text-small text-gray-700 flex items-center justify-center">
                  5,200 steps
                </td>
              </tr>
            </tbody>

          </table>
        </div>

        {/* Buttons Section */}
        <br />
        <button className="bg-teal-400 hover:bg-teal-500 text-white font-small py-2 px-6 rounded-lg shadow-sm mb-2">
          Movement reminder
        </button>
        <button className="bg-teal-400 hover:bg-teal-500 text-white font-small py-2 px-6 rounded-lg shadow-sm mb-2">
          Water reminder
        </button>
        <button className="bg-teal-400 hover:bg-teal-500 text-white font-small py-2 px-6 rounded-lg shadow-sm mb-2">
          Breathing exercise reminder
        </button>

        {chatClicked && (
          <div className="mt-8">
            <Chat />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
