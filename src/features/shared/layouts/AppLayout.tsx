import { Sprout, Settings } from 'lucide-react';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { SettingsModal } from '../components/SettingsModal';
import { NotificationWatcher } from '../components/NotificationWatcher';

export const AppLayout: React.FC = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-mint-whisper-500 to-caribean-green-500 to-150% text-stone-900 font-sans">
      <NotificationWatcher />
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

      <header className="p-4 sticky top-0 z-50 flex items-center justify-between md:justify-center relative">
        <div className="flex items-center absolute left-4 md:relative md:left-0 md:mr-2">
          <Sprout className="text-clover-bright-500 size-6 mr-2" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
            SucuCare
          </h1>
        </div>
        <button 
            onClick={() => setIsSettingsOpen(true)}
            className="absolute right-4 p-2 text-stone-400 hover:text-stone-600 hover:bg-stone-50 rounded-full transition-colors"
        >
          <Settings className="size-5" />
        </button>
      </header>
      
      <main className="container mx-auto p-4 pb-24 md:max-w-screen-md">
        <Outlet />
      </main>
    </div>
  );
};
