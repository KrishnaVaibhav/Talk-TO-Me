import React from "react";
import img from "../../images/404.png";
import { useNavigate } from "react-router-dom";

const P404 = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <img
        className="object-contain transform transition duration-500 hover:scale-105"
        style={{ width: "20vw", height: "auto" }}
        src={img}
        alt="404 page"
      />
      <button
        className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
        onClick={() => {
          navigate("/", { replace: true });
        }}
      >
        Go to home page
      </button>
    </div>
  );
};

export default P404;
