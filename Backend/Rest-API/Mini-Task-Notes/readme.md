# 🌐 Understanding APIs & REST APIs

> A complete beginner-to-advanced guide covering APIs, REST APIs, HTTP, HTTPS, HTTP Methods, Status Codes, and API Design Principles.

---

# 📚 Table of Contents

1. What is an API?
2. Why Do We Need APIs?
3. Real-World Example of an API
4. Client, Server, and API Relationship
5. How APIs Work
6. What is a REST API?
7. REST Architecture Principles
8. Understanding HTTP & HTTPS
9. HTTP Request Structure
10. HTTP Response Structure
11. HTTP Methods
    - GET
    - POST
    - PUT
    - PATCH
    - DELETE
12. PUT vs PATCH
13. Idempotent Methods
14. Safe Methods
15. HTTP Status Codes
16. Most Important Status Codes
17. API Request & Response Examples
18. REST API Best Practices
19. Common Interview Questions
20. Conclusion

---

# 🚀 What is an API?

API stands for:

**Application Programming Interface**

An API acts as a **messenger** between two software applications.

It allows different applications to communicate with each other without knowing how the other application is internally built.

### Simple Definition

An API is a set of rules that allows one application to request data or services from another application.

---

# 🎯 Why Do We Need APIs?

Without APIs:

- Applications cannot communicate
- Frontend cannot access backend data
- Mobile apps cannot interact with servers
- Payment gateways cannot process payments
- Weather applications cannot fetch weather data

APIs make software integration possible.

---

# 🌍 Real World Example

Imagine ordering food from a restaurant.

### You = Client

You place an order.

### Waiter = API

The waiter takes your request to the kitchen.

### Kitchen = Server

The kitchen prepares your food.

### Response

The waiter brings the food back to you.

```
Client → API → Server
Client ← API ← Server
```

The waiter does not cook the food.

The waiter simply transfers requests and responses.

The API works exactly the same way.

---

# 🖥️ Client, Server and API Relationship

## Client

A client is anything that sends a request.

Examples:

- Browser
- Mobile App
- React Application
- Postman

Examples:

```bash
Google Chrome
React App
Android App
Postman
```

---

## Server

A server stores data and handles requests.

Examples:

```bash
Node.js Server
Express Server
Django Server
Spring Boot Server
```

The server:

- Processes requests
- Performs business logic
- Accesses databases
- Returns responses

---

## API

The API is the communication layer between client and server.

```text
Frontend (Client)
        │
        ▼
       API
        │
        ▼
Backend (Server)
        │
        ▼
    Database
```

---

# ⚙️ How APIs Work

Suppose a user logs into an application.

### Step 1

User clicks Login.

### Step 2

Frontend sends a request.

```http
POST /login
```

### Step 3

API receives request.

### Step 4

Server validates credentials.

### Step 5

Database verifies user.

### Step 6

Server sends response.

```json
{
  "message": "Login Successful"
}
```

### Step 7

Frontend displays success message.

---

# 🌐 What is a REST API?

REST stands for:

**Representational State Transfer**

REST is an architectural style used to design web APIs. RESTful APIs use HTTP methods and URLs to access resources. :contentReference[oaicite:1]{index=1}

---

# 📦 What is a Resource?

In REST APIs, everything is considered a resource.

Examples:

```bash
/users
/products
/orders
/posts
/comments
```

Each resource has its own unique URL.

Example:

```bash
/users/1
```

Represents user with ID 1.

---

# 🏗️ REST Principles

## 1. Client-Server Architecture

Frontend and backend remain separate.

---

## 2. Stateless Communication

Every request contains all required information.

Server does not remember previous requests. :contentReference[oaicite:2]{index=2}

Example:

```http
GET /users
Authorization: Bearer Token
```

The server checks the token every time.

---

## 3. Resource-Based URLs

Good:

```bash
/users
/products
/orders
```

Bad:

```bash
/getUsers
/createProduct
```

---

## 4. Standard HTTP Methods

REST APIs use:

```bash
GET
POST
PUT
PATCH
DELETE
```

---

# 🌍 What is HTTP?

HTTP stands for:

**HyperText Transfer Protocol**

It is a communication protocol used between client and server.

Example:

```bash
http://example.com
```

HTTP transfers:

- JSON
- HTML
- Images
- Videos
- Files

---

# 🔒 What is HTTPS?

HTTPS stands for:

**HyperText Transfer Protocol Secure**

HTTPS is the secure version of HTTP.

Example:

```bash
https://example.com
```

HTTPS uses:

```bash
SSL
TLS
```

to encrypt data.

---

# HTTP vs HTTPS

| Feature | HTTP | HTTPS |
|----------|----------|----------|
| Security | ❌ No | ✅ Yes |
| Encryption | ❌ No | ✅ Yes |
| Port | 80 | 443 |
| Safe For Login | ❌ No | ✅ Yes |
| Safe For Payments | ❌ No | ✅ Yes |

---

# 📨 HTTP Request Structure

```http
POST /users HTTP/1.1

Host: example.com

Content-Type: application/json

{
  "name": "Divyanshu"
}
```

---

# 📩 HTTP Response Structure

```http
HTTP/1.1 201 Created

Content-Type: application/json

{
  "message": "User Created"
}
```

