import React from 'react';

export default function ModernCard({ children, className = '', hover = true, padding = 'p-6' }) {
  return (
    <div className={`
      modern-card 
      ${padding} 
      ${hover ? 'hover:scale-105' : ''} 
      ${className}
    `}>
      {children}
    </div>
  );
}