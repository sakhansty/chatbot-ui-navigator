
import React from 'react';
import { cn } from '@/lib/utils';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isUser = message.sender === 'user';
  
  return (
    <div 
      className={cn(
        "message-bubble px-4 py-6 animate-fade-in",
        isUser ? "bg-white" : "bg-gray-50"
      )}
    >
      <div className="max-w-3xl mx-auto flex items-start gap-4">
        <div 
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
            isUser ? "bg-blue-500" : "bg-green-500"
          )}
        >
          <span className="text-white font-medium text-sm">
            {isUser ? 'U' : 'M'}
          </span>
        </div>
        
        <div className="flex-1">
          <p className="text-sm text-gray-800">{message.text}</p>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
