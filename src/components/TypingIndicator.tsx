
import React from 'react';

const TypingIndicator = () => {
  return (
    <div className="flex items-center space-x-1 p-2 w-16 bg-gray-100 rounded-full animate-fade-in">
      <div className="w-2 h-2 rounded-full bg-gray-400 animate-typing-1"></div>
      <div className="w-2 h-2 rounded-full bg-gray-400 animate-typing-2"></div>
      <div className="w-2 h-2 rounded-full bg-gray-400 animate-typing-3"></div>
    </div>
  );
};

export default TypingIndicator;
