import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingPopupProps {
  message: string;
}

const LoadingPopup: React.FC<LoadingPopupProps> = ({ message }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg flex flex-col items-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-lg font-medium mb-2">{message}</p>
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPopup; 