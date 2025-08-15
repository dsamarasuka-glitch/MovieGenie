
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { LoadingIndicator } from './components/LoadingIndicator';
import { VideoPlayer } from './components/VideoPlayer';
import type { UserInput } from './types';
import { generateDetailedPrompt, generateVideo } from './services/geminiService';

export default function App(): React.ReactNode {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleProgressUpdate = useCallback((message: string) => {
    setLoadingMessage(message);
  }, []);

  const handleGenerate = useCallback(async (userInput: UserInput) => {
    setIsLoading(true);
    setError(null);
    setGeneratedVideoUrl(null);
    setGeneratedPrompt('');

    try {
      handleProgressUpdate('Crafting a detailed story for the AI director...');
      const detailedPrompt = await generateDetailedPrompt(userInput);
      setGeneratedPrompt(detailedPrompt);
      console.log('Generated Prompt:', detailedPrompt);

      handleProgressUpdate('Sending script to the Veo video generation service...');
      const videoUrl = await generateVideo(detailedPrompt, userInput.model, handleProgressUpdate);
      setGeneratedVideoUrl(videoUrl);

    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [handleProgressUpdate]);
  
  const handleReset = useCallback(() => {
    setGeneratedVideoUrl(null);
    setGeneratedPrompt('');
    setError(null);
    setIsLoading(false);
  }, []);


  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl">
        <Header />
        <main className="mt-8">
          {error && (
            <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg relative mb-6" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          
          {!isLoading && !generatedVideoUrl && <InputForm onGenerate={handleGenerate} />}
          
          {isLoading && <LoadingIndicator message={loadingMessage} />}
          
          {generatedVideoUrl && !isLoading && (
            <VideoPlayer 
              src={generatedVideoUrl} 
              prompt={generatedPrompt}
              onGenerateNew={handleReset}
            />
          )}
        </main>
      </div>
    </div>
  );
}