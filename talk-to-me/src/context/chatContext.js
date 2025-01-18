import React, { createContext, useState } from "react";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chatClicked, setChatClicked] = useState(false);

  const handleChatClick = () => {
    setChatClicked((prevState) => !prevState);
  };

  return (
    <ChatContext.Provider value={{ chatClicked, handleChatClick }}>
      {children}
    </ChatContext.Provider>
  );
};
