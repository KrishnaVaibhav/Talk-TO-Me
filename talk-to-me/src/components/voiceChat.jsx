import React, { useState } from "react";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";

const VoiceChat = () => {
  const [isRecording, setIsRecording] = useState(false);

  const handleRecord = () => {
    setIsRecording(!isRecording);
    // Add logic to start/stop recording
  };

  return (
    <div className="voice-chat flex items-center justify-center h-screen bg-gray-100">
      <button
        onClick={handleRecord}
        className={`flex items-center justify-center p-6 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-transform duration-300 ${
          isRecording ? "transform scale-125" : "transform scale-100"
        }`}
      >
        {isRecording ? (
          <FaMicrophoneSlash className="text-4xl" />
        ) : (
          <FaMicrophone className="text-4xl" />
        )}
      </button>
    </div>
  );
};

export default VoiceChat;
