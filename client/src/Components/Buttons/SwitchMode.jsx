import React from "react";

export default function SwitchMode({ mode, setMode }) {
  return (
    <div className="flex items-center justify-center gap-4 p-4">
      <span className={`text-sm font-medium transition-colors duration-300 ${
        !mode ? 'text-yellow-600' : 'text-gray-400'
      }`}>
        ☀️ Light
      </span>
      
      <button
        onClick={() => setMode((p) => !p)}
        className={`relative inline-flex h-8 w-14 items-center rounded-full transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-lg ${
          mode 
            ? 'bg-gradient-to-r from-indigo-600 to-purple-600' 
            : 'bg-gradient-to-r from-yellow-400 to-orange-500'
        }`}
      >
        <span
          className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform duration-300 ease-in-out ${
            mode ? 'translate-x-7' : 'translate-x-1'
          }`}
        >
          <span className="flex items-center justify-center h-full text-xs">
            {mode ? '🌙' : '☀️'}
          </span>
        </span>
      </button>
      
      <span className={`text-sm font-medium transition-colors duration-300 ${
        mode ? 'text-indigo-600' : 'text-gray-400'
      }`}>
        🌙 Dark
      </span>
    </div>
  );
}
