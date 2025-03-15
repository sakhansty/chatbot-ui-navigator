
import React from 'react';

interface ChatHeaderProps {
  companyLogo?: string;
}

const ChatHeader = ({ companyLogo }: ChatHeaderProps) => {
  return (
    <div className="bg-gray-50 p-4 border-b flex items-center justify-between">
      <div className="flex items-center space-x-3">
        {companyLogo ? (
          <img 
            src={companyLogo} 
            alt="MidwinterAI Logo" 
            className="h-8 w-8 object-contain"
          />
        ) : (
          <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center text-white font-medium">
            M
          </div>
        )}
        <div>
          <h3 className="font-medium text-gray-800">MidwinterAI Chat</h3>
          <p className="text-xs text-gray-500">AI Assistant</p>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
