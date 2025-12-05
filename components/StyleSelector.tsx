import React from 'react';
import { VECTOR_STYLES } from '../constants';
import { VectorStyle } from '../types';

interface StyleSelectorProps {
  selectedStyle: VectorStyle;
  onSelect: (style: VectorStyle) => void;
  disabled?: boolean;
}

export const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyle, onSelect, disabled }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full">
      {VECTOR_STYLES.map((style) => (
        <button
          key={style.id}
          onClick={() => onSelect(style)}
          disabled={disabled}
          className={`
            relative flex flex-col items-center justify-center p-4 rounded-xl border-2 text-left transition-all duration-200 h-full
            ${selectedStyle.id === style.id 
              ? 'border-indigo-600 bg-indigo-50 ring-1 ring-indigo-500 shadow-md' 
              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 bg-white'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
        >
          <div className={`w-8 h-8 rounded-full mb-2 flex items-center justify-center ${selectedStyle.id === style.id ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
            {selectedStyle.id === style.id ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            ) : (
                <span className="text-xs font-bold">{style.id[0].toUpperCase()}</span>
            )}
          </div>
          <span className={`text-sm font-semibold mb-1 ${selectedStyle.id === style.id ? 'text-indigo-900' : 'text-gray-700'}`}>
            {style.name}
          </span>
           <span className="text-xs text-gray-500 text-center leading-tight line-clamp-2">
            {style.description}
          </span>
        </button>
      ))}
    </div>
  );
};