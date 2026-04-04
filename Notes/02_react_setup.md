# React JS Setup Notes (Windows)

These notes describe a stable, beginner-friendly setup for React (Web) using modern tools like Vite and Create React App (CRA).

---

##  Recommended Version Matrix

| Tool | Version |
|------|---------|
| Node.js | 20.x (LTS) |
| npm | 10.x |
| React | 18+ |
| OS | Windows 10 / 11 |

---

##  What NOT to Use

-  Old Node versions (`<18`)
-  Deprecated tools without support
-  Manual bundler setup (for beginners)

---

## 1️ Vite Setup (Recommended )

Vite is fast, modern, and industry-preferred.

###  Create Project

```bash
npm create vite@latest myApp
cd myApp
npm install
```

###  Install React Plugin

```bash
npm install @vitejs/plugin-react
```

###  Start Development Server

```bash
npm run dev
```

###  Vite Folder Structure

```
myApp/
│
├── node_modules/        # Dependencies
├── public/              # Static files
│
├── src/
│   ├── assets/          # Images, icons
│   ├── App.jsx          # Main component
│   ├── main.jsx         # Entry point
│   ├── index.css        # Global styles
│
├── index.html           # Root HTML file
├── package.json         # Project config
├── vite.config.js       # Vite config
```

###  Key Files

- `main.jsx` → React DOM rendering entry
- `App.jsx` → Root component
- `index.html` → Contains `<div id="root">`

---

## 2️ Create React App (CRA Setup)

CRA is older but still used in many projects.

###  Create Project

```bash
npx create-react-app myApp
cd myApp
```

###  Start Application

```bash
npm start
```

###  CRA Folder Structure

```
myApp/
│
├── node_modules/
├── public/
│   ├── index.html       # Root HTML
│
├── src/
│   ├── App.js           # Main component
│   ├── index.js         # Entry point
│   ├── App.css
│   ├── index.css
│
├── package.json
```

###  Key Files

- `index.js` → Entry point (ReactDOM render)
- `App.js` → Root component
- `public/index.html` → Main HTML file

---

##  Vite vs CRA (Quick Comparison)

| Feature | Vite | CRA |
|---------|------|-----|
| Speed |  Very Fast |  Slower |
| Build Tool | ESBuild | Webpack |
| Setup Time | Instant | Slow |
| Recommendation |  Best Choice |  Legacy |