
import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import MessageBubble, { Message } from '../MessageBubble';
import TypingIndicator from '../TypingIndicator';
import QuickReply from '../QuickReply';

interface MessageContainerProps {
  messages: Message[];
  isTyping: boolean;
  quickReplies: string[];
  onQuickReplySelect: (text: string) => void;
}

const MessageContainer = ({ 
  messages, 
  isTyping, 
  quickReplies,
  onQuickReplySelect 
}: MessageContainerProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = React.useState(false);
  
  // Scroll to bottom when new messages are added
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Monitor scrolling
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const handleScroll = () => {
      if (container.scrollHeight - container.scrollTop <= container.clientHeight + 100) {
        setIsScrolling(false);
      } else {
        setIsScrolling(true);
      }
    };
    
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <div 
      ref={containerRef}
      className={cn(
        "flex-1 p-4 overflow-y-auto message-container",
        isScrolling ? "scrolling" : ""
      )}
    >
      {messages.map(message => (
        <MessageBubble key={message.id} message={message} />
      ))}
      
      {isTyping && (
        <div className="flex mt-2 mb-4">
          <TypingIndicator />
        </div>
      )}
      
      {/* Show quick replies after bot message if available */}
      {messages.length > 0 && 
       messages[messages.length - 1].sender === 'bot' && 
       !isTyping && (
        <div className="flex flex-wrap gap-2 mt-3 mb-2 animate-fade-in">
          {quickReplies.map((reply, index) => (
            <QuickReply 
              key={index} 
              text={reply} 
              onSelect={onQuickReplySelect} 
            />
          ))}
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageContainer;
