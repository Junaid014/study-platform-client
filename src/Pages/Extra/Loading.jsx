
import React from 'react';

const Loading = () => {
  return (
    <div className="flex min-h-screen justify-center items-center bg-white">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600 text-sm font-medium">Loading, please wait...</p>
      </div>
    </div>
  );
};

export default Loading;

