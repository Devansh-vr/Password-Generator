import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(12)
  const [includeNumber, setIncludeNumber] = useState(false)
  const [includeCharacter, setIncludeCharacter] = useState(false)

  const passwordRef = useRef(null)

  const handlePassword = useCallback(() => {

    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz'
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const numberChars = '0123456789'
    const specialChars = '!@#$%^&*()_+~`|}{[]:;?><,./-='

    let allowedChars = lowerCaseChars + upperCaseChars

    if (includeNumber) {
      allowedChars += numberChars
    }

    if (includeCharacter) {
      allowedChars += specialChars
    }

    let generatedPassword = ''

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * allowedChars.length)
      generatedPassword += allowedChars[randomIndex]
    }

    setPassword(generatedPassword)
  }, [includeCharacter, includeNumber, length])

  // Using useEffect to regenerate password when settings change
  useEffect(() => {
    // In this project we regenerate password whenever settings change.
    // The lint rule in this repo is strict about setState inside effects.
    handlePassword()

  }, [handlePassword])







  const handleCopy = () => {

    if (!passwordRef.current) return

    passwordRef.current.select()
    passwordRef.current.setSelectionRange(0, 99999)

    navigator.clipboard.writeText(password)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-5">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h1 className="text-center text-2xl font-semibold mb-6">
          Password Generator
        </h1>

        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-slate-200">Password Length</p>
            <p className="text-slate-200 font-medium">{length}</p>
          </div>
          <input
            type="range"
            min={6}
            max={20}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-orange-400"
          />
        </div>

        <label className="flex items-center gap-3 mb-3 cursor-pointer">
          <input
            type="checkbox"
            checked={includeNumber}
            onChange={() => setIncludeNumber((prev) => !prev)}
            className="accent-orange-400"
          />
          <span>Include Numbers</span>
        </label>

        <label className="flex items-center gap-3 mb-6 cursor-pointer">
          <input
            type="checkbox"
            checked={includeCharacter}
            onChange={() => setIncludeCharacter((prev) => !prev)}
            className="accent-orange-400"
          />
          <span>Include Special Characters</span>
        </label>

        <div className="mb-4">
          <input
            ref={passwordRef}
            type="text"
            value={password}
            readOnly
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 outline-none"
          />
        </div>

        <button
          onClick={handleCopy}
          type="button"
          className="w-full bg-orange-400 hover:bg-orange-500 text-slate-950 font-semibold py-2 rounded-lg"
        >
          Copy Password
        </button>
      </div>
    </div>
  )
}

export default App

