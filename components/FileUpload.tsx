import React, { ChangeEvent, useRef, useState } from 'react';
import { MAX_FILE_SIZE_MB } from '../constants';
import { Button } from './Button';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  currentImage: string | null;
  onClear: () => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, currentImage, onClear }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndProcess(e.target.files[0]);
    }
  };

  const validateAndProcess = (file: File) => {
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      alert(`File too large. Max size is ${MAX_FILE_SIZE_MB}MB`);
      return;
    }
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file.');
      return;
    }
    onFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndProcess(e.dataTransfer.files[0]);
    }
  };

  if (currentImage) {
    return (
      <div className="relative w-full h-96 bg-gray-100 rounded-2xl overflow-hidden border-4 border-white shadow-xl group">
        <img 
          src={currentImage} 
          alt="Original" 
          className="w-full h-full object-contain bg-checkered" 
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
           <Button variant="danger" onClick={onClear}>Remove Image</Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full h-96 rounded-2xl border-4 border-dashed transition-all duration-300 flex flex-col items-center justify-center p-8 bg-gray-50
        ${isDragging ? 'border-indigo-500 bg-indigo-50 scale-[1.02]' : 'border-gray-300 hover:border-indigo-400'}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="text-center space-y-4 max-w-sm">
        <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-colors ${isDragging ? 'bg-indigo-200' : 'bg-indigo-100'}`}>
          <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-800">Upload your photo</h3>
        <p className="text-gray-500 text-sm">Drag and drop your image here, or click to browse. Supported: JPG, PNG, WEBP.</p>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
        <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
          Select Image
        </Button>
      </div>
    </div>
  );
};
