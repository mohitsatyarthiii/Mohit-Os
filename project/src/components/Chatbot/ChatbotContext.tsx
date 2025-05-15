import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Message, ChatbotContextType } from './types';
import responses from '../../data/responses.json';

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  return context;
};

interface ChatbotProviderProps {
  children: React.ReactNode;
  botName: string;
  welcomeMessage: string;
}

interface KeywordMatch {
  keyword: string;
  response: string;
  score: number;
}

// Intelligent keyword-based matching
const findResponse = (input: string): string => {
  const normalizedInput = input.toLowerCase().trim();
  const inputWords = normalizedInput.split(/\s+/);
  const matches: KeywordMatch[] = [];

  for (const [category, categoryResponses] of Object.entries(responses)) {
    if (category === 'default') continue;

    for (const [keyword, response] of Object.entries(categoryResponses)) {
      const keywordWords = keyword.toLowerCase().split(/\s+/);
      let matchCount = 0;

      keywordWords.forEach(kw => {
        if (inputWords.some(w => w.includes(kw) || kw.includes(w))) {
          matchCount++;
        }
      });

      if (matchCount > 0) {
        matches.push({
          keyword,
          response: response as string,
          score: matchCount / keywordWords.length,
        });
      }
    }
  }

  matches.sort((a, b) => b.score - a.score);
  return matches.length > 0 ? matches[0].response : responses.default;
};

export const ChatbotProvider: React.FC<ChatbotProviderProps> = ({
  children,
  botName,
  welcomeMessage
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  // Clear chat on page load and show welcome message
  useEffect(() => {
    localStorage.removeItem('jarvis-chat-messages');

    const welcome = [{
      id: '0',
      content: welcomeMessage,
      sender: 'bot',
      timestamp: new Date().toISOString(),
    }];
    setMessages(welcome);
  }, [welcomeMessage]);

  // Store messages (if needed in future)
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('jarvis-chat-messages', JSON.stringify(messages));
    }
  }, [messages]);

  const toggleChat = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  // Character-by-character AI typing simulation
  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    await new Promise(resolve => setTimeout(resolve, 800)); // Think delay

    const responseText = findResponse(content);
    const botMessageId = (Date.now() + 1).toString();
    let currentText = '';

    // Add placeholder bot message
    setMessages(prev => [
      ...prev,
      {
        id: botMessageId,
        content: '',
        sender: 'bot',
        timestamp: new Date().toISOString(),
      },
    ]);

    // Typing effect: character by character
    for (let i = 0; i < responseText.length; i++) {
      currentText += responseText[i];

      setMessages(prev =>
        prev.map(msg =>
          msg.id === botMessageId ? { ...msg, content: currentText } : msg
        )
      );

      await new Promise(resolve => setTimeout(resolve, 15)); // Typing speed per char
    }

    setIsTyping(false);
  }, []);

  const clearChat = useCallback(() => {
    const welcome = [{
      id: '0',
      content: welcomeMessage,
      sender: 'bot',
      timestamp: new Date().toISOString(),
    }];
    setMessages(welcome);
    localStorage.setItem('jarvis-chat-messages', JSON.stringify(welcome));
  }, [welcomeMessage]);

  return (
    <ChatbotContext.Provider
      value={{
        isOpen,
        toggleChat,
        messages,
        sendMessage,
        isTyping,
        error: null,
        clearChat,
        botName
      }}
    >
      {children}
    </ChatbotContext.Provider>
  );
};
