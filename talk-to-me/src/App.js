import "./App.css";
import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/home";
import P404 from "./pages/p404/p404";
import Journal from "./components/Journal";
import Footer from "./components/Footer"; // Import Footer
import { ChatProvider } from "./context/chatContext";
import Chat from "./components/chat";
import VoiceChat from "./components/voiceChat";

function App() {
  return (
    <ChatProvider>
      <Router>
        <div className="fixed from-[#ADE1FB] to-white top-0 bottom-0 right-0 left-0 flex flex-col min-h-screen">
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/journal" element={<Journal />} />
              <Route path="*" element={<P404 />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/voice" element={<VoiceChat />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ChatProvider>
  );
}

export default App;
