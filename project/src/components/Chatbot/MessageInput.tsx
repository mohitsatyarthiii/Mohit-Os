import React, { useState, useRef, useEffect } from 'react';
import { useChatbot } from './ChatbotContext';
import { Send } from 'lucide-react';

const MessageInput: React.FC = () => {
  const [input, setInput] = useState('');
  const { sendMessage, isTyping } = useChatbot();
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isTyping) {
      sendMessage(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="jarvis-message-input-form">
      <input
        ref={inputRef}
        type="text"
        className="jarvis-message-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        disabled={isTyping}
      />
      <button 
        type="submit" 
        className={`jarvis-send-button ${(!input.trim() || isTyping) ? 'disabled' : ''}`}
        disabled={!input.trim() || isTyping}
      >
        <Send size={20} />
      </button>
    </form>
  );
};

export default MessageInput;