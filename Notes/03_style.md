# Styling in React (Web)

React uses **CSS**, **Inline Styles**, or **CSS frameworks** (like Tailwind) for styling.

> Unlike React Native, React uses actual CSS for styling.

---

##  Ways to Apply Styles

### 1. Inline Styling (JS Object)

Styles are written as a JavaScript object using camelCase properties.

```jsx
<p style={{ fontSize: "20px", color: "blue" }}>
  Hello React
</p>
```

>  Note: Use camelCase (`fontSize`) instead of kebab-case (`font-size`) in inline styles.

---

### 2. CSS File

Define styles in an external `.css` file and apply them using `className`.

```css
/* App.css */
.text {
  font-size: 20px;
  color: blue;
}
```

```jsx
<p className="text">Hello React</p>
```

>  Note: React uses `className` instead of `class` (which is reserved in JavaScript).

---

### 3. Tailwind CSS (Modern Approach )

A **utility-first CSS framework** for fast and responsive UI development — no custom CSS files needed.

---

##  Tailwind CSS Setup (with Vite)

### Step 1 — Install Tailwind

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Step 2 — Configure Tailwind

Edit `tailwind.config.js` to tell Tailwind which files to scan:

```js
// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Step 3 — Add Tailwind Directives to CSS

Paste these three lines at the top of `index.css`:

```css
/* index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Step 4 — Start the Project

```bash
npm run dev
```

---

##  Mini Project: Profile Card (React + Tailwind)

A simple profile card component built entirely with Tailwind CSS utility classes.

```jsx
import React from "react";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">

      <div className="w-[300px] bg-white p-5 rounded-xl shadow-lg text-center">

        <img
          src="https://i.pravatar.cc/150?img=3"
          alt="profile"
          className="w-[120px] h-[120px] rounded-full mx-auto mb-4"
        />

        <h2 className="text-xl font-bold mb-1">
          Rahul Sharma
        </h2>

        <p className="text-gray-500 mb-2">
          React Developer
        </p>

        <p className="text-sm mb-4">
          Passionate about building web applications
          using React and MERN Stack.
        </p>

        <button
          onClick={() => alert("Email: rahul@gmail.com")}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Contact Me
        </button>

      </div>
    </div>
  );
}

export default App;
```

### 🔍 What's Happening Here?

| Tailwind Class | What It Does |
|----------------|--------------|
| `min-h-screen` | Full viewport height |
| `flex justify-center items-center` | Centers card on screen |
| `rounded-xl shadow-lg` | Rounded corners + drop shadow |
| `rounded-full` | Makes image circular |
| `hover:bg-blue-600 transition` | Smooth hover effect on button |

---

## 📝 Quick Summary

| Method | Best For |
|--------|----------|
| Inline Styles | Quick, dynamic, one-off styles |
| CSS File | Traditional, reusable class-based styles |
| Tailwind CSS | Fast, modern, utility-first UI development |