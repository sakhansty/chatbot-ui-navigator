
import React, { useState, useEffect } from 'react';
import ChatInterface from '@/components/ChatInterface';
import { Snowflake } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [currentChatId, setCurrentChatId] = useState<string>('default');
  const [chatHistory, setChatHistory] = useState<{ id: string; name: string; messages: any[] }[]>([
    { 
      id: 'default', 
      name: 'Chat Baru', 
      messages: [] 
    }
  ]);

  // State untuk kustomisasi chatbot
  const [customization] = useState({
    welcomeMessage: "Halo! Saya asisten virtual MidwinterAI. Bagaimana saya bisa membantu Anda hari ini?",
    quickReplies: [
      "Apa yang bisa MidwinterAI lakukan?",
      "Bagaimana cara menggunakan chatbot ini?",
      "Saya memerlukan bantuan",
      "Layanan apa yang tersedia?"
    ],
  });

  // Fungsi untuk membuat chat baru
  const createNewChat = () => {
    const newChatId = `chat_${Date.now()}`;
    const newChat = {
      id: newChatId,
      name: `Chat Baru ${chatHistory.length + 1}`,
      messages: []
    };
    
    setChatHistory(prev => [...prev, newChat]);
    setCurrentChatId(newChatId);
  };

  // Mendapatkan chat aktif saat ini
  const currentChat = chatHistory.find(chat => chat.id === currentChatId) || chatHistory[0];
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="w-full max-w-md h-[600px] shadow-2xl rounded-xl overflow-hidden transition-all duration-700 hover:shadow-xl flex flex-col">
        {/* Header dengan logo MidwinterAI */}
        <div className="bg-white p-3 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Snowflake className="h-6 w-6 text-primary" />
            <h1 className="text-lg font-semibold text-gray-800">MidwinterAI</h1>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={createNewChat}
            className="text-xs"
          >
            Chat Baru
          </Button>
        </div>
        
        <ChatInterface 
          welcomeMessage={customization.welcomeMessage}
          quickReplies={customization.quickReplies}
          chatId={currentChatId}
        />
      </div>
      
      <div className="fixed bottom-4 left-4 text-xs text-gray-500 opacity-70">
        <p>MidwinterAI - Asisten virtual Anda</p>
      </div>
    </div>
  );
};

export default Index;
