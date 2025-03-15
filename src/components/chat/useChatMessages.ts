
import { useState, useEffect } from 'react';
import { Message } from '../MessageBubble';

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
  
  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, newMessage]);
    
    // Start typing indicator
    setIsTyping(true);
    
    // Simulate bot response (would be replaced with actual API call)
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
  
  // Simulate bot response logic (would be replaced by API call)
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
