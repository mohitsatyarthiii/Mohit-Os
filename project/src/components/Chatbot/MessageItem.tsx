import React from 'react';
import { Message } from './types';
import { formatDistanceToNow } from './utils';

interface MessageItemProps {
  message: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const isBot = message.sender === 'bot';
  const timestamp = formatDistanceToNow(new Date(message.timestamp));

  return (
    <div className={`jarvis-message-item ${isBot ? 'bot' : 'user'} ${message.isError ? 'error' : ''}`}>
      {isBot && <div className="jarvis-message-avatar"></div>}
      <div className="jarvis-message-content">
        {message.content}
        <span className="jarvis-message-time">{timestamp}</span>
      </div>
    </div>
  );
};

export default MessageItem;