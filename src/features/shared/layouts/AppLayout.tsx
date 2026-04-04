import React from 'react';
import { Outlet } from 'react-router-dom';

export const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      <header className="bg-white/80 backdrop-blur-md shadow-sm p-4 sticky top-0 z-50 flex items-center justify-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
          SucuCare
        </h1>
      </header>
      
      <main className="container mx-auto p-4 pb-24 md:max-w-screen-md">
        <Outlet />
      </main>
    </div>
  );
};
