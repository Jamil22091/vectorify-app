import React, { useState } from 'react';
import { VECTOR_STYLES, APP_TITLE } from './constants';
import { ImageState, VectorStyle, GenerationResult } from './types';
import { FileUpload } from './components/FileUpload';
import { StyleSelector } from './components/StyleSelector';
import { Button } from './components/Button';
import { ResultDisplay } from './components/ResultDisplay';
import { generateVectorImage } from './services/geminiService';

const App: React.FC = () => {
  const [imageState, setImageState] = useState<ImageState>({
    file: null,
    previewUrl: null,
    base64: null,
    mimeType: null
  });

  const [selectedStyle, setSelectedStyle] = useState<VectorStyle>(VECTOR_STYLES[0]);
  
  const [result, setResult] = useState<GenerationResult>({
    imageUrl: null,
    loading: false,
    error: null
  });

  const handleFileSelect = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setImageState({
          file: file,
          previewUrl: URL.createObjectURL(file),
          base64: e.target.result as string,
          mimeType: file.type
        });
        setResult({ imageUrl: null, loading: false, error: null }); // Reset result on new upload
      }
    };
    reader.readAsDataURL(file);
  };

  const handleClearImage = () => {
    setImageState({ file: null, previewUrl: null, base64: null, mimeType: null });
    setResult({ imageUrl: null, loading: false, error: null });
  };

  const handleGenerate = async () => {
    if (!imageState.base64 || !imageState.mimeType) return;

    setResult({ ...result, loading: true, error: null });

    try {
      const generatedImage = await generateVectorImage(
        imageState.base64,
        imageState.mimeType,
        selectedStyle.prompt
      );
      setResult({ imageUrl: generatedImage, loading: false, error: null });
    } catch (err: any) {
      setResult({ 
        imageUrl: null, 
        loading: false, 
        error: err.message || "An unexpected error occurred." 
      });
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 tracking-tight mb-4">
          {APP_TITLE}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Turn your photos into stunning vector-style art in seconds using Gemini 2.5.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Left Column: Controls & Input */}
        <div className="w-full lg:w-1/2 space-y-8 animate-fade-in" style={{animationDelay: '100ms'}}>
          
          <div className="bg-white p-6 rounded-3xl shadow-xl shadow-indigo-100/50 border border-gray-100">
             <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mr-3 text-sm">1</span>
                  Upload Image
                </h2>
             </div>
            <FileUpload 
              onFileSelect={handleFileSelect} 
              currentImage={imageState.previewUrl} 
              onClear={handleClearImage}
            />
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-xl shadow-indigo-100/50 border border-gray-100">
             <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mr-3 text-sm">2</span>
                  Choose Style
                </h2>
             </div>
            <StyleSelector 
              selectedStyle={selectedStyle} 
              onSelect={setSelectedStyle} 
              disabled={result.loading}
            />
          </div>

          <Button 
            fullWidth 
            onClick={handleGenerate} 
            disabled={!imageState.file || result.loading}
            variant="secondary"
            className="text-lg py-4 shadow-xl shadow-purple-500/20"
          >
            {result.loading ? "Generating Art..." : "Vectorize Image"}
          </Button>

           {result.error && (
            <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-200 flex items-start">
              <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span>{result.error}</span>
            </div>
          )}

        </div>

        {/* Right Column: Output */}
        <div className="w-full lg:w-1/2 space-y-6 animate-fade-in" style={{animationDelay: '200ms'}}>
           <div className="bg-white p-6 rounded-3xl shadow-xl shadow-indigo-100/50 border border-gray-100 min-h-[500px] flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mr-3 text-sm">3</span>
                  Result
                </h2>
                {result.loading && <span className="text-indigo-600 text-sm animate-pulse font-medium">AI is thinking...</span>}
             </div>

             <div className="flex-grow flex items-center justify-center">
                {result.imageUrl ? (
                  <ResultDisplay imageUrl={result.imageUrl} />
                ) : (
                  <div className="text-center text-gray-400">
                    {result.loading ? (
                       <div className="flex flex-col items-center">
                          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
                          <p>Transforming your image...</p>
                          <p className="text-xs mt-2 text-gray-400 max-w-xs">This may take up to 20 seconds. We are using Gemini 2.5 Flash Image.</p>
                       </div>
                    ) : (
                       <div className="flex flex-col items-center">
                         <svg className="w-24 h-24 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                         <p>Upload an image and select a style to see the magic happen.</p>
                       </div>
                    )}
                  </div>
                )}
             </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default App;
