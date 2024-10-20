import React from 'react';
import { Twitter, Youtube, Github} from 'lucide-react';

export default function SocialMediaCard() {
  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-green-500 to-purple-500 text-white p-1 pb-1">
        <h2 className="text-2xl font-bold text-center">Follow me!</h2>
      </div>
      <div className="p-2">
        <img src="/pixel-brush/assets/kevin-portait.webp" alt="Linguine Logo" className="w-36 h-36 mx-auto rounded-full"/>
      </div>
      <div className="flex flex-wrap justify-center space-x-4 p-4 w-full">
      <button
          className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-blue-50 transition-colors"
          onClick={() => window.open('https://twitter.com/intent/follow?screen_name=linguinelabs', '_blank')}
        >
          <Twitter className="h-5 w-5 text-blue-400" />
          <span>@linguinelabs</span>
        </button>
        <button
          className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-red-50 transition-colors"
          onClick={() => window.open('https://www.youtube.com/@linguinelabs?sub_confirmation=1s', '_blank')}
        >
          <Youtube className="h-5 w-5 text-red-500" />
          <span>@linguinelabs</span>
        </button>
        <button
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            onClick={() => window.open('https://github.com/kevinlinxc', '_blank')}
            >
            <Github className="h-5 w-5 text-gray-500" />
            <span>@kevinlinxc</span>
        </button>
      </div>
    </div>
  );
}