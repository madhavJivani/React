import { useState, useEffect, useCallback } from "react";

function generatePassword(length, includeNumbers, includeChars) {
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";

  let characters = lowercase + uppercase;

  if (includeNumbers) characters += numbers;
  if (includeChars) characters += symbols;

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }

  return password;
}

function App() {
  const [length, setLength] = useState(8);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeChars, setIncludeChars] = useState(false);
  const [password, setPassword] = useState(generatePassword(length, includeNumbers, includeChars));
  const [fade, setFade] = useState(false);

  useEffect(() => {
    setFade(true)
    const newPassword = generatePassword(length, includeNumbers, includeChars);
    setPassword(newPassword);
    setFade(false);
  }, [length, includeNumbers, includeChars]);


  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowUp") {
        setLength((prevLength) => Math.min(prevLength + 1, 32));
      } else if (e.key === "ArrowDown") {
        setLength((prevLength) => Math.max(prevLength - 1, 4));
      }
      else if (e.key === "ArrowLeft") {
        setIncludeNumbers(((prev) => !prev));
      }
      else if (e.key === "ArrowRight") {
        setIncludeChars(((prev) => !prev));
      }

      else if (e.key === "Enter") {
        copyToClipboard()
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);



  const handleLengthChange = useCallback((e) => {
    setLength(parseInt(e.target.value, 10));
  }, []);

  const handleIncludeNumbersChange = useCallback((e) => {
    setIncludeNumbers(e.target.checked);
  }, []);

  const handleIncludeCharsChange = useCallback((e) => {
    setIncludeChars(e.target.checked);
  }, []);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(password);
    setFade(true)
  });


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-6 bg-gray-900 rounded-lg shadow-lg relative">
        <h1 className="text-2xl font-semibold text-center text-lime-50 mb-6">
          Password Generator
        </h1>

        {/* Password Display with Copy Button */}
        <div className="flex items-center justify-between mb-4 bg-gray-700 rounded-md p-2">
          <input
            type="text"
            readOnly
            className={`w-full px-2 py-1 text-gray-200 bg-transparent focus:outline-none transition-opacity duration-300 ease-in-out ${fade ? "opacity-10" : "opacity-100"
              }`}
            placeholder="Generated Password"
            value={password}
          />
          <button
            className="ml-3 px-4 py-1 text-sm font-medium text-gray-800 bg-lime-300 hover:bg-lime-400 rounded-md"
            onClick={copyToClipboard}
          >
            Copy
          </button>
        </div>

        {/* Controls for Password Length and Options */}
        <div className="space-y-4">
          {/* Password Length Slider */}
          <div className="flex items-center space-x-4">
            <label htmlFor="length" className="text-gray-200">
              Length:
            </label>
            <input
              type="range"
              id="length"
              min="4"
              max="32"
              value={length}
              onChange={handleLengthChange}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-gray-200">{length}</span>
          </div>

          {/* Checkbox Options */}
          <div className="flex items-center justify-between">
            <label className="flex items-center text-gray-200">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={handleIncludeNumbersChange}
                className="mr-2 rounded text-lime-500 focus:ring-lime-400"
              />
              Include Numbers
            </label>
            <label className="flex items-center text-gray-200">
              <input
                type="checkbox"
                checked={includeChars}
                onChange={handleIncludeCharsChange}
                className="mr-2 rounded text-lime-500 focus:ring-lime-400"
              />
              Include Symbols
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
