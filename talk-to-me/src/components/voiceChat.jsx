import React, { useState, useEffect } from "react";
import AWS from "aws-sdk";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import "./voiceChat.css"; // Import the CSS file

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = "en-US";

// Configure AWS SDK
AWS.config.update({
  accessKeyId: "AKIAZQ3DPA2T4QQ7PPOR", // Replace with your AWS Access Key
  secretAccessKey: "kzE8vXWa6kraVCyWKpKDrHcUds2zequmL+II5K4F", // Replace with your AWS Secret Key
  region: "us-east-1", // Replace with your Lex bot region
});

const lexRuntime = new AWS.LexRuntimeV2();

const VoiceChat = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");

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
      mic.onend = async () => {
        console.log("Stopped Mic on Click");
        await handleSendMessage(transcript);
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

  const handleSendMessage = async (input) => {
    if (!input.trim()) return;

    const params = {
      botId: "VZBKY3XSHF", // Replace with your Lex bot ID
      botAliasId: "TSTALIASID", // Replace with your Lex bot alias ID
      localeId: "en_US", // Replace with your Lex bot locale
      sessionId: "simple-session", // Unique session ID
      text: input,
    };

    try {
      const response = await lexRuntime.recognizeText(params).promise();

      const botMessage =
        response.messages && response.messages[0]?.content
          ? response.messages[0].content
          : "I couldn't understand that. Can you rephrase?";

      setResponse(botMessage);
      speakResponse(botMessage); // Call TTS function to speak the response
    } catch (error) {
      console.error("Error communicating with Lex:", error);
      const errorMessage =
        "Sorry, there was an error processing your request. Please try again.";
      setResponse(errorMessage);
      speakResponse(errorMessage); // Speak the error message
    }
  };

  const handleRecord = () => {
    setIsRecording(!isRecording);
  };

  // Text-to-Speech Function
  const speakResponse = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US"; // Language for the speech synthesis
    speech.pitch = 1; // Pitch of the voice
    speech.rate = 1; // Speed of the speech
    speech.volume = 1; // Volume level

    window.speechSynthesis.speak(speech);
  };

  return (
    <div className="voice-chat flex flex-col items-center justify-center h-screen bg-gray-100 from-[#ADE1FB] to-white">
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
      <div className="response mt-4 p-4 bg-white rounded shadow w-3/4 max-w-lg text-center">
        <h2 className="text-lg font-semibold mb-2">Response</h2>
        <p className="text-gray-700">{response}</p>
      </div>
    </div>
  );
};

export default VoiceChat;
