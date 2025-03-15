
import React, { useState, useRef } from 'react';
import { Send, Paperclip, Image } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onSendFile?: (file: File) => void;
}

const ChatInput = ({ onSendMessage, onSendFile }: ChatInputProps) => {
  const [message, setMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0 && onSendFile) {
      onSendFile(files[0]);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };
  
  return (
    <div className="border-t bg-white p-4 rounded-b-xl animate-slide-up">
      <div className="flex items-end gap-2">
        <div className="relative flex-grow">
          <textarea
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 
                    focus:ring-primary focus:border-transparent resize-none min-h-[52px] max-h-32 pr-10"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
          />
          <div className="absolute bottom-2 right-2 flex gap-1">
            <button 
              onClick={handleFileSelect}
              className="p-1.5 text-gray-500 rounded-full hover:bg-gray-100 transition-colors"
              title="Attach file"
            >
              <Paperclip size={18} />
            </button>
            <button 
              onClick={handleFileSelect}
              className="p-1.5 text-gray-500 rounded-full hover:bg-gray-100 transition-colors"
              title="Attach image"
            >
              <Image size={18} />
            </button>
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
          />
        </div>
        
        <button
          className={cn(
            "p-3 rounded-full focus:outline-none transition-all duration-300 flex-shrink-0 shadow-sm",
            message.trim() 
              ? "bg-primary text-white hover:bg-primary/90" 
              : "bg-gray-100 text-gray-400"
          )}
          onClick={handleSendMessage}
          disabled={!message.trim()}
        >
          <Send size={20} className={message.trim() ? "transform rotate-45" : ""} />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
