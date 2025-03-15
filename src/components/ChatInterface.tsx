
import React, { useState, useRef, useEffect } from 'react';
import MessageBubble, { Message } from './MessageBubble';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import QuickReply from './QuickReply';
import { cn } from '@/lib/utils';

const WELCOME_MESSAGE = "Halo! Saya asisten virtual Anda. Bagaimana saya bisa membantu Anda hari ini?";
const QUICK_REPLIES = [
  "Apa itu n8n?",
  "Bagaimana cara menggunakan chatbot ini?",
  "Saya memerlukan bantuan teknis",
];

interface ChatInterfaceProps {
  companyLogo?: string;
  welcomeMessage?: string;
  quickReplies?: string[];
}

const ChatInterface = ({ 
  companyLogo,
  welcomeMessage = WELCOME_MESSAGE,
  quickReplies = QUICK_REPLIES
}: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const messageContainerRef = useRef<HTMLDivElement>(null);
  
  // Initialize with welcome message
  useEffect(() => {
    const initialMessage: Message = {
      id: '0',
      text: welcomeMessage,
      sender: 'bot',
      timestamp: new Date()
    };
    setMessages([initialMessage]);
    
    // Play notification sound for welcome message
    playNotificationSound();
  }, [welcomeMessage]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Handle scroll detection
  useEffect(() => {
    const container = messageContainerRef.current;
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
  
  const playNotificationSound = () => {
    // Implement sound notification if needed
    // const audio = new Audio('/notification.mp3');
    // audio.play().catch(e => console.log('Audio play failed:', e));
  };
  
  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, newMessage]);
    
    // Simulate typing indicator
    setIsTyping(true);
    
    // Simulate bot response (would be replaced with actual n8n API call)
    setTimeout(() => {
      setIsTyping(false);
      
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(text),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, botResponse]);
      playNotificationSound();
    }, 1500);
  };
  
  const handleSendFile = (file: File) => {
    // This would be integrated with your n8n workflow
    console.log('File received:', file);
    
    // Send a message acknowledging the file
    handleSendMessage(`Saya mengirim file: ${file.name}`);
  };
  
  const handleQuickReply = (text: string) => {
    handleSendMessage(text);
  };
  
  // Simple bot response logic (would be replaced with n8n integration)
  const getBotResponse = (text: string): string => {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('n8n')) {
      return 'n8n adalah platform otomatisasi workflow tanpa kode yang memungkinkan Anda menghubungkan berbagai aplikasi dan layanan untuk mengotomatiskan proses bisnis Anda.';
    }
    
    if (lowerText.includes('chatbot') || lowerText.includes('cara menggunakan')) {
      return 'Anda dapat mengetik pertanyaan atau memilih opsi quick reply. Chatbot ini akan memberikan jawaban atau meneruskan permintaan Anda ke sistem yang tepat.';
    }
    
    if (lowerText.includes('bantuan') || lowerText.includes('teknis')) {
      return 'Untuk bantuan teknis, silakan berikan detail masalah Anda dan tim support kami akan segera membantu Anda.';
    }
    
    return 'Terima kasih atas pesan Anda. Saya akan memproses permintaan Anda dan segera kembali kepada Anda.';
  };
  
  return (
    <div className="chat-container flex flex-col h-full w-full rounded-xl overflow-hidden">
      {/* Header */}
      <div className="bg-white p-4 border-b flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {companyLogo ? (
            <img 
              src={companyLogo} 
              alt="Company Logo" 
              className="h-8 w-8 object-contain"
            />
          ) : (
            <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center text-white font-medium">
              B
            </div>
          )}
          <div>
            <h3 className="font-medium text-gray-900">Asisten Virtual</h3>
            <p className="text-xs text-gray-500">Online</p>
          </div>
        </div>
      </div>
      
      {/* Messages */}
      <div 
        ref={messageContainerRef}
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
                onSelect={handleQuickReply} 
              />
            ))}
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input */}
      <ChatInput 
        onSendMessage={handleSendMessage} 
        onSendFile={handleSendFile}
      />
    </div>
  );
};

export default ChatInterface;
