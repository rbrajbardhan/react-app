```js
import { useState, useCallback, useRef, useEffect } from 'react';

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(10);

  const [isNumberUsed, setIsNumberUsed] = useState(true);
  const [isSpecialCharUsed, setIsSpecialCharUsed] = useState(true);
  const [isUpperCaseUsed, setIsUpperCaseUsed] = useState(true);

  const [appName, setAppName] = useState("");
  const [savedPasswords, setSavedPasswords] = useState([]);
  const [copied, setCopied] = useState(false);

  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let str = "abcdefghijklmnopqrstuvwxyz";
    let pass = "";

    if (isNumberUsed) str += "0123456789";
    if (isSpecialCharUsed) str += "!@#$%^&*";
    if (isUpperCaseUsed) str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (let i = 0; i < length; i++) {
      let random = Math.floor(Math.random() * str.length);
      pass += str[random];
    }

    setPassword(pass);
  }, [length, isNumberUsed, isSpecialCharUsed, isUpperCaseUsed]);

  // Auto-generate
  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  // Load
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("passwords")) || [];
    setSavedPasswords(stored);
  }, []);

  //Save
  useEffect(() => {
    localStorage.setItem("passwords", JSON.stringify(savedPasswords));
  }, [savedPasswords]);

  // Copy
  const copyPassword = () => {
    passwordRef.current.select();
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  //  Save
  const savePassword = () => {
    if (!appName || !password) return;

    const newEntry = {
      id: Date.now(),
      app_name: appName,
      app_password: password,
    };

    setSavedPasswords((prev) => [...prev, newEntry]);
    setAppName("");
  };

  // Delete
  const deletePassword = (id) => {
    const updated = savedPasswords.filter((item) => item.id !== id);
    setSavedPasswords(updated);
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">

      <div className="bg-gray-800 p-6 rounded-2xl shadow-lg w-[420px] space-y-5">

        <h2 className="text-2xl font-bold text-center">
          Password Generator
        </h2>


        <div className="flex gap-2">
          <input
            type="text"
            value={password}
            readOnly
            ref={passwordRef}
            className="w-full px-3 py-2 rounded-lg bg-gray-700"
          />

          <button
            onClick={copyPassword}
            className="bg-blue-500 hover:bg-blue-600 px-4 rounded-lg"
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>

        <div>
          <label className="block mb-1">
            Length: <span className="font-bold">{length}</span>
          </label>
          <input
            type="range"
            min="5"
            max="20"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label className="flex gap-2">
            <input
              type="checkbox"
              checked={isNumberUsed}
              onChange={() => setIsNumberUsed(!isNumberUsed)}
            />
            Numbers
          </label>

          <label className="flex gap-2">
            <input
              type="checkbox"
              checked={isSpecialCharUsed}
              onChange={() => setIsSpecialCharUsed(!isSpecialCharUsed)}
            />
            Special Characters
          </label>

          <label className="flex gap-2">
            <input
              type="checkbox"
              checked={isUpperCaseUsed}
              onChange={() => setIsUpperCaseUsed(!isUpperCaseUsed)}
            />
            Uppercase
          </label>
        </div>


        <button
          onClick={generatePassword}
          className="w-full bg-green-500 hover:bg-green-600 py-2 rounded-lg font-semibold"
        >
          Generate Password
        </button>

        <div className="space-y-2">
        <input
          type="text"
          placeholder="Enter App Name"
          value={appName}
          onChange={(e) => setAppName(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-gray-700"
        />
      
        <input
          type="text"
          placeholder="Enter Password (or use generated)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-gray-700"
        />
      
          <button
            onClick={savePassword}
            className="w-full bg-purple-500 hover:bg-purple-600 py-2 rounded-lg"
          >
            Save Password
          </button>
        </div>


          <ul className="mt-2 space-y-2 max-h-40 overflow-y-auto">
            {savedPasswords.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center bg-gray-700 px-3 py-2 rounded-lg"
              >
                <div>
                  <p className="font-bold">{item.app_name}</p>
                  <p className="text-sm">{item.app_password}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      navigator.clipboard.writeText(item.app_password)
                    }
                    className="text-blue-400"
                  >
                    Copy
                  </button>

                  <button
                    onClick={() => deletePassword(item.id)}
                    className="text-red-400"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}

export default App;
```
