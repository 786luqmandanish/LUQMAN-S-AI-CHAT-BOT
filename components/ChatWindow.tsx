import React, { useRef, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { Message } from '../types';
import { MessageBubble } from './MessageBubble';
import { HeroEmptyState } from './HeroEmptyState';
import { InputBar } from './InputBar';

interface ChatWindowProps {
  messages: Message[];
  isTyping: boolean;
  onSend: (text: string) => void;
  onSuggestionClick: (text: string) => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ 
  messages, 
  isTyping, 
  onSend, 
  onSuggestionClick 
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  return (
    <div className="flex-1 flex flex-col h-full relative bg-gray-800">
      
      {/* Scrollable Message Area */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700">
        <div className="max-w-4xl mx-auto w-full pb-32 pt-6 px-4 md:px-6">
          
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center min-h-[60vh]">
              <HeroEmptyState onSuggestionClick={onSuggestionClick} />
            </div>
          ) : (
            <>
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start w-full animate-fade-in-up">
                  <div className="flex items-center gap-3 bg-gray-700/30 backdrop-blur-sm px-4 py-3 rounded-2xl rounded-tl-sm border border-gray-700/50">
                    <Loader2 size={16} className="text-emerald-400 animate-spin" />
                    <span className="text-sm text-gray-400 font-medium">LUQMAN'S AI is thinking...</span>
                  </div>
                </div>
              )}
              
              <div ref={scrollRef} />
            </>
          )}
        </div>
      </div>

      {/* Sticky Input Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <InputBar onSend={onSend} disabled={isTyping} />
      </div>
    </div>
  );
};