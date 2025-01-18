import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <p className="text-3xl font-bold underline mb-4">Home</p>
      <Link to="/chat" className="text-blue-500 hover:underline">
        Chat
      </Link>
    </div>
  );
};

export default Home;
