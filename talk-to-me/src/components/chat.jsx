import React from "react";

const Chat = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex flex-col h-screen bg-gray-100 pb-14 pt-10">
      <div className="flex flex-col flex-grow p-4 overflow-auto">
        <div className="flex flex-col flex-grow overflow-auto">
          <div className="flex w-full mt-2 space-x-3 max-w-xs">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
            <div>
              <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                <p className="text-sm">Hello! How can I help you today?</p>
              </div>
              <span className="text-xs text-gray-500 leading-none">
                2 min ago
              </span>
            </div>
          </div>
          <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
            <div>
              <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                <p className="text-sm">I need some assistance with my order.</p>
              </div>
              <span className="text-xs text-gray-500 leading-none">
                1 min ago
              </span>
            </div>
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
          </div>
        </div>
      </div>
      <div className="bg-white p-4 flex">
        <input
          className="flex-grow h-10 px-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
          type="text"
          placeholder="Type your message..."
        />
        <button className="ml-4 bg-blue-600 text-white px-4 py-2 rounded">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
