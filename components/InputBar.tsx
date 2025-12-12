import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Mic } from 'lucide-react';

interface InputBarProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export const InputBar: React.FC<InputBarProps> = ({ onSend, disabled }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input);
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [input]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 pb-6 md:pb-8 bg-gradient-to-t from-gray-900 via-gray-900 to-transparent">
      <div className="relative flex items-end bg-gray-800/90 backdrop-blur-md border border-gray-700/50 rounded-2xl shadow-2xl shadow-black/20 ring-1 ring-white/5 focus-within:ring-indigo-500/50 focus-within:border-indigo-500/50 transition-all duration-300">
        
        {/* Attachment Button (Visual Only) */}
        <button className="p-3 mb-1 text-gray-400 hover:text-gray-200 transition-colors rounded-xl hover:bg-gray-700/50 ml-1">
          <Paperclip size={20} />
        </button>

        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message LUQMAN'S AI..."
          rows={1}
          disabled={disabled}
          className="w-full bg-transparent text-gray-100 placeholder-gray-500 text-base py-4 px-2 focus:outline-none resize-none max-h-[150px] overflow-y-auto scrollbar-hide"
          style={{ minHeight: '56px' }}
        />

        <div className="flex items-center mb-1 mr-1">
            {/* Voice Button (Visual Only) */}
            {!input.trim() && (
                 <button className="p-3 text-gray-400 hover:text-gray-200 transition-colors rounded-xl hover:bg-gray-700/50">
                    <Mic size={20} />
                 </button>
            )}

            {/* Send Button */}
            <button
            onClick={() => handleSubmit()}
            disabled={!input.trim() || disabled}
            className={`
                p-3 rounded-xl transition-all duration-200 flex items-center justify-center
                ${input.trim() && !disabled 
                ? 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-500/25 scale-100' 
                : 'bg-transparent text-gray-600 cursor-not-allowed scale-95'}
            `}
            >
            <Send size={18} fill={input.trim() ? "currentColor" : "none"} />
            </button>
        </div>
      </div>
      <p className="text-center text-xs text-gray-500 mt-3 font-light">
        LUQMAN'S AI can make mistakes. Consider checking important information.
      </p>
    </div>
  );
};