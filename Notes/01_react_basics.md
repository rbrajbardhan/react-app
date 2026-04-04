# Module 1 – Session 1

## Introduction to React (Web)

---

## What is React?

React is an **open-source JavaScript library** developed by **Meta** used to build user interfaces (UI) for:

- Web applications (Browser-based apps)

using **JavaScript** and **JSX**.

> Build reusable UI components for fast and dynamic web apps.

---

## Why React?

Traditional web development uses:

- **HTML** for structure  
- **CSS** for styling  
- **JavaScript** for logic  

Managing large applications becomes difficult.

### React solves this by:

- Component-based architecture  
- Reusable UI components  
- Efficient DOM updates using **Virtual DOM**  
- Better code organization  

---

## Advantages of React

- Reusable components  
- Fast rendering using Virtual DOM  
- Strong community support  
- Easy to learn (if JavaScript is known)  
- SEO-friendly (with frameworks like **Next.js**)  

---

## Limitations of React

- Only handles UI (needs other libraries for full app)  
- JSX can feel unfamiliar initially  
- Requires build tools (like Vite/Webpack)  

---

## React vs React Native vs Flutter

| Feature       | React        | React Native | Flutter |
|--------------|-------------|-------------|---------|
| Platform     | Web         | Mobile      | Mobile  |
| Language     | JavaScript  | JavaScript  | Dart    |
| UI           | HTML, CSS   | Native Components | Widgets |
| Developed By | Meta        | Meta        | Google  |

---

## React Architecture (DOM-based)

### Working Flow

### Explanation

1. React code is written using **JSX**  
2. JSX is converted to JavaScript (via **Babel**)  
3. Virtual DOM is created  
4. React compares changes using **diffing algorithm**  
5. Only required updates are applied to the real DOM  

---

## What is DOM?

DOM (**Document Object Model**) represents the structure of a web page.

React uses a **Virtual DOM** to improve performance.

---

## Virtual DOM

- Lightweight copy of the real DOM  
- React updates Virtual DOM first  
- Then efficiently updates the real DOM  

> This makes React applications fast.

---

## Environment Setup

### Required Software

- Node.js (LTS)  
- Visual Studio Code  
- Browser (Chrome recommended)  

---

## Creating First React App (Vite)

```bash
npm create vite@latest myApp
cd myApp
npm install
npm run dev
```

## Important Files
App.jsx → Root component
main.jsx → Entry point
index.html → Main HTML file
package.json → Dependencies
What is JSX?

JSX stands for JavaScript XML.
It allows writing UI inside JavaScript.

JSX looks like HTML but is not HTML.

### Exmaple
```javascript
function App() {
  return (
    <div>
      <p>Hello React</p>
    </div>
  );
}

export default App;
```