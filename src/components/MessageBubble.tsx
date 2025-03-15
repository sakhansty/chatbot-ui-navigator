
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
        "message-bubble animate-fade-in flex mb-4",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div 
        className={cn(
          "px-4 py-3 rounded-2xl max-w-[80%] shadow-sm",
          isUser 
            ? "bg-primary text-white rounded-tr-none" 
            : "bg-chatbot-bot text-gray-800 rounded-tl-none border border-gray-200"
        )}
      >
        <p className="text-sm">{message.text}</p>
        <div 
          className={cn(
            "text-[10px] mt-1 opacity-70",
            isUser ? "text-right" : "text-left"
          )}
        >
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
