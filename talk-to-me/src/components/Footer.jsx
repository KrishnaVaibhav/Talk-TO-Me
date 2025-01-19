import React from 'react';
import { FaBook, FaComments, FaMicrophone } from 'react-icons/fa'; // Changed FaCalendarAlt to FaBook
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const handleClick = (action) => {
    if (action === "Chat") {
      navigate("/chat"); // Navigate to the chatbot page
    } else if (action === "Journal") {
      navigate("/journal"); // Navigate to the journal page
    } else {
      alert(`${action} clicked`);
    }
  };

  return (
    <div className="fixed-footer py-4">
      <div className="flex justify-around text-gray-600 text-2xl">
        <FaBook
          className="hover:text-teal-500 cursor-pointer transition-all duration-300"
          onClick={() => handleClick("Journal")} // Changed to navigate to Journal
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
  );
};

export default Footer;
