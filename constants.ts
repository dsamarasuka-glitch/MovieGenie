
import { VideoStyle, VideoTone, VideoLength, VideoModel } from './types';

export const STYLE_OPTIONS = Object.values(VideoStyle);
export const TONE_OPTIONS = Object.values(VideoTone);
export const LENGTH_OPTIONS = Object.values(VideoLength);

export const MODEL_OPTIONS = [
  { value: VideoModel.VEO_2_0, label: 'Veo 2.0 (Standard)' },
  { value: VideoModel.VEO_3_0_FAST, label: 'Veo 3.0 (Fast)' },
  { value: VideoModel.VEO_3_0, label: 'Veo 3.0 (Quality)' },
];

export const LOADING_MESSAGES = [
    "Warming up the AI director's chair...",
    "Assembling the virtual cast and crew...",
    "Scouting digital locations...",
    "Setting up virtual cameras and lighting...",
    "Action! Rendering the first scenes...",
    "Editing and adding special effects...",
    "Composing the soundtrack...",
    "Finalizing the color grading...",
    "The premiere is just moments away!",
];