import React from 'react';
import { Bot, User, ExternalLink, Globe } from 'lucide-react';
import { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  const hasGrounding = message.groundingChunks && message.groundingChunks.length > 0;

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in-up mb-6`}>
      <div className={`flex max-w-[90%] md:max-w-[80%] gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isUser ? 'bg-indigo-600' : 'bg-emerald-600/20 text-emerald-400'}`}>
          {isUser ? <User size={16} className="text-white" /> : <Bot size={18} />}
        </div>

        <div className="flex flex-col max-w-full min-w-0">
          {/* Bubble */}
          <div 
            className={`
              relative px-5 py-3.5 shadow-md
              ${isUser 
                ? 'bg-indigo-600 text-white rounded-2xl rounded-tr-sm' 
                : 'bg-gray-700/50 backdrop-blur-sm text-gray-100 rounded-2xl rounded-tl-sm border border-gray-600/30'
              }
            `}
          >
            <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{message.text}</p>
            
            {/* Timestamp */}
            <span className={`text-[10px] opacity-50 mt-1 block ${isUser ? 'text-indigo-200' : 'text-gray-400'}`}>
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>

          {/* Grounding Sources (Google Search Results) */}
          {!isUser && hasGrounding && (
            <div className="mt-3 pl-2 w-full animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center gap-2 mb-2">
                <Globe size={12} className="text-emerald-400" />
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Sources</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {message.groundingChunks!.map((chunk, idx) => {
                  if (!chunk.web) return null;
                  return (
                    <a 
                      key={idx}
                      href={chunk.web.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-2 bg-gray-800/40 hover:bg-gray-800 border border-gray-700/50 hover:border-emerald-500/30 rounded-lg transition-all group overflow-hidden"
                    >
                      <div className="bg-gray-900 p-1.5 rounded-md text-gray-400 group-hover:text-emerald-400 transition-colors flex-shrink-0">
                        <ExternalLink size={10} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-gray-300 font-medium truncate group-hover:text-white transition-colors">
                          {chunk.web.title}
                        </p>
                      </div>
                    </a>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};