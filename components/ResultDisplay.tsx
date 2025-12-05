import React from 'react';
import { Button } from './Button';

interface ResultDisplayProps {
  imageUrl: string;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ imageUrl }) => {
  
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `vector-art-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center animate-fade-in">
       <div className="relative w-full h-96 bg-gray-100 rounded-2xl overflow-hidden border-4 border-white shadow-xl mb-6">
        <img 
          src={imageUrl} 
          alt="Generated Vector Art" 
          className="w-full h-full object-contain bg-checkered" 
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <Button variant="primary" fullWidth onClick={handleDownload}>
           <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
           Download PNG
        </Button>
      </div>
    </div>
  );
};
