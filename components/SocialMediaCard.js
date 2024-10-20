import React from 'react';
import { Twitter, Youtube } from 'lucide-react';

export default function SocialMediaCard() {
  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6">
        <h2 className="text-2xl font-bold text-center">Follow me!</h2>
      </div>
      <div className="p-6">
      </div>
      <div className="flex justify-center space-x-4 p-6">
        <button
          className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-blue-50 transition-colors"
          onClick={() => window.open('https://x.com/linguinelabs', '_blank')}
        >
          <Twitter className="h-5 w-5 text-blue-400" />
          <span>Twitter</span>
        </button>
        <button
          className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-red-50 transition-colors"
          onClick={() => window.open('https://www.youtube.com/@linguinelabs', '_blank')}
        >
          <Youtube className="h-5 w-5 text-red-500" />
          <span>YouTube</span>
        </button>
      </div>
    </div>
  );
}