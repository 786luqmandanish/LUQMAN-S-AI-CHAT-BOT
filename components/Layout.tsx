import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Menu } from 'lucide-react';
import { ChatSession } from '../types';

interface SidebarProps {
  sessions: ChatSession[];
  currentSessionId: string | null;
  onSelectSession: (id: string) => void;
  onDeleteSession?: (id: string, e: React.MouseEvent) => void;
}

interface LayoutProps {
  children: React.ReactNode;
  onNewChat: () => void;
  sidebarProps?: SidebarProps; 
}

export const Layout: React.FC<LayoutProps> = ({ children, onNewChat, sidebarProps }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-gray-900 overflow-hidden font-sans">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onNewChat={() => {
          onNewChat();
          setIsSidebarOpen(false);
        }}
        sessions={sidebarProps?.sessions || []}
        currentSessionId={sidebarProps?.currentSessionId || null}
        onSelectSession={(id) => {
          sidebarProps?.onSelectSession(id);
          setIsSidebarOpen(false); // Close sidebar on selection on mobile
        }}
        onDeleteSession={sidebarProps?.onDeleteSession}
      />

      <div className="flex-1 flex flex-col h-full relative min-w-0">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-gray-800 bg-gray-900 text-gray-100 z-20">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 -ml-2 text-gray-400 hover:text-white">
             <Menu size={24} />
          </button>
          <span className="font-medium text-sm">LUQMAN'S AI</span>
          <div className="w-8" /> {/* Spacer for centering */}
        </div>

        {children}
      </div>
    </div>
  );
};