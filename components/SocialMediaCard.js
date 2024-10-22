import React from 'react';
import { Twitter, Youtube, Github } from 'lucide-react';

export default function SocialMediaCard() {
  return (
    <div className="w-4/12 rounded-lg shadow-[1px_10px_15px_5px_rgba(0,0,0,0.1)] invisible md:visible">
      <div className="rounded-t-lg bg-gradient-to-r from-green-500 to-purple-500 p-1 pb-1 text-white">
        <h2 className="text-center text-2xl font-bold">Follow me!</h2>
      </div>
      <div className="flex h-full items-center pr-6">
        <div className="m-6 mr-0">
          <img
            src="/pixel-brush/assets/kevin-portait.webp"
            alt="Linguine Logo"
            className="m-0 w-4/5 w-auto rounded-full"
          />
        </div>
        <ul className="m-4 mr-2">
          <li className="pb-4 pt-4">
            <button
              className="flex items-center space-x-2 rounded-md border border-gray-300 px-4 py-2 transition-colors hover:bg-blue-50"
              onClick={() =>
                window.open('https://twitter.com/intent/follow?screen_name=linguinelabs', '_blank')
              }
            >
              <Twitter className="h-5 w-5 text-blue-400" />
              <span>@linguinelabs</span>
            </button>
          </li>
          <li className="pb-4">
            <button
              className="flex items-center space-x-2 rounded-md border border-gray-300 px-4 py-2 transition-colors hover:bg-red-50"
              onClick={() =>
                window.open('https://www.youtube.com/@linguinelabs?sub_confirmation=1s', '_blank')
              }
            >
              <Youtube className="h-5 w-5 text-red-500" />
              <span>@linguinelabs</span>
            </button>
          </li>
          <li className="pb-4">
            <button
              className="flex items-center space-x-2 rounded-md border border-gray-300 px-4 py-2 transition-colors hover:bg-gray-50"
              onClick={() => window.open('https://github.com/kevinlinxc', '_blank')}
            >
              <Github className="h-5 w-5 text-gray-500" />
              <span>@kevinlinxc</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
