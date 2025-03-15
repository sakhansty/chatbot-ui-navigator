
import React from 'react';

interface QuickReplyProps {
  text: string;
  onSelect: (text: string) => void;
}

const QuickReply = ({ text, onSelect }: QuickReplyProps) => {
  return (
    <button 
      onClick={() => onSelect(text)}
      className="px-4 py-2 rounded-full bg-white border border-gray-200 text-sm font-medium 
                text-gray-700 shadow-sm hover:bg-gray-50 transition-all duration-200 
                focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                hover:scale-[1.02] active:scale-[0.98]"
    >
      {text}
    </button>
  );
};

export default QuickReply;
