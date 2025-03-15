
import React, { useState, useRef, useEffect } from 'react';
import MessageBubble, { Message } from './MessageBubble';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import QuickReply from './QuickReply';
import { cn } from '@/lib/utils';

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
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const messageContainerRef = useRef<HTMLDivElement>(null);
  
  // Reset pesan saat chatId berubah
  useEffect(() => {
    setMessages([]);
    
    // Inisialisasi dengan pesan selamat datang
    const initialMessage: Message = {
      id: '0',
      text: welcomeMessage,
      sender: 'bot',
      timestamp: new Date()
    };
    setMessages([initialMessage]);
    
    // Putar suara notifikasi untuk pesan selamat datang
    playNotificationSound();
  }, [welcomeMessage, chatId]);
  
  // Scroll ke bawah saat pesan berubah
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Menangani deteksi scroll
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
    // Implementasi notifikasi suara jika diperlukan
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
    
    // Simulasi indikator pengetikan
    setIsTyping(true);
    
    // Simulasi respons bot (akan diganti dengan API call sebenarnya)
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
    // Ini akan diintegrasikan dengan workflow Anda
    console.log('File diterima:', file);
    
    // Kirim pesan yang mengakui file
    handleSendMessage(`Saya mengirim file: ${file.name}`);
  };
  
  const handleQuickReply = (text: string) => {
    handleSendMessage(text);
  };
  
  // Logika respons bot sederhana (akan diganti dengan integrasi API)
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
              M
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
