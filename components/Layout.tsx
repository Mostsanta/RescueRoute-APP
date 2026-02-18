
import React from 'react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col max-w-lg mx-auto bg-white shadow-xl">
      <header className="bg-red-600 text-white p-4 sticky top-0 z-50 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🆘</span>
          <h1 className="font-bold text-lg tracking-tight uppercase">RescueRoute</h1>
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full text-sm font-medium transition-colors"
        >
          Reset
        </button>
      </header>
      <main className="flex-1 p-4 pb-24 overflow-y-auto">
        {children}
      </main>
      <footer className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-slate-900 text-white p-4 border-t border-slate-700">
        <div className="flex justify-between items-center text-xs opacity-75">
          <span>No signal? Use offline instructions.</span>
          <a href="tel:911" className="bg-red-500 px-4 py-2 rounded-lg font-bold text-sm animate-pulse">911</a>
        </div>
      </footer>
    </div>
  );
};