---

# 🔥 HTTP Methods

---

# 1️⃣ GET

Used to retrieve data.

```http
GET /users
```

Example:

```bash
Fetch all users
```

Response:

```json
[
  {
    "id": 1,
    "name": "Divyanshu"
  }
]
```

---

# 2️⃣ POST

Used to create new data.

```http
POST /users
```

Request Body:

```json
{
  "name": "Divyanshu"
}
```

---

# 3️⃣ PUT

Used to completely replace existing data. :contentReference[oaicite:3]{index=3}

```http
PUT /users/1
```

Example:

```json
{
  "name": "Divyanshu",
  "age": 25,
  "city": "Rishikesh"
}
```

Entire resource gets replaced.

---

# 4️⃣ PATCH

Used to partially update data. :contentReference[oaicite:4]{index=4}

```http
PATCH /users/1
```

Example:

```json
{
  "city": "Delhi"
}
```

Only city is updated.

---

# 5️⃣ DELETE

Used to remove data.

```http
DELETE /users/1
```

Deletes the user permanently.

---

# PUT vs PATCH

## PUT

Replaces entire object.

```json
{
  "name": "Divyanshu",
  "age": 25
}
```

---

## PATCH

Updates only specified fields.

```json
{
  "age": 26
}
```

---

# 🔄 Idempotent Methods

An idempotent method produces the same result even if executed multiple times with the same request. :contentReference[oaicite:5]{index=5}

### Idempotent Methods

```bash
GET
PUT
PATCH
DELETE
```

### Non-Idempotent

```bash
POST
```

---

# 🛡️ Safe Methods

Safe methods do not modify server data. :contentReference[oaicite:6]{index=6}

```bash
GET
HEAD
OPTIONS
```

---

# 🚦 HTTP Status Codes

HTTP Status Codes tell the client what happened after a request.

---

# Status Code Categories

| Range | Meaning |
|---------|---------|
| 1xx | Informational |
| 2xx | Success |
| 3xx | Redirection |
| 4xx | Client Error |
| 5xx | Server Error |

---

# ⭐ Most Important Status Codes

## Success Responses

### 200 OK

Request successful.

```http
GET /users
```

---

### 201 Created

Resource created successfully.

```http
POST /users
```

---

### 204 No Content

Success but no response body.

```http
DELETE /users/1
```

---

# Redirection Responses

### 301 Moved Permanently

Resource moved permanently.

---

### 302 Found

Temporary redirect.

---

### 304 Not Modified

Resource hasn't changed.

---

# Client Error Responses

### 400 Bad Request

Invalid request data.

```json
{
  "error": "Invalid Email"
}
```

---

### 401 Unauthorized

Authentication required.

---

### 403 Forbidden

Permission denied.

---

### 404 Not Found

Resource doesn't exist.

---

### 405 Method Not Allowed

Wrong HTTP method used.

---

### 409 Conflict

Resource conflict exists.

---

### 422 Unprocessable Entity

Validation failed.

---

# Server Error Responses

### 500 Internal Server Error

Unexpected server failure.

---

### 501 Not Implemented

Feature not supported.

---

### 503 Service Unavailable

Server is down or overloaded.

---

# 📝 API Example

Request:

```http
GET /users/1
```

Response:

```json
{
  "id": 1,
  "name": "Divyanshu",
  "email": "divyanshu@gmail.com"
}
```

---

# 🎯 REST API Best Practices

### Use Nouns

✅ Good

```bash
/users
/products
/orders
```

❌ Bad

```bash
/getUsers
/createUser
```

---

### Use Plural Resources

```bash
/users
/products
/posts
```

---

### Use Proper HTTP Methods

```bash
GET    → Read
POST   → Create
PUT    → Replace
PATCH  → Update
DELETE → Remove
```

---

### Use Meaningful Status Codes

Return proper status codes with meaningful messages.

---

### Keep APIs Consistent

Follow the same naming conventions everywhere.

---

### Design Stateless APIs

Each request should contain everything required for processing. :contentReference[oaicite:8]{index=8}

---

# 🎤 Common Interview Questions

### What is an API?

A mechanism that allows applications to communicate with each other.

---

### What is REST?

An architectural style for building web services using HTTP.

---

### Difference Between HTTP and HTTPS?

HTTPS encrypts communication using SSL/TLS.

---

### Difference Between PUT and PATCH?

PUT replaces the entire resource.

PATCH updates only specific fields.

---

### Why Use Status Codes?

They help clients understand the result of a request.

---

### What is Stateless Communication?

The server does not remember previous requests.

Every request is independent.

---

# 🎯 Conclusion

Understanding APIs is one of the most important skills in modern web development.

Master these concepts:

✅ API Basics  
✅ Client-Server Architecture  
✅ REST APIs  
✅ HTTP & HTTPS  
✅ GET, POST, PUT, PATCH, DELETE  
✅ Status Codes  
✅ REST Best Practices  

Once these concepts are clear, learning Express.js, Node.js, Authentication, Databases, and Full Stack Development becomes significantly easier.

---

### 👨‍💻 Author

**Divyanshu Chauhan**

MCA Student | React Developer | Future Full Stack Developer
