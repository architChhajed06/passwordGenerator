import { useState, useCallback, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');
  const inputRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+-=[]{}|;:',.<>/?~";

    for (let index = 0; index < length; index++) {
      let charIndex = Math.floor(Math.random() * str.length);
      let char = str.charAt(charIndex);
      pass += char;
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    inputRef.current?.select();
  };

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-lg md:max-w-lg lg:max-w-xl">
      <h1 className="text-3xl font-semibold text-white text-center mb-6">Password Generator</h1>

      <div className="flex flex-col sm:flex-row items-center mb-4 bg-gray-900 rounded-lg shadow-inner">
        <input 
          type="text"
          value={password}
          className="w-full py-2 px-4 text-lg text-gray-300 bg-gray-800 rounded-t-lg sm:rounded-l-lg sm:rounded-t-none focus:outline-none"
          placeholder="Generated password"
          readOnly
          ref={inputRef}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-b-lg sm:rounded-r-lg sm:rounded-b-none hover:bg-blue-500 transition-colors w-full sm:w-auto"
          onClick={copyToClipboard}
        >
          Copy
        </button>
      </div>

      <div className="flex flex-col gap-y-4">
        <div className="flex flex-col sm:flex-row items-center">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="w-full cursor-pointer accent-blue-600"
            onChange={(e) => setLength(parseInt(e.target.value))}
          />
          <span className="mt-2 sm:mt-0 sm:ml-4 text-gray-300">Length: {length}</span>
        </div>

        <div className="flex justify-between sm:justify-center sm:gap-x-8 text-gray-300 text-sm">
          <label className="flex items-center gap-x-2">
            <input
              type="checkbox"
              checked={numberAllowed}
              onChange={() => setNumberAllowed(prev => !prev)}
              className="accent-blue-600"
            />
            Numbers
          </label>
          <label className="flex items-center gap-x-2">
            <input
              type="checkbox"
              checked={charAllowed}
              onChange={() => setCharAllowed(prev => !prev)}
              className="accent-blue-600"
            />
            Characters
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
