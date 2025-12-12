import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Suggestion } from '../types';
import { SUGGESTIONS } from '../constants';

interface HeroEmptyStateProps {
  onSuggestionClick: (text: string) => void;
}

export const HeroEmptyState: React.FC<HeroEmptyStateProps> = ({ onSuggestionClick }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full px-4 text-center animate-fade-in-up">
      <div className="mb-6 p-4 bg-gray-800/50 rounded-full ring-1 ring-gray-700 shadow-xl shadow-indigo-500/10">
        <Sparkles className="w-8 h-8 text-indigo-400" />
      </div>
      
      <h1 className="text-3xl font-semibold text-gray-100 mb-2 tracking-tight">
        How can <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">LUQMAN'S AI</span> help?
      </h1>
      <p className="text-gray-400 mb-10 max-w-lg text-sm md:text-base">
        Your advanced AI partner for coding, analysis, and creative problem solving.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
        {SUGGESTIONS.map((suggestion) => (
          <button
            key={suggestion.id}
            onClick={() => onSuggestionClick(suggestion.text)}
            className="group relative flex items-center justify-between p-4 text-left bg-gray-800/40 hover:bg-gray-800/80 border border-gray-700/50 hover:border-indigo-500/30 rounded-xl transition-all duration-200"
          >
            <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
              {suggestion.text}
            </span>
            <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-indigo-400 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
          </button>
        ))}
      </div>
    </div>
  );
};