export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: string;
  isError?: boolean;
}

export interface ChatbotContextType {
  isOpen: boolean;
  toggleChat: () => void;
  messages: Message[];
  sendMessage: (content: string) => Promise<void>;
  isTyping: boolean;
  error: string | null;
  clearChat: () => void;
  botName: string;
}