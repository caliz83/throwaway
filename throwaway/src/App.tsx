import { useCallback, useEffect, useState } from 'react'
import './App.css'
import HangmanDrawing from './HangmanDrawing';
import HangmanWord from './HangmanWord';
import Keyboard from './Keyboard';


function App() {
  function getWord() {
    return words[Math.floor(Math.random() * words.length)];
  }
  const words = "tbd"; //words to pull from api - figure it out and delete this declaration later
  const [wordToGuess, setWordToGuess] = useState(getWord);

  //console.log(wordToGuess);

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
  
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key

      if(!key.match(/^[a-z]$/)) return;

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
  }, []) //doublecheck the input here

  return (
    <div style={{maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '2rem', margin: '0 auto', alignItems: 'center' }}>
    <div style={{ fontSize: '2rem', textAlign: 'center' }}>
      {isWinner && 'Winner! Refresh the page to play again.'}
      {isLoser && 'Nice try! Refresh the page to try again.'}
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
