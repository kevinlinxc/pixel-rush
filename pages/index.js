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

  const limitedCharacters = testing ? characters.slice(0, 3) : characters;

  return {
    props: {
      characters: limitedCharacters,
      totalCharacters: limitedCharacters.length,
    },
  };
}

export default function Home({ characters, totalCharacters }) {
  return (
    <div>
      <CharacterGuessingGame characters={characters} totalCharacters={totalCharacters}/>
    </div>
  );
}