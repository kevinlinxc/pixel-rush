import fs from 'fs';
import path from 'path';
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
  return (
    <div className="flex h-screen flex-col justify-between">
      <div>
        <CharacterGuessingGame characters={characters} totalCharacters={totalCharacters} />
      </div>
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
