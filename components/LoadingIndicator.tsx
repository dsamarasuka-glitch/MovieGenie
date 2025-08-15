
import React, { useState, useEffect } from 'react';
import { LOADING_MESSAGES } from '../constants';

interface LoadingIndicatorProps {
  message: string;
}

const Spinner = (): React.ReactNode => (
  <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-purple-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

export const LoadingIndicator = ({ message }: LoadingIndicatorProps): React.ReactNode => {
    const [displayMessage, setDisplayMessage] = useState(LOADING_MESSAGES[0]);

    useEffect(() => {
        let index = 0;
        const intervalId = setInterval(() => {
            index = (index + 1) % LOADING_MESSAGES.length;
            setDisplayMessage(LOADING_MESSAGES[index]);
        }, 2500);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 shadow-2xl flex flex-col items-center justify-center text-center h-80">
            <Spinner />
            <h2 className="text-2xl font-bold text-gray-100 mt-4">Generating Your Masterpiece</h2>
            <p className="text-gray-400 mt-2 transition-opacity duration-500">{message || displayMessage}</p>
        </div>
    );
};
   