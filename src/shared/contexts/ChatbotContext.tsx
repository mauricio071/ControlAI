import { createContext, ReactNode, useContext, useState } from "react";

import { ChatType } from "../../chatbot/components/ChatForm";
import { aiBaseData } from "../../chatbot/data/aiBaseData";

interface ChatbotContextData {
  showChatbot: boolean;
  toggleChatbotVisibility: () => void;
  chatHistory: ChatType[];
  setChatHistory: React.Dispatch<React.SetStateAction<ChatType[]>>;
  generateBotResponse: (history: ChatType[]) => void;
}

const ChatbotContext = createContext({} as ChatbotContextData);

export const useChatbotContext = () => {
  return useContext(ChatbotContext);
};

interface ChatbotProviderProps {
  children: ReactNode;
}

export const ChatbotProvider = ({ children }: ChatbotProviderProps) => {
  const [showChatbot, setShowChatbot] = useState(false);

  const toggleChatbotVisibility = () => {
    setShowChatbot((prev) => !prev);
  };

  const [chatHistory, setChatHistory] = useState<ChatType[]>([
    {
      hideInChat: true,
      role: "model",
      text: aiBaseData,
    },
  ]);

  const generateBotResponse = async (history: ChatType[]) => {
    const updateHistory = (text: string, isError = false) => {
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== "...."),
        { role: "model", text, isError },
      ]);
    };

    const chatBody = history.map(({ role, text }) => ({
      role,
      parts: [{ text }],
    }));

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: chatBody }),
    };

    try {
      const res = await fetch(import.meta.env.VITE_API_URL, requestOptions);
      const data = await res.json();
      if (!res.ok) {
        console.error(data.error.message || "Algo de errado aconteceu");
      }

      const apiResponseText = data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .trim();

      updateHistory(apiResponseText);
    } catch (error) {
      if (error instanceof Error) {
        updateHistory(error.message, true);
      }
    }
  };

  return (
    <ChatbotContext.Provider
      value={{
        showChatbot,
        toggleChatbotVisibility,
        chatHistory,
        setChatHistory,
        generateBotResponse,
      }}
    >
      {children}
    </ChatbotContext.Provider>
  );
};
