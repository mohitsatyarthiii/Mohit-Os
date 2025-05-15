import React, { useEffect, useRef } from 'react';
import { useChatbot } from './ChatbotContext';
import MessageItem from './MessageItem';

const MessageList: React.FC = () => {
  const { messages } = useChatbot();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="jarvis-message-list">
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;