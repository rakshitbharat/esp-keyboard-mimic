import React, { useState, useEffect } from "react";

declare global {
  interface Window {
    electronAPI: {
      connectDevice: () => Promise<void>;
      sendText: (text: string) => Promise<void>;
      onConnectionStatus: (callback: (status: boolean) => void) => void;
      onTypingStatus: (
        callback: (status: { typing: boolean; progress?: number }) => void
      ) => void;
    };
  }
}

export const App: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingProgress, setTypingProgress] = useState(0);

  useEffect(() => {
    // Set up event listeners for status updates
    window.electronAPI.onConnectionStatus((status) => {
      setIsConnected(status);
    });

    window.electronAPI.onTypingStatus((status) => {
      setIsTyping(status.typing);
      if (status.progress !== undefined) {
        setTypingProgress(status.progress);
      }
    });
  }, []);

  const handleTypeText = async () => {
    if (!text.trim() || !isConnected || isTyping) return;

    try {
      await window.electronAPI.sendText(text);
    } catch (error) {
      console.error("Failed to send text:", error);
    }
  };

  const handleConnect = async () => {
    try {
      await window.electronAPI.connectDevice();
    } catch (error) {
      console.error("Failed to connect:", error);
      setIsConnected(false);
    }
  };

  return (
    <div className="floating-window min-w-[300px]">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-bold">ESP Keyboard Mimic</h1>
        <button
          className={`w-3 h-3 rounded-full ${
            isConnected ? "bg-green-500" : "bg-red-500"
          } cursor-pointer`}
          onClick={handleConnect}
          title={isConnected ? "Connected" : "Click to connect"}
        />
      </div>

      <div className="no-drag">
        <textarea
          className="w-full p-2 border rounded-md mb-2"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to type..."
          rows={3}
          disabled={isTyping}
        />

        {isTyping && (
          <div className="w-full bg-gray-200 rounded h-2 mb-2">
            <div
              className="bg-blue-500 h-2 rounded transition-all duration-200"
              style={{ width: `${typingProgress}%` }}
            />
          </div>
        )}

        <div className="flex justify-between">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleTypeText}
            disabled={!isConnected || !text.trim() || isTyping}
          >
            {isTyping ? "Typing..." : "Type Text"}
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 disabled:opacity-50"
            onClick={() => setText("")}
            disabled={isTyping}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};
