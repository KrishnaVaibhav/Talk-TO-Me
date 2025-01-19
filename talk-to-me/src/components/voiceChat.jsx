import React, { useState } from "react";

const VoiceChat = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState([]);

  const handleRecord = () => {
    setIsRecording(!isRecording);
    // Add logic to start/stop recording
  };

  const handleSend = (message) => {
    setMessages([...messages, message]);
    // Add logic to send the message
  };

  return (
    <div className="voice-chat">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            {msg}
          </div>
        ))}
      </div>
      <div className="controls">
        <button onClick={handleRecord}>
          {isRecording ? "Stop Recording" : "Start Recording"}
        </button>
        <button onClick={() => handleSend("Sample message")}>
          Send Message
        </button>
      </div>
    </div>
  );
};

export default VoiceChat;
