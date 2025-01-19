import React from "react";
import { FaBook, FaComments, FaMicrophone, FaHome } from "react-icons/fa"; // Import FaHome icon
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleClick = (action) => {
    if (action === "Chat") {
      navigate("/chat"); // Navigate to the chatbot page
    } else if (action === "Journal") {
      navigate("/journal"); // Navigate to the journal page
    } else if (action === "Home") {
      navigate("/"); // Navigate to the home page
    } else {
      alert(`${action} clicked`);
    }
  };

  return (
    <div>
      <FaHome
        className="fixed top-6 left-10 text-gray-600 text-3xl hover:text-blue-600 cursor-pointer transition-all duration-300 z-50"
        onClick={() => handleClick("Home")}
      />
      <div className="fixed bottom-0 left-0 right-0 bg-white py-4 shadow-lg">
        <div className="flex justify-around text-gray-600 text-3xl">
          <FaBook
            className="hover:text-teal-500 cursor-pointer transition-all duration-300"
            onClick={() => handleClick("Journal")}
          />
          <FaComments
            className="hover:text-teal-500 cursor-pointer transition-all duration-300"
            onClick={() => handleClick("Chat")}
          />
          <FaMicrophone
            className="hover:text-teal-500 cursor-pointer transition-all duration-300"
            onClick={() => handleClick("Microphone")}
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
