import { useState, useEffect, useCallback } from "react";
import { FiRefreshCw } from "react-icons/fi";
import Footer from "./Footer";


function generatePassword(length, includeNumbers, includeChars, keyword = "", useKeyword = false) {
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";

  let characters = lowercase + uppercase;
  if (includeNumbers) characters += numbers;
  if (includeChars) characters += symbols;

  // Validate keyword length
  const keywordLength = useKeyword ? keyword.length : 0;
  if (useKeyword && keywordLength >= length) {
    return keyword.slice(0, length); // Trim keyword if it exceeds length
  }

  let password = "";

  // If using keyword, pick a random start index to insert it
  if (useKeyword) {
    const startIndex = Math.floor(Math.random() * (length - keywordLength + 1));

    // Add random characters before the keyword
    for (let i = 0; i < startIndex; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }

    // Insert the keyword
    password += keyword;

    // Add random characters after the keyword
    for (let i = startIndex + keywordLength; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }
  } else {
    // Generate a completely random password if not using the keyword
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }
  }

  return password;
}



function App() {
  const [length, setLength] = useState(8);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeChars, setIncludeChars] = useState(false);
  const [password, setPassword] = useState(generatePassword(length, includeNumbers, includeChars));
  const [fade, setFade] = useState(false);
  const [keyword, setKeyword] = useState("")
  const [useKeyword, setUseKeyword] = useState(false)

  useEffect(() => {
    setFade(true)
    const newPassword = generatePassword(length, includeNumbers, includeChars, keyword, useKeyword);
    setPassword(newPassword);
    setFade(false);
  }, [length, includeNumbers, includeChars, keyword, setUseKeyword]);


  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowUp") {
        setLength((prevLength) => Math.min(prevLength + 1, 32));
      } else if (e.key === "ArrowDown") {
        setLength((prevLength) => Math.max(prevLength - 1, 4));
      }
      else if (e.key === "n") {
        setIncludeNumbers(((prev) => !prev));
      }
      else if (e.key === "s") {
        setIncludeChars(((prev) => !prev));
      }

      else if (e.key === "e") {
        setUseKeyword(((prev) => !prev));
      }

      else if (e.key === 'c' && e.ctrlKey) {
        navigator.clipboard.writeText(password);
        setFade(true)
      }
      else if (e.key === "Enter") {
        regeneratePassword()
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);



  const handleLengthChange = useCallback((e) => {
    const newLength = parseInt(e.target.value, 10);
    if (useKeyword && keyword.length > newLength) {
      alert("Password length must be longer than the keyword length.");
      return;
    }
    setLength(newLength);
  }, [useKeyword, keyword.length]);


  const handleKeywordChange = useCallback((e) => {
    setKeyword(e.target.value);
  }, []);

  const handleIncludeNumbersChange = useCallback((e) => {
    setIncludeNumbers(e.target.checked);
  }, []);

  const handleIncludeCharsChange = useCallback((e) => {
    setIncludeChars(e.target.checked);
  }, []);

  const toggleUseKeyword = useCallback((e) => {
    setUseKeyword((prev) => !prev);
  }, []);



  const regeneratePassword = () => {
    setFade(true);
    const newPassword = generatePassword(length, includeNumbers, includeChars, keyword, useKeyword);
    setPassword(newPassword);
    setFade(false);
  };


  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(password);
    setFade(true)
  });


  return (
    <div className="flex flex-col min-h-screen bg-gray-800">
      <main className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md p-6 bg-gray-900 rounded-lg shadow-lg relative">

          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-center text-lime-50 mb-6">
              Password Generator
            </h1>
            <FiRefreshCw
              className="text-lime-400 hover:text-lime-700 ml-2 mb-5 cursor-pointer"
              onClick={regeneratePassword}
              size="14"
            />
          </div>

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
              className="ml-3 px-4 py-1 text-sm font-medium text-gray-800 bg-lime-400 hover:bg-lime-700 rounded-md"
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

            {/* Keyword Display with Toggle Switch */}
            <div className="flex items-center justify-between mb-4 bg-gray-700 rounded-md p-2">
              <input
                type="text"
                placeholder="Enter keyword"
                value={keyword}
                onChange={handleKeywordChange}
                disabled={!useKeyword} // Disable input if toggle is off
                className="w-full px-2 py-1 text-gray-200 bg-transparent focus:outline-none"
              />
              <label className="flex items-center ml-3">
                <span className="mr-2 text-gray-200">Enable</span>
                <input
                  type="checkbox"
                  checked={useKeyword} // Control this with state
                  onChange={toggleUseKeyword} // Toggle function for keyword usage
                  className="rounded text-lime-500 focus:ring-lime-400 cursor-pointer"
                />
              </label>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );

}

export default App;
