import React from 'react';
import ChatbotButton from './ChatbotButton';
import ChatWindow from './ChatWindow';
import { ChatbotProvider } from './ChatbotContext';
import './styles.css';

interface ChatbotProps {
  botName?: string;
  primaryColor?: string;
  secondaryColor?: string;
  position?: 'bottom-left' | 'bottom-right';
  welcomeMessage?: string;
  className?: string;
}

const Chatbot: React.FC<ChatbotProps> = ({
  botName = 'Jarvis',
  primaryColor = '#3b82f6',
  secondaryColor = '#1e40af',
  position = 'bottom-left',
  welcomeMessage = "Hello! I'm Jarvis, your virtual assistant. How can I help you today?",
  className,
}) => {
  return (
    <ChatbotProvider
      botName={botName}
      welcomeMessage={welcomeMessage}
    >
      <div 
        className={`jarvis-chatbot-container ${position} ${className || ''}`}
        style={{ 
          '--primary-color': primaryColor, 
          '--secondary-color': secondaryColor 
        } as React.CSSProperties}
      >
        <ChatbotButton />
        <ChatWindow />
      </div>
    </ChatbotProvider>
  );
};

export default Chatbot;