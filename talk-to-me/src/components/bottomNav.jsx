import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaRobot } from "react-icons/fa";
import { ChatContext } from "../context/chatContext";

const BottomNav = () => {
  const { handleChatClick } = useContext(ChatContext);

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-between bg-white p-4 shadow-lg">
      <button
        onClick={handleChatClick}
        className="w-1/2 text-4xl flex justify-center"
      >
        <FaRobot />
      </button>
      <Link to="/search" className="w-1/2 text-4xl flex justify-center">
        <FaSearch />
      </Link>
    </div>
  );
};

export default BottomNav;
