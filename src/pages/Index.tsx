
import React, { useState } from 'react';
import ChatInterface from '@/components/chat/ChatInterface';
import { Snowflake, Plus, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [currentChatId, setCurrentChatId] = useState<string>('default');
  const [chatHistory, setChatHistory] = useState<{ id: string; name: string; messages: any[] }[]>([
    { 
      id: 'default', 
      name: 'New Chat', 
      messages: [] 
    }
  ]);

  // State for chatbot customization
  const [customization] = useState({
    welcomeMessage: "Hello! I'm MidwinterAI, a generative AI assistant. How can I help you today?",
    quickReplies: [
      "Tell me about MidwinterAI",
      "What can you do?",
      "Help me with a task",
    ],
  });

  // Function to create a new chat
  const createNewChat = () => {
    const newChatId = `chat_${Date.now()}`;
    const newChat = {
      id: newChatId,
      name: `New Chat`,
      messages: []
    };
    
    setChatHistory(prev => [...prev, newChat]);
    setCurrentChatId(newChatId);
  };

  // Get current active chat
  const currentChat = chatHistory.find(chat => chat.id === currentChatId) || chatHistory[0];
  
  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar - ChatGPT style */}
      <div className="w-64 bg-gray-900 text-white p-2 flex flex-col">
        <Button
          onClick={createNewChat}
          variant="outline"
          className="w-full mb-4 justify-start text-white border-white/20 bg-transparent hover:bg-gray-800"
        >
          <Plus size={16} className="mr-2" />
          New chat
        </Button>
        
        <div className="flex-1 overflow-y-auto space-y-1">
          {chatHistory.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setCurrentChatId(chat.id)}
              className={`w-full text-left px-3 py-2 rounded flex items-center hover:bg-gray-800 transition-colors ${
                currentChatId === chat.id ? 'bg-gray-800' : ''
              }`}
            >
              <MessageSquare size={16} className="mr-2 flex-shrink-0" />
              <span className="truncate text-sm">{chat.name}</span>
            </button>
          ))}
        </div>
        
        <div className="mt-auto pt-4 border-t border-white/20">
          <div className="flex items-center gap-2 px-3 py-2">
            <Snowflake className="h-5 w-5 text-white" />
            <span className="text-sm font-medium">MidwinterAI</span>
          </div>
        </div>
      </div>
      
      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        <ChatInterface 
          welcomeMessage={customization.welcomeMessage}
          quickReplies={customization.quickReplies}
          chatId={currentChatId}
        />
      </div>
    </div>
  );
};

export default Index;
