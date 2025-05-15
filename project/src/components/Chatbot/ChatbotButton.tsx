import React from 'react';
import { useChatbot } from './ChatbotContext';
import { MessageSquare, X } from 'lucide-react';

const ChatbotButton: React.FC = () => {
  const { isOpen, toggleChat } = useChatbot();

  return (
    <button
      className={`jarvis-chatbot-button ${isOpen ? 'open' : ''}`}
      onClick={toggleChat}
      aria-label={isOpen ? 'Close chat' : 'Open chat'}
    >
      {isOpen ? (
        <X size={24} />
      ) : (
        <MessageSquare size={24} />
      )}
    </button>
  );
};

export default ChatbotButton;