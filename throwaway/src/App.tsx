import { useCallback, useEffect, useState } from 'react'
import './App.css'
import HangmanDrawing from './HangmanDrawing';
import HangmanWord from './HangmanWord';
import Keyboard from './Keyboard';
import words from './Words.json'


function App() {

  function getWord() {
    return words[Math.floor(Math.random() * words.length)];
  }
 
  const [wordToGuess, setWordToGuess] = useState(getWord); 

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]); //each string only length of 1

  const incorrectLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter));

  const isLoser = incorrectLetters.length >= 6
  const isWinner = wordToGuess.split('').every(letter => guessedLetters.includes(letter))

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if(guessedLetters.includes(letter) || isLoser || isWinner) return;

    setGuessedLetters(currentLetters => [...currentLetters, letter])
    },
    [guessedLetters, isLoser, isWinner]
  )

  const [gameOver, setGameOver] = useState(false);

  const refreshGame = useCallback(() => {
    setGuessedLetters([]);
    setWordToGuess(getWord());
    setGameOver(false);
  }, []);
  
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key

      if(!key.match(/^[a-z]$/)) return; //return keys other than letters pressed

      e.preventDefault()
      addGuessedLetter(key)
    }
    document.addEventListener('keypress', handler)  

    return () => {
      document.removeEventListener('keypress', handler)
    }
  }, [guessedLetters])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key

      if(key !== 'Enter') return;

      e.preventDefault()
      setGuessedLetters([])
      setWordToGuess(getWord())
    }
    document.addEventListener('keypress', handler)  

    return () => {
      document.removeEventListener('keypress', handler)
    }  
  }, [guessedLetters]) 

  useEffect(() => {
  if(isLoser || isWinner) {
    setGameOver(true);
  }
  }, [isLoser, isWinner])

  

  return (
    <div style={{maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '2rem', margin: '0 auto', alignItems: 'center' }}>
    <div style={{ fontSize: '2rem', textAlign: 'center' }}>
      {isWinner && 'You won!'}
      {isLoser && 'Nice try!'}
      {gameOver && (<button onClick={refreshGame} className='btn-primary'>Play again!</button>)}
      </div>
    <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
    <HangmanWord reveal={isLoser} guessedLetters={guessedLetters} wordToGuess={wordToGuess} />
    <div style={{ alignSelf: 'stretch' }}>
    <Keyboard disabled={isWinner || isLoser} activeLetters={guessedLetters.filter(letter => wordToGuess.includes(letter))} inactiveLetters={incorrectLetters} addGuessedLetter={addGuessedLetter} />
    </div>
  </div>
  )
}

export default App
