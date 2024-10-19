import fs from 'fs';
import path from 'path';
import CharacterGuessingGame from '../components/CharacterGuessingGame';

export async function getStaticProps() {
  const directoryPath = path.join(process.cwd(), 'public/full-portraits');
  const files = fs.readdirSync(directoryPath);
  const characters = files
    .filter((file) => file.endsWith('.webp'))
    .map((file) => ({
      name: path.basename(file, '.webp'),
    }));

  return {
    props: {
      characters,
    },
  };
}

export default function Home({ characters }) {
  return (
    <div>
      <CharacterGuessingGame characters={characters} />
    </div>
  );
}