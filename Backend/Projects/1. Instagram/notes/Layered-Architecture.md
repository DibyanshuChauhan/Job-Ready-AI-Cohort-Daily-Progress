# 🏗️ Frontend Architecture in React (4-Layer Architecture)

> A scalable, maintainable, and industry-standard approach to structuring React applications.

---

## 📖 Table of Contents

* [Introduction](#-introduction)
* [Why Do We Need Architecture?](#-why-do-we-need-architecture)
* [The 4 Layers](#-the-4-layers)
* [Architecture Flow](#-architecture-flow)
* [1. UI Layer](#-1-ui-layer-presentation-layer)
* [2. Hooks Layer](#-2-hooks-layer-orchestration-layer)
* [3. State Layer](#-3-state-layer-memory-layer)
* [4. API Layer](#-4-api-layer-backend-communication-layer)
* [Complete Request Flow](#-complete-request-flow)
* [Folder Structure](#-recommended-folder-structure)
* [Layer Communication Rules](#-layer-communication-rules)
* [Common Mistakes](#-common-architecture-mistakes)
* [Benefits](#-benefits-of-this-architecture)
* [Conclusion](#-conclusion)

---

# 📌 Introduction

As React applications grow, managing components, API calls, state, and business logic inside the same files becomes difficult.

A clean architecture helps us:

* Keep code organized
* Improve maintainability
* Reduce duplication
* Simplify debugging
* Scale applications easily

To achieve this, we divide the frontend into **4 separate layers**, where each layer has a single responsibility.

---

# 🤔 Why Do We Need Architecture?

Imagine a login component like this:

```jsx
const Login = () => {
  const handleLogin = async () => {
    const response = await axios.post("/login");

    localStorage.setItem(
      "token",
      response.data.token
    );
  };

  return (
    <button onClick={handleLogin}>
      Login
    </button>
  );
};
```

This works for small projects.

However, as the project grows:

* More API calls are added
* More business logic appears
* State becomes harder to manage
* Components become larger
* Code gets duplicated

This eventually creates **Spaghetti Code**.

A proper architecture solves these problems.

---

# 🏛️ The 4 Layers

```text
┌─────────────────────┐
│  UI Layer           │
│  (Presentation)     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Hooks Layer        │
│  (Orchestration)    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  State Layer        │
│  (Memory)           │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  API Layer          │
│  (Backend Access)   │
└─────────────────────┘
```

Each layer performs exactly one responsibility.

---

# 🔄 Architecture Flow

```text
User Action
     │
     ▼
UI Layer
     │
     ▼
Hooks Layer
     │
     ▼
API Layer
     │
     ▼
Backend Server
     │
     ▼
Response
     │
     ▼
Hooks Layer
     │
     ▼
State Layer
     │
     ▼
UI Re-renders
```

---

# 🎨 1. UI Layer (Presentation Layer)

## Purpose

The UI Layer is responsible for displaying information and collecting user input.

Users interact directly with this layer.

### Responsibilities

✅ Render components

```jsx
<h1>Welcome</h1>
```

✅ Collect user input

```jsx
<input />
```

✅ Trigger actions

```jsx
<button onClick={handleLogin}>
  Login
</button>
```

✅ Show loading state

```jsx
loading ? "Loading..." : "Login";
```

✅ Display errors

```jsx
{
  error && <p>{error.message}</p>;
}
```

---

## What UI Should NOT Do

❌ Call APIs directly

```jsx
axios.post("/login");
```

❌ Store global application state

❌ Handle backend logic

❌ Parse authentication tokens

❌ Contain complex business rules

---

## Example

```jsx
const LoginPage = () => {
  const { login } = useAuth();

  const handleSubmit = () => {
    login(email, password);
  };

  return (
    <button onClick={handleSubmit}>
      Login
    </button>
  );
};
```

### Simple Analogy

The UI is like a **Waiter**.

* Takes customer orders
* Shows food to customers
* Displays updates

It never cooks food.

---

# 🧠 2. Hooks Layer (Orchestration Layer)

## Purpose

Hooks coordinate the application's workflow.

This layer acts as a bridge between:

* UI Layer
* State Layer
* API Layer

---

## What is Orchestration?

Orchestration means:

> Coordinating multiple parts of the application to complete a task.

Example Login Flow:

```text
User clicks Login
       │
       ▼
Hook receives request
       │
       ▼
Calls API
       │
       ▼
Receives response
       │
       ▼
Updates State
       │
       ▼
Returns result to UI
```

---

## Responsibilities

✅ Call API functions

```jsx
await loginApi();
```

✅ Handle loading state

```jsx
setLoading(true);
```

✅ Handle errors

```jsx
setError(error);
```

✅ Update application state

```jsx
setUser(user);
```

---

## Example

```jsx
export function useAuth() {
  const { setUser } =
    useContext(AuthContext);

  const login = async (
    email,
    password
  ) => {
    const response =
      await loginApi(
        email,
        password
      );

    setUser(response.user);
  };

  return { login };
}
```

---

## What Hooks Should NOT Do

❌ Render JSX

❌ Manipulate DOM directly

❌ Configure Axios instances

❌ Act as a storage layer

---

## Simple Analogy

Hooks are like a **Restaurant Manager**.

* Receives orders
* Talks to kitchen
* Updates order board
* Informs waiter

The manager coordinates everything.

---

# 🗄️ 3. State Layer (Memory Layer)

## Purpose

The State Layer stores application data.

Nothing more.

---

## What is State?

State is the application's memory.

Example:

```jsx
const [user, setUser] =
  useState(null);
```

React remembers this value.

---

## Responsibilities

✅ Store shared data

```jsx
user
```

✅ Store loading state

```jsx
loading
```

✅ Store errors

```jsx
error
```

✅ Store derived values

```jsx
isAuthenticated
```

---

## Example

```jsx
export const AuthContext =
  createContext();

export function AuthProvider({
  children,
}) {
  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        setUser,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
```

---

## Derived State

Derived state is calculated from existing state.

Example:

```jsx
const isAuthenticated =
  !!user;
```

If a user exists:

```jsx
true
```

Otherwise:

```jsx
false
```

---

## What State Should NOT Do

❌ Make API calls

❌ Navigate routes

❌ Show notifications

❌ Contain business logic

❌ Execute async operations

---

## Simple Analogy

State is like a **Whiteboard**.

It stores information.

It does not make decisions.

---

# 🌐 4. API Layer (Backend Communication Layer)

## Purpose

The API Layer communicates with the backend server.

This layer isolates frontend code from backend implementation details.

---

## Responsibilities

✅ Send HTTP requests

```jsx
axios.get();
```

✅ Send data

```jsx
axios.post();
```

✅ Receive responses

```jsx
response.data;
```

✅ Normalize errors

```jsx
throw error;
```

---

## Example

```jsx
export const loginApi = async (
  email,
  password
) => {
  const response =
    await axios.post(
      "/auth/login",
      {
        email,
        password,
      }
    );

  return response.data;
};
```

---

## What API Layer Should NOT Do

❌ Update React state

❌ Show toasts

❌ Navigate routes

❌ Use React hooks

❌ Render UI

---

## Simple Analogy

The API Layer is like a **Kitchen**.

* Receives orders
* Prepares food
* Sends food back

It does not interact with customers.

---

# 🚀 Complete Request Flow

### Login Example

```text
User Clicks Login
        │
        ▼
UI Layer
(Login Page)
        │
        ▼
Hooks Layer
(useAuth)
        │
        ▼
API Layer
(loginApi)
        │
        ▼
Backend Server
        │
        ▼
Response Returned
        │
        ▼
Hook Updates State
        │
        ▼
State Changes
        │
        ▼
UI Automatically Re-renders
```

---

# 📂 Recommended Folder Structure

```text
src/
│
├── features/
│
├── auth/
│   │
│   ├── pages/
│   │   └── Login.jsx
│   │
│   ├── components/
│   │   └── LoginForm.jsx
│   │
│   ├── hooks/
│   │   └── useAuth.js
│   │
│   ├── store/
│   │   └── auth.context.jsx
│   │
│   └── services/
│       └── auth.api.js
│
└── App.jsx
```

---

# 🔒 Layer Communication Rules

## Allowed

```text
UI → Hooks

Hooks → State

Hooks → API

API → Backend
```

---

## Not Allowed

```text
UI → API ❌

UI → State Mutation ❌

API → State ❌

State → API ❌

State → Navigation ❌
```

---

# ❌ Common Architecture Mistakes

### 1. UI Calling API Directly

```jsx
axios.post("/login");
```

---

### 2. API Updating State

```jsx
setUser(data);
```

---

### 3. State Making API Calls

```jsx
axios.get();
```

---

### 4. Business Logic Inside Components

```jsx
if (
  role === "admin" &&
  subscription === "premium"
) {
}
```

---

# 🎯 Benefits of This Architecture

### ✅ Easy to Scale

New features can be added without affecting existing code.

### ✅ Easy to Maintain

Each layer has one responsibility.

### ✅ Easy to Debug

Issues are easier to locate.

### ✅ Easy to Test

Every layer can be tested independently.

### ✅ Less Duplication

Business logic remains centralized.

### ✅ Better Team Collaboration

Developers know exactly where code belongs.

---

# 🏁 Conclusion

The 4-Layer React Architecture follows a simple rule:

```text
UI Displays
Hooks Coordinate
State Stores
API Communicates
```

By keeping each layer focused on a single responsibility, React applications become:

* Scalable
* Maintainable
* Testable
* Production Ready

This architecture is widely used in modern React applications because it keeps code clean, predictable, and easy to manage as projects grow.
