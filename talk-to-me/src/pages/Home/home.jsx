import React, { useContext } from "react";
import { FaMicrophone } from "react-icons/fa";
import BottomNav from "../../components/bottomNav";
import { ChatContext } from "../../context/chatContext";
import Chat from "../../components/chat";

const Home = () => {
  const { chatClicked } = useContext(ChatContext);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow flex items-center justify-center bg-gray-100">
        {!chatClicked && <FaMicrophone className="text-8xl" />}
        {chatClicked && (
          <div className="">
            <Chat />
          </div>
        )}
      </div>
      <div className="">
        <BottomNav />
      </div>
    </div>
  );
};

export default Home;
