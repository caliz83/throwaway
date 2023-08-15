import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import HangmanDrawing from './HangmanDrawing';
import HangmanWord from './HangmanWord';
import Keyboard from './Keyboard';

function App() {
  const words = "tbd"; //words to pull from api - figure it out and delete this declaration later
  const [wordToGuess, setWordToGuess] = useState(() => {
    return words[Math.floor(Math.random() * words.length)];
  });

  //console.log(wordToGuess);

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]); //each string only length of 1

  return (
    <div style={{maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '2rem', margin: '0 auto', alignItems: 'center' }}>
    <div style={{ fontSize: '2rem', textAlign: 'center' }}>Lose Win</div>
    <HangmanDrawing />
    <HangmanWord />
    <div style={{ alignSelf: 'stretch' }}>
    <Keyboard />
    </div>
  </div>
  )
}

export default App
