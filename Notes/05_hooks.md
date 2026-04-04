# React Hooks — `useState` & `useEffect`

**Hooks** are special functions in React that let you use **state** and other React features inside **functional components**.

> Before Hooks (React < 16.8), state and lifecycle methods were only available in class components. Hooks changed that.

---

## 🪝 What are Hooks?

- Functions that start with `use` (e.g., `useState`, `useEffect`)
- Only work inside **functional components**
- Cannot be called inside loops, conditions, or nested functions

```
Common Hooks
│
├── useState      → Manage state (data that changes)
├── useEffect     → Handle side effects (API calls, timers)
├── useContext    → Share data without props
├── useRef        → Access DOM elements directly
└── useReducer    → Complex state management
```

> This note covers the two most essential hooks: `useState` and `useEffect`.

---

## 1️⃣ `useState` Hook

### 📌 What is it?

`useState` lets you create a **state variable** — a piece of data that, when changed, causes the component to **re-render** and update the UI.

### 🔹 Syntax

```jsx
const [value, setValue] = useState(initialValue);
```

| Part | Meaning |
|------|---------|
| `value` | The current state value |
| `setValue` | Function to update the state |
| `initialValue` | The starting value of the state |

---

### 💻 Example 1 — Counter

```jsx
import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);  // initial value = 0

  return (
    <div>
      <h2>Count: {count}</h2>

      <button onClick={() => setCount(count + 1)}>
        ➕ Increment
      </button>

      <button onClick={() => setCount(count - 1)}>
        ➖ Decrement
      </button>

      <button onClick={() => setCount(0)}>
        🔄 Reset
      </button>
    </div>
  );
}

export default Counter;
```

> Every time `setCount` is called, React re-renders the component with the new value of `count`.

---

### 💻 Example 2 — Text Input

```jsx
import React, { useState } from "react";

function NameInput() {
  const [name, setName] = useState("");  // initial value = empty string

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <p>Hello, {name}!</p>
    </div>
  );
}

export default NameInput;
```

> `e.target.value` captures what the user types and updates the `name` state in real time.

---

### 💻 Example 3 — Toggle (Boolean State)

```jsx
import React, { useState } from "react";

function ToggleBox() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? "Hide" : "Show"} Message
      </button>

      {isVisible && <p>👋 Hello! I am visible now.</p>}
    </div>
  );
}

export default ToggleBox;
```

> `!isVisible` flips the boolean. `{isVisible && <p>...</p>}` is **conditional rendering**.

---

### ⚠️ Common useState Mistakes

| ❌ Wrong | ✅ Correct |
|----------|-----------|
| `count = count + 1` | `setCount(count + 1)` |
| Mutating state directly | Always use the setter function |
| `useState` inside an `if` block | Always call at the top of the component |

---

## 2️⃣ `useEffect` Hook

### 📌 What is it?

`useEffect` lets you run **side effects** in your component — code that happens **outside the normal render flow**, such as:

- 🌐 Fetching data from an API
- ⏱️ Setting up timers
- 📝 Updating the document title
- 🔔 Adding/removing event listeners

### 🔹 Syntax

```jsx
useEffect(() => {
  // side effect code here

  return () => {
    // cleanup (optional)
  };
}, [dependencies]);
```

| Part | Meaning |
|------|---------|
| Callback function | Code to run as the side effect |
| Return function | Optional cleanup (runs before component unmounts) |
| `[dependencies]` | Controls **when** the effect re-runs |

---

### 🔁 Dependency Array — The Key to `useEffect`

| Dependency | When Effect Runs |
|------------|-----------------|
| No array — `useEffect(() => {})` | Runs after **every** render |
| Empty array — `useEffect(() => {}, [])` | Runs **once** on mount only |
| With values — `useEffect(() => {}, [count])` | Runs when `count` changes |

---

### 💻 Example 1 — Runs on Every Render

```jsx
import React, { useState, useEffect } from "react";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Component rendered!");
  }); // no dependency array

  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}
```

> ⚠️ Runs after every render — use sparingly.

---

### 💻 Example 2 — Runs Once on Mount

```jsx
import React, { useEffect } from "react";

function App() {

  useEffect(() => {
    console.log("Component mounted!");
    // perfect place for API calls
  }, []); // empty array = run once

  return <h1>Hello React</h1>;
}
```

> This is the most common pattern for **fetching data when a page loads**.

---

### 💻 Example 3 — Runs When a Value Changes

```jsx
import React, { useState, useEffect } from "react";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [count]); // runs whenever count changes

  return (
    <button onClick={() => setCount(count + 1)}>
      Click me
    </button>
  );
}
```

> The browser tab title updates in real time every time `count` changes.

---

### 💻 Example 4 — Fetching API Data

```jsx
import React, { useState, useEffect } from "react";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      });
  }, []); // fetch only once on mount

  if (loading) return <p>Loading...</p>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

export default UserList;
```

> `[]` ensures the API call happens only **once** when the component mounts, not on every re-render.

---

### 💻 Example 5 — Cleanup with `useEffect`

```jsx
import React, { useState, useEffect } from "react";

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval); // cleanup on unmount

  }, []);

  return <h2>⏱️ Timer: {seconds}s</h2>;
}

export default Timer;
```

> The `return` inside `useEffect` is the **cleanup function** — it clears the interval when the component is removed from the UI, preventing memory leaks.

