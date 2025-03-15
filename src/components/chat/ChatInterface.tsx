
import React from 'react';
import ChatHeader from './ChatHeader';
import MessageContainer from './MessageContainer';
import ChatInput from '../ChatInput';
import { useChatMessages } from './useChatMessages';

const WELCOME_MESSAGE = "Halo! Saya asisten virtual MidwinterAI. Bagaimana saya bisa membantu Anda hari ini?";
const QUICK_REPLIES = [
  "Apa yang bisa MidwinterAI lakukan?",
  "Bagaimana cara menggunakan chatbot ini?",
  "Saya memerlukan bantuan",
];

interface ChatInterfaceProps {
  companyLogo?: string;
  welcomeMessage?: string;
  quickReplies?: string[];
  chatId?: string;
}

const ChatInterface = ({ 
  companyLogo,
  welcomeMessage = WELCOME_MESSAGE,
  quickReplies = QUICK_REPLIES,
  chatId = 'default'
}: ChatInterfaceProps) => {
  const { messages, isTyping, handleSendMessage, playNotificationSound } = useChatMessages({
    initialWelcomeMessage: welcomeMessage,
    chatId
  });

  const handleSendFile = (file: File) => {
    // Handle file sending (would be integrated with workflow)
    console.log('File diterima:', file);
    
    // Send message acknowledging file
    handleSendMessage(`Saya mengirim file: ${file.name}`);
  };
  
  const handleQuickReply = (text: string) => {
    handleSendMessage(text);
  };
  
  return (
    <div className="chat-container flex flex-col h-full w-full rounded-xl overflow-hidden">
      <ChatHeader companyLogo={companyLogo} />
      
      <MessageContainer 
        messages={messages}
        isTyping={isTyping}
        quickReplies={quickReplies}
        onQuickReplySelect={handleQuickReply}
      />
      
      <ChatInput 
        onSendMessage={handleSendMessage} 
        onSendFile={handleSendFile}
      />
    </div>
  );
};

export default ChatInterface;
