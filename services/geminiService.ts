
import { GoogleGenAI, type GenerateVideosOperation } from '@google/genai';
import type { UserInput } from '../types';
import { VideoModel } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateDetailedPrompt = async (userInput: UserInput): Promise<string> => {
  const prompt = `
    Create a detailed, vivid, and highly descriptive prompt for an AI video generation model (like Google Veo).
    The goal is to generate a short video clip based on the user's request.
    The prompt should be a single paragraph describing the scene, camera work, and atmosphere.
    Do NOT include instructions about audio, BGM, SFX, or dialogue. Focus purely on the visual elements.

    User Request:
    - Theme: "${userInput.theme}"
    - Style: ${userInput.style}
    - Tone: ${userInput.tone}
    - Desired Narrative Length: ${userInput.length}

    Based on this, generate a single, dense paragraph of visual description. For example:
    "A cinematic, ultra-realistic shot of a lone astronaut exploring a vibrant, bioluminescent alien jungle on an exoplanet. The camera slowly pans, following the astronaut as they push aside glowing flora. The atmosphere is thick with shimmering spores, catching the light from the astronaut's helmet. The tone is one of awe and wonder, with a hint of suspense."

    Now, generate the prompt for the user's request.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error generating detailed prompt:", error);
    throw new Error("Failed to generate a detailed prompt. The creative AI might be on a break.");
  }
};


export const generateVideo = async (
  prompt: string,
  model: VideoModel,
  onProgressUpdate: (message: string) => void
): Promise<string> => {
  try {
    onProgressUpdate("Initiating video generation with Veo...");

    const isVeo3 = model === VideoModel.VEO_3_0 || model === VideoModel.VEO_3_0_FAST;
    
    // Define configuration based on the model version to ensure compatibility.
    const config: {
        numberOfVideos: number;
        aspectRatio?: '16:9' | '9:16';
        personGeneration?: 'allow_all' | 'allow_adult' | 'dont_allow';
    } = {
        numberOfVideos: 1,
    };

    if (isVeo3) {
        // Veo 3 models have specific requirements that differ from Veo 2.
        config.aspectRatio = '16:9';
        config.personGeneration = 'allow_all';
    }

    let operation: GenerateVideosOperation = await ai.models.generateVideos({
      model: model,
      prompt: prompt,
      config: config,
    });

    onProgressUpdate("Video generation is in progress. This may take a few minutes...");
    console.log("Polling for video generation status...");

    while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        onProgressUpdate("Checking progress... Still rendering.");
        operation = await ai.operations.getVideosOperation({ operation: operation });
        console.log("Current operation status:", operation.name, "Done:", operation.done);
    }
    
    onProgressUpdate("Finalizing video... Almost there!");

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!downloadLink) {
      throw new Error("Video generation completed, but no download link was found.");
    }

    console.log("Fetching video from URI:", downloadLink);
    onProgressUpdate("Downloading generated video...");

    const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
    if (!response.ok) {
        const errorText = await response.text();
        console.error("Download error response:", errorText);
        throw new Error(`Failed to download video file. Status: ${response.status}`);
    }

    const videoBlob = await response.blob();
    const videoUrl = URL.createObjectURL(videoBlob);
    
    console.log("Video URL created:", videoUrl);
    return videoUrl;

  } catch (error) {
    console.error("Error generating video:", error);
    let errorMessage = "An unknown error occurred during video generation.";
    if (error instanceof Error) {
        errorMessage = error.message;
        if (errorMessage.includes("NOT_FOUND")) {
            errorMessage += " The requested model might not be available in your region or for your project. Please check your model access.";
        }
    }
    throw new Error(errorMessage);
  }
};
