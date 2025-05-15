import React, { useRef, useEffect } from 'react';
import { useChatbot } from './ChatbotContext';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import TypingIndicator from './TypingIndicator';
import { Trash2, X } from 'lucide-react';

const ChatWindow: React.FC = () => {
  const { isOpen, toggleChat, isTyping, clearChat, botName } = useChatbot();
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle clicking outside to close
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current && 
        !containerRef.current.contains(event.target as Node) &&
        // Ignore clicks on the chatbot button
        !(event.target as HTMLElement).closest('.jarvis-chatbot-button')
      ) {
        toggleChat();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, toggleChat]);

  if (!isOpen) return null;

  return (
    <div
      className="jarvis-chatbot-window"
      ref={containerRef}
    >
      <div className="jarvis-chatbot-header">
        <div className="jarvis-chatbot-title">
          <div className="jarvis-avatar"></div>
          <h3>{botName}</h3>
        </div>
        <div className="jarvis-chatbot-controls">
          <button 
            className="jarvis-control-button" 
            onClick={clearChat}
            aria-label="Clear chat"
          >
            <Trash2 size={18} />
          </button>
          <button 
            className="jarvis-control-button" 
            onClick={toggleChat}
            aria-label="Close chat"
          >
            <X size={18} />
          </button>
        </div>
      </div>
      
      <div className="jarvis-chatbot-body">
        <MessageList />
        {isTyping && <TypingIndicator />}
      </div>
      
      <div className="jarvis-chatbot-footer">
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatWindow;