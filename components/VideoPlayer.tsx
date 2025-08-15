
import React from 'react';

interface VideoPlayerProps {
  src: string;
  prompt: string;
  onGenerateNew: () => void;
}

export const VideoPlayer = ({ src, prompt, onGenerateNew }: VideoPlayerProps): React.ReactNode => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-gray-700 shadow-2xl shadow-purple-900/10 flex flex-col gap-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-100">Your Video is Ready!</h2>
        <video
          src={src}
          controls
          autoPlay
          loop
          className="w-full rounded-lg border-2 border-purple-500/50 shadow-lg"
        />
      </div>
      
      <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
        <h3 className="text-sm font-semibold text-gray-400 mb-2">AI Director's Prompt:</h3>
        <p className="text-gray-300 text-sm italic">"{prompt}"</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <a
          href={src}
          download="moviegenie_video.mp4"
          className="flex-1 text-center bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-all duration-300"
        >
          Download Video
        </a>
        <button
          onClick={onGenerateNew}
          className="flex-1 text-center bg-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-purple-700 transition-all duration-300"
        >
          Create Another
        </button>
      </div>
    </div>
  );
};

// Add fade-in animation to tailwind config or a style tag if needed.
// For simplicity here, we can rely on a potential global css or just note it.
// In a real project, this would go into a CSS file or tailwind.config.js
if (typeof window !== 'undefined') {
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
        }
    `;
    document.head.appendChild(style);
}
   