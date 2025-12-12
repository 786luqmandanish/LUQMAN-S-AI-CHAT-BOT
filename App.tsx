import React, { useState, useCallback } from 'react';
import { Layout } from './components/Layout';
import { ChatWindow } from './components/ChatWindow';
import { Message } from './types';
import { GoogleGenAI } from "@google/genai";

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  // Function to handle new messages from user
  const handleSendMessage = useCallback(async (text: string) => {
    // 1. Add User Message
    const newUserMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setIsTyping(true);

    try {
      // 2. Call Gemini API
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: text,
        config: {
          tools: [{ googleSearch: {} }],
          systemInstruction: "You are an intelligent agentic model. When asked questions that require external knowledge or up-to-date information, you must use Google Search. First analyze the user's request, then use search results to provide a comprehensive answer.",
        },
      });

      // 3. Process Response
      const responseText = response.text || "I analyzed the request but couldn't generate a text response.";
      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;

      const newAiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'ai',
        timestamp: new Date(),
        groundingChunks: groundingChunks as any,
      };

      setMessages((prev) => [...prev, newAiMessage]);

    } catch (error) {
      console.error("Gemini API Error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I apologize, but I'm having trouble connecting to the network right now. Please check your connection or API key.",
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  }, []);

  const handleNewChat = () => {
    setMessages([]);
    setIsTyping(false);
  };

  return (
    <Layout onNewChat={handleNewChat}>
      <ChatWindow 
        messages={messages} 
        isTyping={isTyping} 
        onSend={handleSendMessage}
        onSuggestionClick={handleSendMessage}
      />
    </Layout>
  );
};

export default App;