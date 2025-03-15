
import { useState, useEffect } from 'react';
import { Message } from '../MessageBubble';
import { n8nService } from '../../services/n8nService';

interface UseChatMessagesProps {
  initialWelcomeMessage: string;
  chatId: string;
}

export const useChatMessages = ({ initialWelcomeMessage, chatId }: UseChatMessagesProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  
  // Reset messages when chatId changes
  useEffect(() => {
    setMessages([]);
    
    // Initialize with welcome message
    const initialMessage: Message = {
      id: '0',
      text: initialWelcomeMessage,
      sender: 'bot',
      timestamp: new Date()
    };
    setMessages([initialMessage]);
    
    // Could play notification sound here
    playNotificationSound();
  }, [initialWelcomeMessage, chatId]);
  
  const playNotificationSound = () => {
    // Implementation of notification sound (commented out for now)
    // const audio = new Audio('/notification.mp3');
    // audio.play().catch(e => console.log('Audio play failed:', e));
  };
  
  const handleSendMessage = async (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, newMessage]);
    
    // Start typing indicator
    setIsTyping(true);
    
    try {
      // Get response from n8n workflow
      const n8nResponse = await n8nService.sendMessage(text, chatId);
      
      setIsTyping(false);
      
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: n8nResponse.message || getBotResponse(text), // Fallback to local responses if n8n returns empty
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, botResponse]);
      playNotificationSound();
    } catch (error) {
      console.error("Error processing message:", error);
      setIsTyping(false);
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I encountered an error processing your request. Please try again.",
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    }
  };
  
  // Fallback bot response logic (used when n8n connection fails)
  const getBotResponse = (text: string): string => {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('midwinter') || lowerText.includes('apa yang bisa')) {
      return 'MidwinterAI adalah asisten virtual yang dirancang untuk membantu Anda mendapatkan informasi, menjawab pertanyaan, dan melaksanakan tugas-tugas sederhana dengan interface chat yang mudah digunakan.';
    }
    
    if (lowerText.includes('chatbot') || lowerText.includes('cara menggunakan')) {
      return 'Anda dapat mengetik pertanyaan atau memilih opsi quick reply. MidwinterAI akan memberikan jawaban atau meneruskan permintaan Anda ke sistem yang tepat.';
    }
    
    if (lowerText.includes('bantuan') || lowerText.includes('help')) {
      return 'Tentu, saya di sini untuk membantu. Silakan jelaskan apa yang Anda butuhkan dan saya akan berusaha memberikan solusi terbaik.';
    }
    
    return 'Terima kasih atas pesan Anda. Saya akan memproses permintaan Anda dan segera kembali kepada Anda.';
  };
  
  return {
    messages,
    isTyping,
    handleSendMessage,
    playNotificationSound
  };
};
