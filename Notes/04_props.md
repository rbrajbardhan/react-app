# Introduction to Props (React JS)

**Props** stands for **Properties**.

Props are used to **pass data from one component to another** in React (Web).

### Props are:

-  **Read-only** — cannot be changed by the child component
-  **Immutable** — the original data passed by the parent stays intact

---

## 📦 How Props Work

```
Parent Component  ──── props ────▶  Child Component
(sends data)                        (receives & displays data)
```

---

##  Example of Props

###  Parent Component (`App.jsx`)

The parent passes data to the child using custom attributes.

```jsx
import React from "react";
import Student from "./Student";

function App() {
  return (
    <div>
      <Student name="Rahul" branch="CSE" />
    </div>
  );
}

export default App;
```

> Here, `name="Rahul"` and `branch="CSE"` are props being passed to the `Student` component.

---

###  Child Component (`Student.jsx`)

The child receives all props as a single `props` object.

```jsx
import React from "react";

function Student(props) {
  return (
    <div>
      <p>Name: {props.name}</p>
      <p>Branch: {props.branch}</p>
    </div>
  );
}

export default Student;
```

> Access each prop using `props.name`, `props.branch`, etc.

---

## Using Destructuring (Best Practice )

Instead of writing `props.name` every time, destructure props directly in the function parameter for cleaner code.

```jsx
function Student({ name, branch }) {
  return (
    <div>
      <p>Name: {name}</p>
      <p>Branch: {branch}</p>
    </div>
  );
}
```

| Approach | Syntax | Recommended? |
|----------|--------|--------------|
| Using `props` object | `props.name` |  Fine for beginners |
| Destructuring | `{ name, branch }` | Best practice |

---

##  React Native → React JS: Key Differences

| React Native | React JS | Notes |
|--------------|----------|-------|
| `View` | `div` | Container element |
| `Text` | `p` / `span` | Text display |
| Props | Props | Same concept in both |
| `props.name` | `props.name` | Identical syntax |

> Props work the **same way** in both React Native and React JS — only the UI components differ.

---

##  Key Concepts Summary

| Concept | Detail |
|---------|--------|
| What are Props? | A way to pass data between components |
| Direction | Parent → Child only (one-way data flow) |
| Mutable? |  No — props are read-only inside child |
| Best Practice | Use destructuring `{ name, branch }` |

---

##  Data Flow Diagram

```
App.jsx (Parent)
│
│  <Student name="Rahul" branch="CSE" />
│
▼
Student.jsx (Child)
│
│  props.name  → "Rahul"
│  props.branch → "CSE"
```

>  Data always flows **top-down** in React. A child component can never send props back up to a parent directly.