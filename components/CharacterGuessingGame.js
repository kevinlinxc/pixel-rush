import React, { useState, useEffect } from 'react';
import SocialMediaCard from '../components/SocialMediaCard';


const resolutions = ['3x3', '4x4', '5x5', '8x8', '12x12', 'full'];
const baseScore = 10;

function normalizeString(str) {
    return str
        .toLowerCase()
        .replace(/[^a-z]/g, '')
        .split('')
        .sort()
        .join('');
}

const WrongAlert = ({ message }) => (
  <div class="alert"
  style={{
    backgroundColor: '#f8d7da',
    borderColor: '#f5c6cb',
    color: '#721c24',
  }}>
    <strong>Result:</strong> {message}
  </div>
);

const CorrectAlert = ({ message }) => (
    <div class="alert"
    style={{
        backgroundColor: '#d4edda',
        borderColor: '#c3e6cb',
        color: '#155724',
    }}>
    <strong>Result:</strong> {message}
  </div>
);

export default function CharacterGuessingGame({ characters, totalCharacters, props }) {
  const [remainingCharacters, setRemainingCharacters] = useState([]);
  const [currentCharacter, setCurrentCharacter] = useState(null);
  const [currentResolution, setCurrentResolution] = useState(0);
  const [guess, setGuess] = useState('');
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');

  // define some character name mappings for colloquial to actual names
  // don't need to do this for characters with spsaces or symbols, those are handled by normalizeString
    const nameMappings = {
        "nunu": "nunuwillump",
        "renata": "renataglasc",
        "aurelion": "aurelionsol",
        "mundo": "drmundo",
        "jarvan": "jarvaniv",
        "j4": "jarvaniv",
        "lee": "leesin",
        "yi": "masteryi",
        "mf": "missfortune",
        "tahm": "tahmkench",
        "tk": "tahmkench",
        "tf": "twistedfate",
        "xin": "xinzhao",
    }

  useEffect(() => {
    if (characters.length > 0 && remainingCharacters.length === 0) {
      setRemainingCharacters(characters);
      startNewRound(characters);
    }
  }, [characters, remainingCharacters]);

  const startNewRound = (chars) => {
    const randomIndex = Math.floor(Math.random() * chars.length);
    setCurrentCharacter(chars[randomIndex]);
    setCurrentResolution(0);
    setGuess('');
    setMessage('');
  };

  const handleGuess = (e) => {
    e.preventDefault();
    if (normalizeString(guess) === normalizeString(currentCharacter.name) || nameMappings[normalizeString(guess)] === normalizeString(currentCharacter.name)) {
      const roundScore = calculateScore();
      setScore(prevScore => prevScore + roundScore);
      setMessage(`Correct! You scored ${roundScore} points.`);
      const updatedCharacters = remainingCharacters.filter(char => char.name !== currentCharacter.name);
      setRemainingCharacters(updatedCharacters);
      // only start new round if there are characters left
      if (updatedCharacters.length > 0) {
        setTimeout(() => {
          setGuess('');
          setCurrentCharacter(null);
          startNewRound(updatedCharacters);
        }, 1500);
    }else {
            setGameOver(true);
        }
    } else {
      if (currentResolution < resolutions.length - 1) {
        setCurrentResolution(prevRes => prevRes + 1);
        setMessage('Wrong! You guessed: ' + guess);
        setGuess('');

      } else {
        setMessage(`Incorrect. The correct answer was ${currentCharacter.name}.`);
        setTimeout(() => {
          setGuess('');
          setCurrentCharacter(null);
          startNewRound(remainingCharacters);
        }, 1500);
      }
    }
  };

  const calculateScore = () => {
    const resolutionPenalty = currentResolution * 2;
    return Math.max(baseScore - resolutionPenalty, 1);
  };

  if (!currentCharacter) return <div>Loading...</div>;

  const characterFileName = currentResolution === resolutions.length - 1 ? currentCharacter.name : btoa(currentCharacter.name);

  return (
    
    <div style={{ padding: '1rem', maxWidth: '800px', margin: '0 auto', display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'column'}}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', fontFamily: "Inter", fontWeight: 800, fontStyle: "normal" }}>LoL Champion Recognition Test</h1>
      {!gameOver ? (
        <>
          <img
            src={`/${resolutions[currentResolution]}-portraits/${characterFileName}.webp`}
            alt="Guess the character"
            style={{ width: '50%', height: 'auto', marginBottom: '1rem'}}
          />
          <form onSubmit={handleGuess} style={{ marginBottom: '1rem', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
            <input
              type="text"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="Enter champion name (case & symbols ignored)"
              style={{ width: '160%', padding: '1rem', border: '1px solid #ccc', fontFamily: "Inter", fontWeight: 500, fontStyle: "normal" }}
              list="character-names"

            />
            <datalist id="character-names">
              {remainingCharacters.map((char) => (
                <option key={char.name} value={char.name.replaceAll("_", " ")} />
              ))}
            </datalist>
            <button type="submit" class="bg-gradient-to-r from-green-500 to-purple-500 text-white" style={{
              marginTop: '0.5rem',
              width: '100%',
              padding: '0.5rem',
              border: 'none',
              cursor: 'pointer',
              verticalAlign: 'middle',
              fontFamily: "Inter",
              padding: '1rem'
            }}>
              Submit (Enter)
            </button>
          </form>
          {message && (message.includes('Correct') ? <CorrectAlert message={message} /> : <WrongAlert message={message} />)}
          <p>Current Score: {score}/{(totalCharacters - remainingCharacters.length) * baseScore}</p>
          <p>Remaining characters: {remainingCharacters.length}</p>
        </>
      ) : (
        <div style={{textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Game Complete!</h1>
          <h2>Final Score: {score}/{totalCharacters * baseScore}</h2>
            <SocialMediaCard />
        </div>
      )}
    </div>
  );
}