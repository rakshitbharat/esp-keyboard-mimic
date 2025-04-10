import React, { useState } from 'react';

const App: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [text, setText] = useState('');

  return (
    <div className="floating-window min-w-[300px]">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-bold">ESP Keyboard Mimic</h1>
        <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
      </div>
      
      <div className="no-drag">
        <textarea
          className="w-full p-2 border rounded-md mb-2"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to type..."
          rows={3}
        />
        
        <div className="flex justify-between">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={() => {/* TODO: Implement typing */}}
          >
            Type Text
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            onClick={() => setText('')}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
