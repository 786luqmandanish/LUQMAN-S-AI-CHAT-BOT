import React from 'react';
import { Plus, MessageSquare, User, Settings, X, Trash2 } from 'lucide-react';
import { ChatSession } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNewChat: () => void;
  sessions: ChatSession[];
  currentSessionId: string | null;
  onSelectSession: (id: string) => void;
  onDeleteSession?: (id: string, e: React.MouseEvent) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  onClose, 
  onNewChat, 
  sessions, 
  currentSessionId, 
  onSelectSession,
  onDeleteSession 
}) => {
  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Sidebar Container */}
      <aside 
        className={`
          fixed md:static inset-y-0 left-0 z-50 w-[280px] bg-gray-900 border-r border-gray-800 
          transform transition-transform duration-300 ease-in-out flex flex-col
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Header / New Chat */}
        <div className="p-4">
          <div className="flex justify-between items-center md:hidden mb-4">
            <span className="font-semibold text-gray-200">Menu</span>
            <button onClick={onClose} className="p-1 text-gray-400 hover:text-white">
              <X size={20} />
            </button>
          </div>

          <button 
            onClick={onNewChat}
            className="flex items-center gap-3 w-full px-4 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-all duration-200 shadow-lg shadow-indigo-900/20 hover:shadow-indigo-900/40 group"
          >
            <Plus size={18} className="group-hover:rotate-90 transition-transform duration-200" />
            <span className="text-sm font-medium">New Chat</span>
          </button>
        </div>

        {/* History List */}
        <div className="flex-1 overflow-y-auto px-2 py-2 space-y-6 scrollbar-thin scrollbar-thumb-gray-800 hover:scrollbar-thumb-gray-700">
          <div>
            <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">History</h3>
            <ul className="space-y-1">
              {sessions.length === 0 ? (
                <li className="px-4 py-2 text-sm text-gray-500 italic">No previous chats</li>
              ) : (
                sessions.sort((a,b) => b.date - a.date).map((session) => (
                  <li key={session.id} className="relative group">
                    <button 
                      onClick={() => onSelectSession(session.id)}
                      className={`
                        flex items-center gap-3 w-full px-4 py-3 text-left text-sm rounded-lg transition-colors truncate
                        ${currentSessionId === session.id 
                          ? 'bg-gray-800 text-white shadow-sm ring-1 ring-white/5' 
                          : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'}
                      `}
                    >
                      <MessageSquare 
                        size={16} 
                        className={`flex-shrink-0 transition-colors ${currentSessionId === session.id ? 'text-emerald-400' : 'text-gray-600 group-hover:text-indigo-400'}`} 
                      />
                      <span className="truncate pr-4">{session.title}</span>
                    </button>
                    
                    {/* Optional delete button */}
                    {onDeleteSession && (
                      <button 
                        onClick={(e) => onDeleteSession(session.id, e)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Delete Chat"
                      >
                         <Trash2 size={14} />
                      </button>
                    )}
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>

        {/* User Footer */}
        <div className="p-4 border-t border-gray-800 bg-gray-900/50">
          <button className="flex items-center gap-3 w-full p-2 hover:bg-gray-800 rounded-xl transition-colors group">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-inner">
               <User size={18} className="text-white" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-gray-200 group-hover:text-white">Luqman Danish</p>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div>
                <span className="text-xs text-gray-500 group-hover:text-gray-400">Pro Plan</span>
              </div>
            </div>
            <Settings size={18} className="text-gray-500 group-hover:text-gray-300" />
          </button>
        </div>
      </aside>
    </>
  );
};