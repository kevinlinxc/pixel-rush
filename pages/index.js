import fs from 'fs';
import path from 'path';
import React, { useState } from 'react';
import CharacterGuessingGame from '../components/CharacterGuessingGame';


export async function getStaticProps() {
    const testing = false;
    const directoryPath = path.join(process.cwd(), 'public/full-portraits');
    const files = fs.readdirSync(directoryPath);
    const characters = files
      .filter((file) => file.endsWith('.webp'))
      .map((file) => ({
        name: path.basename(file, '.webp'),
      }));
    const limitedCharacters = testing ? characters.slice(0, 6) : characters;
    return {
      props: {
        characters: limitedCharacters,
        totalCharacters: limitedCharacters.length,
      },
    };
  }


export default function Home({ characters, totalCharacters }) {
  const [showModal, setShowModal] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);

  const handleStart = () => {
    setShowModal(false);
    setGameStarted(true);
  };

  return (
    <div className="flex h-screen flex-col justify-between relative">
      <div className={`${showModal ? 'blur-sm' : ''} transition-all duration-200`}>
        <div>
          {gameStarted && (
            <CharacterGuessingGame 
              characters={characters} 
              totalCharacters={totalCharacters}
              gameStarted={gameStarted}
            />
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 transform transition-all">
            <div className="flex flex-col items-center space-y-6">
              {/* Title */}
              <h2 className="text-2xl font-bold text-gray-900">
                Pixel Brush
              </h2>
              
              {/* Tutorial Image */}
              <img
                src="/pixel-brush/assets/pixel-brush.gif"
                alt="Tutorial gif"
                className="rounded-lg w-full"
              />
              
              {/* Description */}
              <p className="text-center text-gray-600">
                LoL champion portraits have been pixelated,
                guess as many as possible in 10 minutes!
              </p>

              {/* Start Button */}
              <button 
                onClick={handleStart}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-8 rounded-lg transition-colors duration-200"
              >
                Okay!
              </button>
            </div>
          </div>
        </div>
      )}

      <footer>
        <p className="pb-5 text-center text-sm text-gray-400">
          Made with ♥ by{' '}
          <a
            className="text-blue-500 hover:underline"
            href="https://twitter.com/intent/follow?screen_name=linguinelabs"
            target="_blank"
            rel="noopener noreferrer"
          >
            @linguinelabs
          </a>
        </p>
      </footer>
    </div>
  );
}