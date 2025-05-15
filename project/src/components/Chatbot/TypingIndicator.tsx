import React from 'react';
import { useChatbot } from './ChatbotContext';

const TypingIndicator: React.FC = () => {
  const { botName } = useChatbot();
  
  return (
    <div className="jarvis-typing-indicator">
      <div className="jarvis-message-avatar"></div>
      <div className="jarvis-typing-content">
        <span>{botName} is typing</span>
        <div className="jarvis-typing-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;