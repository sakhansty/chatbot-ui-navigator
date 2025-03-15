
import React, { useState, useRef } from 'react';
import { Send, Paperclip } from 'lucide-react';
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
    <div className="border-t bg-white p-4">
      <div className="max-w-3xl mx-auto">
        <div className="relative border border-gray-300 rounded-lg shadow-sm">
          <textarea
            className="w-full p-3 pr-24 rounded-lg focus:outline-none resize-none min-h-[52px] max-h-32"
            placeholder="Message MidwinterAI..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
          />
          <div className="absolute bottom-2 right-2 flex gap-2">
            <button 
              onClick={handleFileSelect}
              className="p-1.5 text-gray-500 rounded-md hover:bg-gray-100 transition-colors"
              title="Attach file"
            >
              <Paperclip size={18} />
            </button>
            <button
              className={cn(
                "p-1.5 rounded-md focus:outline-none transition-all duration-300",
                message.trim() 
                  ? "bg-green-600 text-white hover:bg-green-700" 
                  : "bg-gray-200 text-gray-400"
              )}
              onClick={handleSendMessage}
              disabled={!message.trim()}
            >
              <Send size={18} />
            </button>
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
          />
        </div>
        <div className="text-xs text-center text-gray-500 mt-2">
          MidwinterAI may produce inaccurate information about people, places, or facts.
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
