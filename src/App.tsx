import * as React from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function useLetter() {
  const [letter, setLetter] = React.useState('A');

  return {
    letter,
    updateLetter() {
      setLetter('B')
    }
  }
}

function App() {
  const { letter } = useLetter();

  return (
    <main>
    <output>{ letter }</output>
    </main>
  )
}

export default App
