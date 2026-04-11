# React Router - Complete Notes

---

## 1. What is React Router?

React Router is a **client-side routing library** that maps URL paths to React components and manages navigation state in a Single Page Application (SPA) without full page reloads. It uses the browser's native History API under the hood.

### How it works

In a traditional multi-page app, every route change causes a full server round-trip. React loads a single HTML file. React Router gives the illusion of multiple pages by swapping components based on the URL.

**Navigation flow:**

```
User clicks link -> URL updates -> History API fires -> React Router matches route -> Component swaps (no reload)
```

---

## 2. Core Architecture

React Router is built on 3 layers:

**Layer 1 - Router (Context Provider)**

Wraps the entire app. Provides routing context via React Context API. Listens to browser history events.

```jsx
<BrowserRouter>
  <App />
</BrowserRouter>
```

**Layer 2 - Route Matching**

The `Routes` component evaluates all child `Route` elements and finds the best match using a ranking algorithm.

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
</Routes>
```

**Layer 3 - Rendering**

The matched component is rendered. `Outlet` handles nested child rendering. Context values like params, location, and navigate are available via hooks.

---

## 3. Router Types

| Feature | BrowserRouter | HashRouter | MemoryRouter |
|---|---|---|---|
| URL Style | `/about` | `/#/about` | No URL change |
| Uses | HTML5 History API | URL hash (#) | In-memory array |
| Server Config Needed | Yes | No | No |
| SEO Friendly | Best | Poor | None |
| Bookmarkable | Yes | Yes | No |
| Use Case | Production apps | Static hosting | Tests / React Native |

### Why BrowserRouter needs server config

If a user directly visits `/dashboard/settings`, the server tries to find a file at that path. It does not exist and the server returns 404. You must configure the server to redirect all paths to `index.html`, letting React Router handle routing client-side. This is the classic "works locally, breaks on refresh in production" bug.

### When to use HashRouter

HashRouter is ideal when you cannot control server configuration - such as GitHub Pages, S3 static hosting, or CDN deployments. The hash portion of the URL is never sent to the server, so no server-side routing config is needed.

---

## 4. Route Matching Algorithm (v6)

React Router v6 automatically ranks routes by specificity. You do not need to worry about declaration order as much as in v5.

| Route Type | Example | Priority |
|---|---|---|
| Static segment | `/user/new` | Highest |
| Dynamic segment | `/user/:id` | Medium |
| Splat / wildcard | `/user/*` | Lowest |
| Index route | `index` | Default for parent path |

### Static beats dynamic

```jsx
// URL: /user/new
<Route path="/user/new" element={<CreateUser />} />  // matches first
<Route path="/user/:id" element={<User />} />         // skipped

// URL: /user/42
<Route path="/user/new" element={<CreateUser />} />  // skipped
<Route path="/user/:id" element={<User />} />         // matches
```

### Index Routes

An index route renders at the parent's URL when no child path matches. It acts as the default child.

```jsx
<Route path="/dashboard" element={<Dashboard />}>
  <Route index element={<Overview />} />       {/* renders at /dashboard */}
  <Route path="settings" element={<Settings />} />
</Route>
```

### v5 vs v6 differences

- v5 used `Switch` + `exact` prop and matched top-to-bottom
- v6 replaced `Switch` with `Routes`, removed `exact` (all routes are exact by default)
- v6 added automatic route ranking
- v6 introduced `Outlet` for nested rendering
- v6 uses relative paths for nested routes

---

## 5. Outlet

### What is Outlet?

`Outlet` is a placeholder component that tells React Router where to render the matched child route inside a parent component. Without `Outlet`, nested routes have no place to render.

Think of `Outlet` like a slot inside a layout. The layout (parent) is always visible, but the slot (Outlet) renders different content based on which child route is active.

### Full example

```jsx
// Route definition
<Routes>
  <Route path="/dashboard" element={<DashboardLayout />}>
    <Route index element={<Overview />} />        {/* /dashboard */}
    <Route path="profile" element={<Profile />} /> {/* /dashboard/profile */}
    <Route path="settings" element={<Settings />} />{/* /dashboard/settings */}
  </Route>
</Routes>

// DashboardLayout.jsx
import { Outlet, NavLink } from 'react-router-dom'

function DashboardLayout() {
  return (
    <div>
      <nav>
        <NavLink to="/dashboard">Overview</NavLink>
        <NavLink to="/dashboard/profile">Profile</NavLink>
        <NavLink to="/dashboard/settings">Settings</NavLink>
      </nav>

      {/* Child route renders here */}
      <Outlet />
    </div>
  )
}
```

### Rendering flow

```
URL: /dashboard/profile
  -> Match parent: /dashboard
  -> Render DashboardLayout
  -> Match child: profile
  -> Outlet renders <Profile /> inside DashboardLayout
```

### Passing data to children via Outlet context

```jsx
// Parent - pass value through Outlet
<Outlet context={{ user: currentUser }} />

// Child - receive it
import { useOutletContext } from 'react-router-dom'

function Profile() {
  const { user } = useOutletContext()
  return <h1>Hello {user.name}</h1>
}
```

### Key points

- Forgetting `Outlet` in a parent component causes child routes to be completely invisible - they match in the router but have nowhere to mount
- React Router v6 supports only one `Outlet` per component
- `useOutletContext` is the cleanest way to share parent state with child routes without prop drilling

---

## 6. useParams

### What is useParams?

`useParams` returns an object of key-value pairs where keys are the dynamic segments (prefixed with `:`) defined in the route path, and values are the actual strings from the current URL.

### Basic usage

```jsx
// Route definition
<Route path="/product/:productId" element={<ProductDetail />} />

// ProductDetail.jsx
import { useParams } from 'react-router-dom'

function ProductDetail() {
  const { productId } = useParams()
  // URL: /product/abc-123
  // productId = "abc-123"
  return <h1>Product: {productId}</h1>
}
```

### Multiple dynamic params

```jsx
// Route
<Route path="/team/:teamId/member/:memberId" element={<Member />} />

// Component
function Member() {
  const { teamId, memberId } = useParams()
  // URL: /team/eng/member/42
  // { teamId: "eng", memberId: "42" }
}
```

### How it works internally

```
Route path parsed: /user/:id
  -> URL matched: /user/45
  -> Params object built: { id: "45" }
  -> Stored in Context
  -> useParams reads Context and returns the object
```

### Important gotchas

**Params are always strings.** If you need a number, parse it explicitly:

```jsx
const { id } = useParams()
const numericId = parseInt(id, 10)
```

**Params are undefined if not in the matched route.** Always check before use when dealing with optional segments.

**useParams only works inside a Route-rendered component** or its children. Using it outside the router context throws an error.

### Params vs Query String

| | URL Params (`:id`) | Query String (`?key=val`) |
|---|---|---|
| Example URL | `/user/42` | `/user?id=42` |
| Part of route structure | Yes | No |
| Route matching | Route won't match without it | Route matches regardless |
| Read with | `useParams()` | `useSearchParams()` |
| Use case | Required resource identifiers | Optional filters, pagination, search |

---

## 7. useNavigate

### Purpose

`useNavigate` returns a function for programmatic navigation - triggered by code rather than user clicking a link.

### When to use useNavigate vs Link

| Link / NavLink | useNavigate |
|---|---|
| User-triggered navigation from UI | Code-triggered navigation |
| Renders an `<a>` tag - accessible, keyboard-friendly | After form submission, API call, auth check |
| Use for menus and navigation elements | Use inside event handlers and effects |

### All patterns

```jsx
const navigate = useNavigate()

// Basic navigation
navigate('/dashboard')

// Replace current history entry (back button skips this)
navigate('/login', { replace: true })

// Pass state - not visible in URL
navigate('/profile', { state: { fromLogin: true } })

// Go back / forward in history stack
navigate(-1)  // browser back
navigate(1)   // browser forward
navigate(-2)  // go back 2 pages
```

### Post-login redirect pattern

```jsx
async function handleLogin(credentials) {
  try {
    await loginAPI(credentials)
    navigate('/dashboard', { replace: true })
    // replace: true prevents user from clicking back to login page
  } catch (err) {
    setError(err.message)
  }
}
```

Using `replace: true` after login replaces the current history entry instead of pushing a new one. Without it, the user can click "back" and return to the login page.

### v5 vs v6

In v5: `const history = useHistory()` and `history.push('/path')`
In v6: `const navigate = useNavigate()` and `navigate('/path')`

---

## 8. useLocation and useSearchParams

### useLocation

```jsx
const location = useLocation()
// Returns:
// {
//   pathname: "/dashboard/settings",
//   search: "?tab=security",
//   hash: "#notifications",
//   state: { fromLogin: true },  // passed via navigate()
//   key: "abc123"                // unique per navigation
// }
```

`location.state` is useful for passing non-URL data between pages (such as "which page did the user come from"). It survives navigation but is not visible in the URL bar and is cleared on browser refresh.

### useSearchParams

The v6 replacement for manually parsing `window.location.search`. Works like `useState` but for URL query parameters.

```jsx
const [searchParams, setSearchParams] = useSearchParams()
// URL: /products?category=shoes&sort=price

const category = searchParams.get('category') // "shoes"
const sort = searchParams.get('sort')           // "price"

// Update query params without triggering a navigation
setSearchParams({ category: 'bags', sort: 'name' })
```

---

## 9. NavLink vs Link

```jsx
// Link - basic navigation, no active state awareness
<Link to="/about">About</Link>

// NavLink - automatically applies active class when URL matches
<NavLink
  to="/about"
  className={({ isActive }) => isActive ? 'active-link' : ''}
>
  About
</NavLink>
```

Never use `<a href="/path">` in a React Router app. It triggers a full page reload and loses all React state. Always use `Link` or `NavLink`.

---

## 10. Nested Routing

Nested routing allows parent components to contain child routes, enabling layout reuse across multiple pages.

```jsx
<Routes>
  <Route path="/app" element={<AppLayout />}>
    <Route index element={<Home />} />
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="profile" element={<Profile />} />
  </Route>
</Routes>

// AppLayout.jsx
function AppLayout() {
  return (
    <div>
      <Sidebar />
      <main>
        <Outlet /> {/* child route renders here */}
      </main>
    </div>
  )
}
```

The parent component renders once and persists across child route changes. Only the `Outlet` region updates when the child route changes.

---

## 11. Protected Routes

### Concept

Protected routes are a wrapper pattern that checks authentication before rendering a route. They intercept the route, check a condition, and either render the component or redirect the user.

### Implementation

```jsx
// ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoute({ isAuthenticated }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  return <Outlet />
}

// App.jsx
<Routes>
  <Route path="/login" element={<Login />} />

  <Route element={<ProtectedRoute isAuthenticated={user !== null} />}>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/settings" element={<Settings />} />
  </Route>
</Routes>
```

### Advanced - redirect to original destination

```jsx
function ProtectedRoute({ isAuthenticated }) {
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  return <Outlet />
}

// Login.jsx
function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/dashboard'

  const handleLogin = async () => {
    await loginAPI()
    navigate(from, { replace: true }) // redirect back to where they were
  }
}
```

### Security note

Client-side route protection is UX protection only, not security. Determined users can bypass it. Real security lives in the API layer - every protected endpoint must verify the auth token server-side.

---

## 12. Lazy Loading (Code Splitting)

Without lazy loading, all routes bundle into one JS file. Users download code for all pages on first load, even pages they never visit.

```
Without lazy loading: 1 large bundle -> slow initial load
With lazy loading:    small initial bundle -> chunks load on demand
```

### Implementation

```jsx
import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

// Each becomes its own JS chunk
const Home = lazy(() => import('./pages/Home'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Profile = lazy(() => import('./pages/Profile'))

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Suspense>
  )
}
```

`React.lazy()` returns a component that dynamically imports a module. While the import is pending (network request), `Suspense` catches the pending state and renders the fallback UI. Without `Suspense`, React throws an error because the component is not yet available.

---

## 13. 404 / Not Found Route

Use a wildcard route as the last route. The `*` matches any URL not matched by earlier routes.

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

Because v6 uses route ranking, the wildcard always has the lowest priority and only matches when nothing else does.

---

## 14. Common Mistakes

**Using `<a>` instead of `<Link>`**
Causes full page reload, loses React state, re-initializes the app.

**Forgetting `<Outlet>`**
Nested routes match but render nothing. The parent renders fine but child components never appear.

**Assuming params are numbers**
`useParams` always returns strings. Use `parseInt` or `parseFloat` when numeric values are needed.

**Using `useNavigate` outside Router**
Throws `useNavigate may only be used within a Router component`. The entire app must be wrapped in a Router.

**Multiple `BrowserRouter` instances**
Creates separate router contexts that do not communicate. Use exactly one Router at the root level.

**Not using `replace: true` after form submission or login**
User can click "back" and re-submit the form or return to the login page.

**Missing `Suspense` with `React.lazy`**
React throws if a lazy component suspends and there is no Suspense boundary above it in the tree.

---

## 15. React Router v6.4+ Data APIs

React Router v6.4 introduced `loader` and `action` - data-fetching built directly into the route configuration.

- A **loader** runs before a route renders, fetching data from an API or other source
- An **action** handles form mutations (POST, PUT, DELETE)

This moves data-fetching logic into the route config, similar to the Remix framework's model.

```jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/user/:id',
    element: <UserDetail />,
    loader: async ({ params }) => {
      return fetch(`/api/users/${params.id}`)
    },
    action: async ({ request }) => {
      const formData = await request.formData()
      return updateUser(formData)
    }
  }
])

function UserDetail() {
  const user = useLoaderData()
  return <h1>{user.name}</h1>
}
```

---

## 16. Quick Reference

| Hook / Component | Purpose |
|---|---|
| `useParams()` | Read dynamic URL segments (`:id`) |
| `useNavigate()` | Programmatic navigation |
| `useLocation()` | Current route info, pathname, state |
| `useSearchParams()` | Read and write URL query strings |
| `useOutletContext()` | Read data passed from parent via Outlet |
| `useMatches()` | All current route matches (for breadcrumbs) |
| `<Outlet />` | Render child route inside parent layout |
| `<Navigate />` | Declarative redirect in JSX |
| `<Link />` | Navigation without page reload |
| `<NavLink />` | Link with active state awareness |

---

## 17. Route Config Summary

```jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'

const Dashboard = lazy(() => import('./pages/Dashboard'))

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute isAuthenticated={!!user} />}>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Overview />} />
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>

          {/* Redirect */}
          <Route path="/old-path" element={<Navigate to="/new-path" replace />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
```

---

*End of Notes*