import './Keyboard.css'

const Keys = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z'
]

type KeyboardProps = {
    disabled?: boolean
    activeLetters: string[] 
    inactiveLetters: string[] 
    addGuessedLetter: (letter: string) => void
}

const Keyboard = ({activeLetters, disabled = false, inactiveLetters, addGuessedLetter}: KeyboardProps) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(75px, 1fr))', gap: '.5rem',}}>
        {Keys.map(key => {
            const isActive = activeLetters.includes(key)
            const isInactive = inactiveLetters.includes(key)

            const btnClass = ['btn', isActive ? 'active' : '', isInactive ? 'inactive' : ''].join(' ').trim();

            return (
                <button onClick={() => addGuessedLetter(key)} className={btnClass} disabled={isInactive || isActive || disabled} key={key}>{key}</button>
            )
        })}
    </div>
  )
}

export default Keyboard