
import React, { useState } from 'react';
import ChatInterface from '@/components/ChatInterface';

const Index = () => {
  // This state could be expanded to include customization options
  const [customization] = useState({
    welcomeMessage: "Halo! Saya asisten virtual Anda. Bagaimana saya bisa membantu Anda hari ini?",
    quickReplies: [
      "Apa itu n8n?",
      "Bagaimana cara menggunakan chatbot ini?",
      "Saya memerlukan bantuan teknis",
      "Layanan apa yang tersedia?"
    ],
    // Company logo could be added here
    // companyLogo: '/your-logo.png'
  });
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="w-full max-w-md h-[600px] shadow-2xl rounded-xl overflow-hidden transition-all duration-700 hover:shadow-xl">
        <ChatInterface 
          welcomeMessage={customization.welcomeMessage}
          quickReplies={customization.quickReplies}
        />
      </div>
      
      <div className="fixed bottom-4 left-4 text-xs text-gray-500 opacity-70">
        <p>Chatbot UI for n8n Integration</p>
      </div>
    </div>
  );
};

export default Index;
