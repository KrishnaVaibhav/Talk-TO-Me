import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Header = ({ title, goBack }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between w-full p-4 bg-gray-100">
      {goBack && (
        <button onClick={() => navigate("/")} className="text-blue-500 flex items-center">
          <FaArrowLeft className="mr-2" />
          Talk to Me
        </button>
      )}
      <h1 className="text-2xl font-bold">{title}</h1>
      <div></div>
    </div>
  );
};

export default Header;
