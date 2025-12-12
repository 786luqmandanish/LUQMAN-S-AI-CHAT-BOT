import React, { useState, useCallback, useEffect } from 'react';
import { Layout } from './components/Layout';
import { ChatWindow } from './components/ChatWindow';
import { Message, ChatSession } from './types';
import { GoogleGenAI } from "@google/genai";

// Helper to safely parse dates from JSON
const dateReviver = (key: string, value: any) => {
  if (key === 'timestamp' && typeof value === 'string') {
    return new Date(value);
  }
  return value;
};

const App: React.FC = () => {
  // --- State Management ---
  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    try {
      const saved = localStorage.getItem('chat_sessions');
      return saved ? JSON.parse(saved, dateReviver) : [];
    } catch (e) {
      console.error("Failed to parse sessions from local storage", e);
      return [];
    }
  });

  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  // Persist sessions to Local Storage
  useEffect(() => {
    localStorage.setItem('chat_sessions', JSON.stringify(sessions));
  }, [sessions]);

  // Derive current messages
  const activeSession = sessions.find(s => s.id === currentSessionId);
  const messages = activeSession ? activeSession.messages : [];

  // --- Handlers ---

  const handleSendMessage = useCallback(async (text: string) => {
    setIsTyping(true);
    let activeId = currentSessionId;

    // 1. Create New Session if needed
    if (!activeId) {
      const newId = Date.now().toString();
      // Generate title from first few words
      const words = text.split(' ');
      const title = words.slice(0, 5).join(' ') + (words.length > 5 ? '...' : '');
      
      const newUserMessage: Message = {
        id: Date.now().toString(),
        text,
        sender: 'user',
        timestamp: new Date(),
      };

      const newSession: ChatSession = {
        id: newId,
        title,
        messages: [newUserMessage],
        date: Date.now(),
      };

      setSessions(prev => [newSession, ...prev]);
      setCurrentSessionId(newId);
      activeId = newId;
    } else {
      // Add to existing session
      const newUserMessage: Message = {
        id: Date.now().toString(),
        text,
        sender: 'user',
        timestamp: new Date(),
      };

      setSessions(prev => prev.map(s => 
        s.id === activeId 
          ? { ...s, messages: [...s.messages, newUserMessage], date: Date.now() } 
          : s
      ));
    }

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

      // Update Session with AI response
      setSessions(prev => prev.map(s => 
        s.id === activeId 
          ? { ...s, messages: [...s.messages, newAiMessage] } 
          : s
      ));

    } catch (error) {
      console.error("Gemini API Error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I apologize, but I'm having trouble connecting to the network right now. Please check your connection or API key.",
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setSessions(prev => prev.map(s => 
        s.id === activeId 
          ? { ...s, messages: [...s.messages, errorMessage] } 
          : s
      ));
    } finally {
      setIsTyping(false);
    }
  }, [currentSessionId]);

  const handleNewChat = () => {
    setCurrentSessionId(null);
    setIsTyping(false);
  };

  const handleSelectSession = (id: string) => {
    setCurrentSessionId(id);
    setIsTyping(false);
  };
  
  const handleDeleteSession = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSessions(prev => prev.filter(s => s.id !== id));
    if (currentSessionId === id) {
      setCurrentSessionId(null);
    }
  };

  return (
    <Layout 
      onNewChat={handleNewChat}
      sidebarProps={{
        sessions,
        currentSessionId,
        onSelectSession: handleSelectSession,
        onDeleteSession: handleDeleteSession
      }}
    >
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