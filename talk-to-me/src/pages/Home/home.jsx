import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ChatContext } from "../../context/chatContext";
import {
  FaHeartbeat,
  FaTint,
  FaWalking,
  FaHourglassHalf,
} from "react-icons/fa"; // Importing FontAwesome icons
import Chat from "../../components/chat";

const Home = () => {
  const { chatClicked } = useContext(ChatContext);
  const [greeting, setGreeting] = useState("");
  const [quote, setQuote] = useState("");
  const [heartbeat, setHeartbeat] = useState(70);
  const [bloodPressure, setBloodPressure] = useState("122/82 mmHg");
  const [steps, setSteps] = useState(0); // Set initial steps to 0
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timer, setTimer] = useState(600); // 10 minutes in seconds
  const [recommendations, setRecommendations] = useState([
    "Take a short walk",
    "Drink a glass of water",
    "Do a quick breathing exercise",
  ]);

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

  useEffect(() => {
    const updateValues = () => {
      setHeartbeat(Math.floor(Math.random() * (100 - 60 + 1)) + 60);
      setBloodPressure(
        `${Math.floor(Math.random() * (130 - 110 + 1)) + 110}/${
          Math.floor(Math.random() * (90 - 70 + 1)) + 70
        } mmHg`
      );
      setSteps(
        (prevSteps) =>
          prevSteps + Math.floor(Math.random() * (50 - 10 + 1)) + 10
      );
    };

    updateValues();
    const intervalId = setInterval(updateValues, 5000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    let timerInterval;
    if (isModalOpen && timer > 0) {
      timerInterval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [isModalOpen, timer]);

  const openModal = () => {
    setIsModalOpen(true);
    setTimer(600); // Reset timer to 10 minutes
  };

  const removeRecommendation = (index) => {
    setRecommendations((prevRecommendations) =>
      prevRecommendations.filter((_, i) => i !== index)
    );
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const progressPercentage = ((600 - timer) / 600) * 100;

  return (
    <div className="fixed left-0 right-0 flex flex-col items-center min-h-screen bg-gradient-to-t from-blue-50 to-white pb-20">
      <div className="container flex-grow w-full mx-auto bg-white rounded-lg shadow-lg p-6">
        {/* Header Section */}
        <h1 className="text-2xl font-semibold text-center text-teal-600 mb-2">
          Talk to Me
        </h1>
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
          <div className="flex flex-col md:flex-row justify-around w-full">
            <div className="flex flex-col items-center mb-4 md:mb-0">
              <FaHeartbeat className="text-teal-600 mb-2" />
              <span className="text-sm font-small text-teal-600">
                Heartbeat
              </span>
              <span className="py-4 text-small text-gray-700">
                {heartbeat} bpm
              </span>
            </div>
            <div className="flex flex-col items-center mb-4 md:mb-0">
              <FaTint className="text-teal-600 mb-2" />
              <span className="text-sm font-small text-teal-600">
                Blood Pressure
              </span>
              <span className="py-4 text-small text-gray-700">
                {bloodPressure}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <FaWalking className="text-teal-600 mb-2" />
              <span className="text-sm font-small text-teal-600">Movement</span>
              <span className="py-4 text-small text-gray-700">
                {steps} steps
              </span>
            </div>
          </div>
        </div>
        {/* Buttons Section */}
        <div className="flex flex-col md:flex-row justify-around mt-4">
          <button className="bg-teal-400 hover:bg-teal-500 text-white font-small py-2 px-6 rounded-lg shadow-sm mb-2 md:mb-0 md:mr-2">
            Movement reminder
          </button>
          <button className="bg-teal-400 hover:bg-teal-500 text-white font-small py-2 px-6 rounded-lg shadow-sm mb-2 md:mb-0 md:mr-2">
            Water reminder
          </button>
          <button className="bg-teal-400 hover:bg-teal-500 text-white font-small py-2 px-6 rounded-lg shadow-sm">
            Breathing exercise reminder
          </button>
        </div>
        {/* Challenges Section */}
        <div className="mt-8 bg-teal-50 border-l-4 border-teal-600 text-teal-700 p-4 rounded-lg shadow-lg bg-opacity-60 backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-center text-teal-600 mb-4">
            Challenge
          </h2>
          <div className="text-center">
            <button
              onClick={openModal}
              className="bg-teal-400 hover:bg-teal-500 text-white font-small py-2 px-6 rounded-lg shadow-sm"
            >
              Complete a 10-minute meditation
            </button>
          </div>
        </div>
        {/* Recommendations Section */}
        <div className="mt-8 bg-teal-50 border-l-4 border-teal-600 text-teal-700 p-4 rounded-lg shadow-lg bg-opacity-60 backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-center text-teal-600 mb-4">
            Recommendations
          </h2>
          <ul className="list-none text-gray-700">
            {recommendations.map((rec, index) => (
              <li
                key={index}
                className="flex justify-between items-center mb-2"
              >
                <span>{rec}</span>
                <button
                  onClick={() => removeRecommendation(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </div>
        {chatClicked && (
          <div className="mt-8">
            <Chat />
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-96">
            <h2 className="text-xl font-semibold text-center text-teal-600 mb-4">
              Meditation Timer
            </h2>
            <div className="flex flex-col items-center text-gray-700 mb-4">
              <FaHourglassHalf className="text-teal-600 text-6xl mb-2" />
              <div className="text-2xl">
                {Math.floor(timer / 60)}:{("0" + (timer % 60)).slice(-2)}
              </div>
              <progress
                className="w-full mt-4"
                value={progressPercentage}
                max="100"
              ></progress>
            </div>
            <div className="text-center">
              <button
                onClick={closeModal}
                className="bg-teal-400 hover:bg-teal-500 text-white font-small py-2 px-6 rounded-lg shadow-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
