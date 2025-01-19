import React, { useState, useEffect } from "react";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import "./voiceChat.css"; // Import the CSS file

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = "en-US";

const VoiceChat = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");

  useEffect(() => {
    handleListen();
  }, [isRecording]);

  const handleListen = () => {
    if (isRecording) {
      mic.start();
      mic.onend = () => {
        console.log("continue..");
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
        console.log("Stopped Mic on Click");
      };
    }
    mic.onstart = () => {
      console.log("Mics on");
    };

    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      console.log(transcript);
      setTranscript(transcript);
      mic.onerror = (event) => {
        console.log(event.error);
      };
    };
  };

  const handleRecord = () => {
    setIsRecording(!isRecording);
  };

  return (
    <div className="voice-chat flex flex-col items-center justify-center h-screen bg-gray-100">
      <button
        onClick={handleRecord}
        className={`flex items-center justify-center p-6 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-transform duration-300 ${
          isRecording ? "animate-zoom-fade" : ""
        }`}
      >
        {isRecording ? (
          <FaMicrophoneSlash className="text-4xl" />
        ) : (
          <FaMicrophone className="text-4xl" />
        )}
      </button>
      <div className="transcript mt-4 p-4 bg-white rounded shadow w-3/4 max-w-lg text-center">
        <h2 className="text-lg font-semibold mb-2">Transcript</h2>
        <p className="text-gray-700">{transcript}</p>
      </div>
    </div>
  );
};

export default VoiceChat;