---

## 🔄 `useState` vs `useEffect` — Quick Comparison

| Feature | `useState` | `useEffect` |
|---------|-----------|-------------|
| Purpose | Store & update data | Run side effects |
| Triggers re-render? | ✅ Yes | ❌ No |
| When does it run? | On state change | After render |
| Common use cases | Counters, forms, toggles | API calls, timers, DOM updates |
| Returns | `[value, setter]` | Optional cleanup function |

---
# Project: Password Maker (React JS + Tailwind)

Converted from **React Native** → **React JS** with **Tailwind CSS** for styling.

---

## 🔄 Conversion Reference

| React Native | React JS + Tailwind |
|---|---|
| `View` | `div` |
| `Text` | `p`, `h1`, `span` |
| `TextInput` | `input` |
| `Button` | `button` |
| `Switch` | `input type="checkbox"` (styled as toggle) |
| `StyleSheet.create({})` | Tailwind utility classes |
| `style={styles.container}` | `className="..."` |
| `flexDirection: 'row'` | `className="flex flex-row"` |
| `justifyContent: 'space-between'` | `className="justify-between"` |

---

## 💻 Full Code — `App.jsx`

```jsx
import { useState, useEffect } from "react";

export default function App() {
  const [length, setLength] = useState("8");
  const [password, setPassword] = useState("");

  const [useUppercase, setUseUppercase] = useState(true);
  const [useNumbers, setUseNumbers]     = useState(true);
  const [useSymbols, setUseSymbols]     = useState(false);

  // Runs automatically when any setting changes
  useEffect(() => {
    generatePassword();
  }, [length, useUppercase, useNumbers, useSymbols]);

  const generatePassword = () => {
    let chars = "abcdefghijklmnopqrstuvwxyz";

    if (useUppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (useNumbers)   chars += "0123456789";
    if (useSymbols)   chars += "!@#$%^&*()";

    let generated = "";
    const passLength = Number(length);

    for (let i = 0; i < passLength; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      generated += chars[randomIndex];
    }

    setPassword(generated);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    alert("Password copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      {/* Card */}
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">

        {/* Heading */}
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          🔐 Password Maker
        </h1>

        {/* Password Length Input */}
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-1">
            Password Length
          </label>
          <input
            type="number"
            min="4"
            max="32"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Toggle Options */}
        <div className="space-y-3 mb-6">

          {/* Uppercase Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Uppercase Letters (A–Z)</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={useUppercase}
                onChange={() => setUseUppercase(!useUppercase)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-500 transition-colors duration-200"></div>
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow peer-checked:translate-x-5 transition-transform duration-200"></div>
            </label>
          </div>

          {/* Numbers Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Numbers (0–9)</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={useNumbers}
                onChange={() => setUseNumbers(!useNumbers)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-500 transition-colors duration-200"></div>
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow peer-checked:translate-x-5 transition-transform duration-200"></div>
            </label>
          </div>

          {/* Symbols Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Symbols (!@#$)</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={useSymbols}
                onChange={() => setUseSymbols(!useSymbols)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-500 transition-colors duration-200"></div>
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow peer-checked:translate-x-5 transition-transform duration-200"></div>
            </label>
          </div>

        </div>

        {/* Generate Button */}
        <button
          onClick={generatePassword}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-200"
        >
          🔁 Generate Password
        </button>

        {/* Password Display */}
        {password && (
          <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-center">
            <p className="text-lg font-bold text-gray-800 tracking-widest break-all">
              {password}
            </p>
            <button
              onClick={copyToClipboard}
              className="mt-3 text-sm text-blue-500 hover:text-blue-700 underline transition"
            >
              📋 Copy to Clipboard
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
```

---

## 🧠 What Changed from React Native?

### 1. Layout & Styling
- Replaced all `StyleSheet.create({})` with Tailwind `className` utilities
- `flex: 1` + `justifyContent: 'center'` → `min-h-screen flex items-center justify-center`
- `flexDirection: 'row'` + `justifyContent: 'space-between'` → `flex items-center justify-between`

### 2. Input
- `TextInput` with `keyboardType="numeric"` → `<input type="number">` with `min` and `max` attributes
- Tailwind `focus:ring-2 focus:ring-blue-400` adds a clean focus highlight

### 3. Switch → Custom CSS Toggle
React JS has no built-in `<Switch>` component like React Native. A custom toggle is built using:

```
input[type="checkbox"]  →  hidden with sr-only
div (track)             →  bg-gray-300 → peer-checked:bg-blue-500
div (thumb)             →  translate-x-5 on checked via peer-checked
```

### 4. Bonus — Copy to Clipboard
Added a **Copy to Clipboard** button using the browser's `navigator.clipboard` API — not possible in React Native without a third-party library.

```jsx
const copyToClipboard = () => {
  navigator.clipboard.writeText(password);
  alert("Password copied!");
};
```

---

## 📁 File Structure

```
myApp/
├── src/
│   ├── App.jsx       ← All code goes here
│   ├── main.jsx
│   └── index.css     ← Must have @tailwind directives
├── tailwind.config.js
└── index.html
```

---

## ▶️ How to Run

```bash
npm create vite@latest myApp
cd myApp
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm run dev
```

Then paste the Tailwind directives in `index.css` and copy the code into `App.jsx`.