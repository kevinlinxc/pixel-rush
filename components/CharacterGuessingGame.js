import React, { useState, useEffect } from 'react';

const resolutions = ['3x3', '4x4', '5x5', '8x8', '12x12', 'full'];
const baseScore = 10;
const max_characters = 168;

function normalizeString(str) {
    return str
        .toLowerCase()
        .replace(/[^a-z]/g, '')
        .split('')
        .sort()
        .join('');
}

const WrongAlert = ({ message }) => (
  <div style={{
    padding: '10px',
    backgroundColor: '#f8d7da',
    borderColor: '#f5c6cb',
    color: '#721c24',
    borderRadius: '4px',
    marginBottom: '10px'
  }}>
    <strong>Result:</strong> {message}
  </div>
);

const CorrectAlert = ({ message }) => (
    <div style={{
        padding: '10px',
        backgroundColor: '#d4edda',
        borderColor: '#c3e6cb',
        color: '#155724',
        borderRadius: '4px',
        marginBottom: '10px'
    }}>
    <strong>Result:</strong> {message}
  </div>
);

export default function CharacterGuessingGame({ characters }) {
  const [remainingCharacters, setRemainingCharacters] = useState([]);
  const [currentCharacter, setCurrentCharacter] = useState(null);
  const [currentResolution, setCurrentResolution] = useState(0);
  const [guess, setGuess] = useState('');
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (characters.length > 0 && remainingCharacters.length === 0) {
      setRemainingCharacters(characters);
      startNewRound(characters);
    }
  }, [characters, remainingCharacters]);

  const startNewRound = (chars) => {
    if (chars.length === 0) {
      setGameOver(true);
      return;
    }
    const randomIndex = Math.floor(Math.random() * chars.length);
    setCurrentCharacter(chars[randomIndex]);
    setCurrentResolution(0);
    setGuess('');
    setMessage('');
  };

  const handleGuess = (e) => {
    e.preventDefault();
    if (normalizeString(guess) === normalizeString(currentCharacter.name)) {
      const roundScore = calculateScore();
      setScore(prevScore => prevScore + roundScore);
      setMessage(`Correct! You scored ${roundScore} points.`);
      const updatedCharacters = remainingCharacters.filter(char => char.name !== currentCharacter.name);
      setRemainingCharacters(updatedCharacters);
      setTimeout(() => {
        setGuess('');
        setCurrentCharacter(null);
        startNewRound(updatedCharacters);
      }, 2000);
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
        }, 2000);
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
    <div style={{ padding: '1rem', maxWidth: '400px', margin: '0 auto', display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'column'}}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>LoL Champion Recognition Test</h1>
      {!gameOver ? (
        <>
          <img
            src={`/${resolutions[currentResolution]}-portraits/${characterFileName}.webp`}
            alt="Guess the character"
            style={{ width: '100%', height: 'auto', marginBottom: '1rem'}}
          />
          <form onSubmit={handleGuess} style={{ marginBottom: '1rem', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
            <input
              type="text"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="Enter champion name (case and symbols ignored)"
              style={{ width: '160%', padding: '1rem', border: '1px solid #ccc', borderRadius: '4px'}}
              list="character-names"

            />
            <datalist id="character-names">
              {remainingCharacters.map((char) => (
                <option key={char.name} value={char.name} />
              ))}
            </datalist>
            <button type="submit" style={{
              marginTop: '0.5rem',
              width: '100%',
              backgroundColor: '#3490dc',
              color: 'white',
              padding: '0.5rem',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              verticalAlign: 'middle',
              padding: '1rem'
            }}>
              Submit (Enter)
            </button>
          </form>
          {message && (message.includes('Correct') ? <CorrectAlert message={message} /> : <WrongAlert message={message} />)}
          <p style={{ marginTop: '1rem' }}>Current Score: {score}/{(max_characters - remainingCharacters.length-1) * baseScore}</p>
          <p>Remaining characters: {remainingCharacters.length}</p>
        </>
      ) : (
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Game Over!</h2>
          <p>Final Score: {score}</p>
        </div>
      )}
    </div>
  );
}