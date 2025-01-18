import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/home";
import P404 from "./pages/p404/p404";
import { ChatProvider } from "./context/chatContext";

function App() {
  return (
    <div className="App">
      <ChatProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<P404 />} />
          </Routes>
        </Router>
      </ChatProvider>
    </div>
  );
}

export default App;
