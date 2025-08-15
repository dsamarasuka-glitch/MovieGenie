
import React, { useState, useMemo } from 'react';
import type { UserInput } from '../types';
import { VideoStyle, VideoTone, VideoLength, VideoModel } from '../types';
import { STYLE_OPTIONS, TONE_OPTIONS, LENGTH_OPTIONS, MODEL_OPTIONS } from '../constants';

interface InputFormProps {
  onGenerate: (userInput: UserInput) => void;
}

export const InputForm = ({ onGenerate }: InputFormProps): React.ReactNode => {
  const [theme, setTheme] = useState('');
  const [style, setStyle] = useState<VideoStyle>(VideoStyle.ANIMATION);
  const [tone, setTone] = useState<VideoTone>(VideoTone.COMICAL);
  const [length, setLength] = useState<VideoLength>(VideoLength.SHORT);
  const [model, setModel] = useState<VideoModel>(VideoModel.VEO_3_0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (theme.trim() === '') return;
    setIsSubmitting(true);
    onGenerate({ theme, style, tone, length, model });
  };
  
  const commonSelectClasses = "w-full bg-gray-800 border border-gray-600 rounded-lg p-3 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200";
  const commonLabelClasses = "block mb-2 text-sm font-medium text-gray-400";

  const helperText = useMemo(() => {
    switch (model) {
      case VideoModel.VEO_2_0:
        return "Note: Veo 2.0 generates silent video clips (approx. 5-8 seconds). The selected length influences the narrative scope.";
      case VideoModel.VEO_3_0_FAST:
        return "Note: Veo 3.0 Fast generates video with audio (approx. 8 seconds). Prioritizes speed over quality.";
      case VideoModel.VEO_3_0:
        return "Note: Veo 3.0 Quality generates high-fidelity video with audio (approx. 8 seconds).";
      default:
        return "Select a model to see details.";
    }
  }, [model]);


  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-gray-700 shadow-2xl shadow-purple-900/10">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="theme" className={commonLabelClasses}>
            What's your video about?
          </label>
          <textarea
            id="theme"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            placeholder="e.g., A lost robot in a magical forest meets a mischievous fairy"
            className="w-full h-32 bg-gray-800 border border-gray-600 rounded-lg p-3 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 resize-none"
            required
            aria-describedby="theme-helper"
          />
           <p id="theme-helper" className="mt-2 text-xs text-gray-500">
            {helperText}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="model" className={commonLabelClasses}>AI Model</label>
            <select id="model" value={model} onChange={(e) => setModel(e.target.value as VideoModel)} className={commonSelectClasses}>
              {MODEL_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="style" className={commonLabelClasses}>Style</label>
            <select id="style" value={style} onChange={(e) => setStyle(e.target.value as VideoStyle)} className={commonSelectClasses}>
              {STYLE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="tone" className={commonLabelClasses}>Tone</label>
            <select id="tone" value={tone} onChange={(e) => setTone(e.target.value as VideoTone)} className={commonSelectClasses}>
              {TONE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="length" className={commonLabelClasses}>Narrative Length</label>
            <select id="length" value={length} onChange={(e) => setLength(e.target.value as VideoLength)} className={commonSelectClasses}>
              {LENGTH_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
        </div>

        <button 
          type="submit"
          disabled={!theme.trim() || isSubmitting}
          className="w-full flex items-center justify-center bg-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50"
        >
          {isSubmitting ? '...' : 'Generate Video'}
        </button>
      </form>
    </div>
  );
};
