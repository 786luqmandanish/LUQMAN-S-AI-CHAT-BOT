import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Menu } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  onNewChat: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, onNewChat }) => {
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