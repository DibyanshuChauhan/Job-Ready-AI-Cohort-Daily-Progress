# 🔐 Authentication, Authorization, Validation & Verification

<p align="center">

<img src="https://img.shields.io/badge/Backend-Security-blue?style=for-the-badge" />
<img src="https://img.shields.io/badge/JWT-Authentication-green?style=for-the-badge" />
<img src="https://img.shields.io/badge/Express-Validation-orange?style=for-the-badge" />
<img src="https://img.shields.io/badge/MongoDB-Mongoose-success?style=for-the-badge" />

</p>

---

# 📖 Table of Contents

* [Introduction](#introduction)

* [Authentication](#authentication)

  * [What is Authentication?](#what-is-authentication)
  * [Why Authentication is Needed?](#why-authentication-is-needed)
  * [Authentication Flow](#authentication-flow)
  * [Password Hashing](#password-hashing)

* [What is a Token?](#what-is-a-token)

  * [Why Tokens are Used](#why-tokens-are-used)
  * [JWT (JSON Web Token)](#jwt-json-web-token)
  * [JWT Structure](#jwt-structure)
  * [JWT Authentication Flow](#jwt-authentication-flow)

* [Authorization](#authorization)

  * [What is Authorization?](#what-is-authorization)
  * [Why Authorization is Needed?](#why-authorization-is-needed)
  * [Authorization Flow](#authorization-flow)

* [Authentication vs Authorization](#authentication-vs-authorization)

* [Validation](#validation)

  * [What is Validation?](#what-is-validation)
  * [Types of Validation](#types-of-validation)
  * [Frontend Validation](#frontend-validation)
  * [Backend Validation](#backend-validation)
  * [Database Validation](#database-validation)
  * [Express Validator](#express-validator)

* [Verification](#verification)

  * [What is Verification?](#what-is-verification)
  * [Email Verification Flow](#email-verification-flow)
  * [OTP Verification](#otp-verification)
  * [Phone Verification](#phone-verification)

* [Complete Authentication System Flow](#complete-authentication-system-flow)

* [Real World Example (Instagram)](#real-world-example-instagram)

* [Quick Revision Table](#quick-revision-table)

* [Best Practices](#best-practices)

* [Conclusion](#conclusion)

---

## Quick Navigation

<p align="center">

<a href="#authentication">🔐 Authentication</a> • <a href="#what-is-a-token">🎫 JWT & Tokens</a> • <a href="#authorization">🛡 Authorization</a> • <a href="#validation">✅ Validation</a> • <a href="#verification">📧 Verification</a>

</p>

---

# Introduction

Whenever we build applications such as:

* Instagram
* Facebook
* LinkedIn
* Amazon
* Netflix
* Banking Applications
* E-Commerce Platforms

we must solve some important security problems:

### Question 1

Who is the user?

➡ Authentication

### Question 2

What actions can the user perform?

➡ Authorization

### Question 3

Is the entered information valid?

➡ Validation

### Question 4

Has the user confirmed their identity?

➡ Verification

These concepts work together to create secure applications.

---

# Authentication

## What is Authentication?

Authentication is the process of verifying the identity of a user.

In simple words:

> Authentication answers the question:
>
> **"Who are you?"**

Before allowing access to an application, the server must verify that the user is actually who they claim to be.

---

## Why Authentication is Needed?

Without authentication:

* Anyone can access private data
* Anyone can modify user information
* Anyone can pretend to be another user

Authentication protects applications from unauthorized access.

---

## Real-Life Example

Imagine entering your college.

The security guard asks for your ID card.

You show your ID card.

The guard checks it and confirms your identity.

Only after verification are you allowed to enter.

This is Authentication.

---

## Examples of Authentication

### Email & Password

```text
Email: divyanshu@gmail.com
Password: ********
```

### OTP Login

```text
Enter OTP: 456789
```

### Google Login

```text
Continue with Google
```

### GitHub Login

```text
Continue with GitHub
```

---

## Authentication Flow

```mermaid
flowchart LR

A[User Login]
--> B[Server Receives Credentials]
--> C[Verify Credentials]
--> D[Generate Token]
--> E[User Logged In]
```

---

# Password Hashing

Passwords should never be stored directly in a database.

❌ Bad Practice

```text
123456
admin123
password
```

✅ Good Practice

```text
$2b$10$Fv2Rj3...
```

Hashing converts passwords into unreadable strings.

Common Library:

```bash
npm install bcrypt
```

Benefits:

* Protects user passwords
* Reduces risk during database leaks
* Industry standard security practice

---

# What is a Token?

After successful authentication, the server creates a token.

A token is a digital proof that the user has already logged in.

---

## Real-Life Example

Imagine attending a concert.

1. You show your ticket.
2. Security verifies it.
3. You receive a wristband.

Now you don't need to show your ticket repeatedly.

The wristband acts like a token.

---

## Why Tokens are Used

Without tokens:

* Users would need to log in repeatedly.
* Servers would struggle to identify logged-in users.

Tokens allow applications to recognize authenticated users.

---

# JWT (JSON Web Token)

JWT stands for:

**JSON Web Token**

A JWT is commonly used in modern web applications for authentication and authorization.

---

## JWT Structure

```text
xxxxx.yyyyy.zzzzz
```

A JWT contains three parts.

### Header

```json
{
  "alg":"HS256",
  "typ":"JWT"
}
```

---

### Payload

```json
{
  "id":"123",
  "role":"admin"
}
```

---

### Signature

Used to verify that the token was not modified.

---

## JWT Authentication Flow

```mermaid
sequenceDiagram

participant User
participant Server

User->>Server: Login Request
Server->>Server: Verify Credentials
Server->>User: JWT Token
User->>Server: Protected Route Request
Server->>Server: Verify JWT
Server->>User: Response
```

---

# Authorization

## What is Authorization?

Authorization determines what actions a user can perform.

In simple words:

> Authorization answers:
>
> **"What are you allowed to do?"**

---

## Why Authorization is Needed?

Different users have different permissions.

Examples:

* User
* Moderator
* Admin

Not everyone should have access to every feature.

---

## Real-Life Example

You entered the office building.

Authentication already happened.

Now:

* Employee → Office Area
* Manager → Management Floor
* Admin → Server Room

Everyone entered successfully.

But permissions are different.

That is Authorization.

---

## Example

### User

```json
{
 "role":"user"
}
```

Allowed:

✅ View Profile

✅ Edit Profile

Not Allowed:

❌ Delete Users

❌ Manage System

---

### Admin

```json
{
 "role":"admin"
}
```

Allowed:

✅ Delete Users

✅ Create Users

✅ Manage System

---

## Authorization Flow

```mermaid
flowchart TD

A[Request]
--> B[Verify JWT]
--> C[Check Role]

C --> D[Allow Access]
C --> E[Access Denied]
```

---

# Authentication vs Authorization

| Authentication    | Authorization                |
| ----------------- | ---------------------------- |
| Who are you?      | What can you do?             |
| Verifies identity | Verifies permissions         |
| Login Process     | Permission Process           |
| Happens First     | Happens After Authentication |

---

# Validation

## What is Validation?

Validation checks whether the entered data is correct.

In simple words:

> Validation answers:
>
> **"Is the provided information correct?"**

---

## Why Validation is Important?

Without validation:

```text
Email: abc
Password: 1
Age: -50
```

Invalid data could be stored inside the database.

---

# Types of Validation

## Frontend Validation

Performed before data reaches the server.

Example:

```javascript
if(password.length < 6){
   alert("Password too short");
}
```

Benefits:

* Better user experience
* Faster feedback

---

## Backend Validation

Performed on the server.

Example:

```javascript
if(!email || !password){
 return res.status(400).json({
   message:"All fields required"
 });
}
```

Benefits:

* Prevents malicious requests
* Ensures security

---

## Database Validation

Performed by Mongoose.

```javascript
email:{
 type:String,
 required:true,
 unique:true,
 match:/^[^\s@]+@[^\s@]+\.[^\s@]+$/
}
```

Benefits:

* Final layer of protection
* Prevents invalid records

---

## Validation Flow

```mermaid
flowchart LR

A[User Input]
--> B[Frontend Validation]
--> C[Backend Validation]
--> D[Database Validation]
--> E[Store Data]
```

---

# Express Validator

Install:

```bash
npm install express-validator
```

Example:

```javascript
const { body, validationResult } = require("express-validator");

app.post(
"/register",

body("email").isEmail(),

body("password").isLength({min:6}),

(req,res)=>{

 const errors = validationResult(req);

 if(!errors.isEmpty()){
   return res.status(400).json({
      errors: errors.array()
   });
 }

 res.send("Valid Data");

});
```

---

# Verification

## What is Verification?

Verification confirms that provided information is real and trusted.

In simple words:

> Verification answers:
>
> **"Can you prove this information is genuine?"**

---

## Why Verification is Needed?

Authentication proves identity.

Verification proves authenticity.

Examples:

* Email Verification
* Phone Verification
* OTP Verification
* Two Factor Authentication

---

# Email Verification Flow

```mermaid
flowchart TD

A[Register User]
--> B[Send Verification Email]
--> C[User Clicks Link]
--> D[Account Verified]
```

---

## OTP Verification

Example:

```text
OTP: 456789
```

The user must enter the correct OTP sent by the server.

---

## Phone Verification

Example:

```text
Mobile Number Verification
```

The server sends an SMS OTP.

The user enters the OTP.

Phone number becomes verified.

---

# Complete Authentication System Flow

```mermaid
flowchart TD

A[Register]
--> B[Validation]

B --> C[Create Account]

C --> D[Email Verification]

D --> E[Verified Account]

E --> F[Login]

F --> G[Authentication]

G --> H[Generate JWT]

H --> I[Authorization]

I --> J[Access Protected Routes]
```

---

# Real World Example (Instagram)

### Registration

User enters:

```text
Email
Username
Password
```

Validation checks:

✅ Email Format

✅ Password Length

---

### Verification

Instagram sends an email verification link.

---

### Authentication

User logs in using credentials.

---

### Token

Instagram generates a JWT.

---

### Authorization

User:

✅ Upload Posts

✅ Like Posts

❌ Delete Other Users

Admin:

✅ Moderate Content

✅ Delete Accounts

---

# Quick Revision Table

| Concept        | Main Question                 |
| -------------- | ----------------------------- |
| Authentication | Who are you?                  |
| Token          | Proof that you are logged in  |
| Authorization  | What can you do?              |
| Validation     | Is the data correct?          |
| Verification   | Is the information confirmed? |

---

# Best Practices

## Authentication

✅ Hash passwords using bcrypt

✅ Use JWT

✅ Use HTTPS

---

## Authorization

✅ Implement role-based access

✅ Protect admin routes

---

## Validation

✅ Validate on frontend

✅ Validate on backend

✅ Validate in database

---

## Verification

✅ Email verification

✅ OTP verification

✅ Two-factor authentication

---

# Conclusion

Authentication, Authorization, Validation, Verification, and Tokens are the core building blocks of modern secure applications.

Think of them like this:

| Concept        | Easy Meaning                |
| -------------- | --------------------------- |
| Authentication | Who are you?                |
| Token          | Your digital identity card  |
| Authorization  | What are you allowed to do? |
| Validation     | Is the data correct?        |
| Verification   | Is the information genuine? |

Mastering these concepts is one of the first and most important steps toward becoming a strong Backend Developer and Full-Stack Engineer.


# 🔐 Authentication Fundamentals (Hashing, Cookies & JWT)

A beginner-friendly guide to understanding the core concepts used in modern authentication systems.

---

# 📚 Table of Contents

* [What is Hashing?](#1️⃣-what-is-hashing)
* [Why Do We Hash Passwords?](#2️⃣-why-do-we-hash-passwords)
* [Hashing Example](#3️⃣-hashing-example)
* [What are Cookies?](#4️⃣-what-are-cookies)
* [Why Are Cookies Used?](#5️⃣-why-are-cookies-used)
* [Cookie Security Flags](#6️⃣-cookie-security-flags)
* [Cookie Flow Diagram](#cookie-flow-diagram)
* [What is JWT?](#7️⃣-what-is-jwt)
* [JWT Structure](#8️⃣-jwt-structure)
* [JWT Authentication Flow](#9️⃣-jwt-authentication-flow)
* [JWT Verification](#-jwt-verification)
* [Quick Interview Questions](#-quick-interview-questions)
* [Summary](#-summary)

---

# 1️⃣ What is Hashing?

Hashing is a process that converts data (such as a password) into a fixed-length string.

## 🔄 Hashing Flow

```mermaid
flowchart LR
    A[Password] --> B[Hash Function]
    B --> C[Hashed Value]
```

### Key Points

* One-way process
* Cannot be reversed
* Same input → same output
* Used for password security

---

# 2️⃣ Why Do We Hash Passwords?

## 🚨 Without Hashing

```text
Username: divyanshu
Password: 123456
```

## ✅ With Hashing

```text
Username: divyanshu
Password: e10adc3949ba59abbe56e057f20f883e
```

## Benefits

* Better security
* Passwords are not stored in plain text
* Protects users during database breaches

---

# 3️⃣ Hashing Example

```javascript
const crypto = require("crypto");

const password = "123456";

const hashedPassword = crypto
  .createHash("md5")
  .update(password)
  .digest("hex");

console.log(hashedPassword);
```

---

# 4️⃣ What are Cookies?

Cookies are small pieces of data stored in the browser.

The browser automatically sends them with future requests.

---

# 5️⃣ Why Are Cookies Used?

* Keep users logged in
* Store authentication tokens
* Remember user preferences
* Maintain sessions

---

# 6️⃣ Cookie Security Flags

| Flag     | Purpose                    |
| -------- | -------------------------- |
| httpOnly | Prevents JavaScript access |
| secure   | Only sent over HTTPS       |
| sameSite | Prevents CSRF attacks      |

---

# Cookie Flow Diagram

```mermaid
flowchart TD
    A[User Login] --> B[Server Creates Cookie]
    B --> C[Browser Stores Cookie]
    C --> D[Browser Sends Cookie Automatically]
    D --> E[Server Identifies User]
```

---

# 7️⃣ What is JWT?

JWT stands for:

**JSON Web Token**

A JWT is a secure token used to verify a user's identity.

---

## Why JWT?

* Stateless authentication
* Easy to scale
* No server session storage
* Fast verification

---

# 8️⃣ JWT Structure

```text
HEADER.PAYLOAD.SIGNATURE
```

## JWT Anatomy

```mermaid
flowchart LR
    A[Header] --> B[Payload]
    B --> C[Signature]
```

### Header

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

### Payload

```json
{
  "id": "123",
  "email": "user@gmail.com"
}
```

### Signature

Used to verify token integrity.

---

# 9️⃣ JWT Authentication Flow

```mermaid
sequenceDiagram
    participant User
    participant Client
    participant Server
    participant Database

    User->>Client: Login Credentials
    Client->>Server: Login Request
    Server->>Database: Verify User
    Database-->>Server: User Found
    Server-->>Client: JWT Token
    Client->>Server: Protected Request + JWT
    Server-->>Client: Access Granted
```

---

# 🔟 JWT Verification

```javascript
jwt.verify(token, process.env.JWT_SECRET);
```

### What Happens?

* Validates token
* Verifies signature
* Decodes user data
* Rejects tampered tokens

---

# 🎯 Quick Interview Questions

### Q1. What is Hashing?

Hashing converts data into a fixed-length value that cannot be reversed.

### Q2. Why Hash Passwords?

To avoid storing passwords in plain text.

### Q3. What is a Cookie?

A small piece of browser-stored data.

### Q4. What is JWT?

A token-based authentication mechanism.

### Q5. What are the three parts of JWT?

```text
Header
Payload
Signature
```

### Q6. Why is JWT Stateless?

Because the server does not store session data.

---

# 📝 Summary

## Hashing

* Password security
* One-way process
* Non-reversible

## Cookies

* Stored in browser
* Maintain login state
* Automatically sent with requests

## JWT

* Authentication mechanism
* Contains Header, Payload, Signature
* Easy to scale

---

# 🚀 Complete Authentication Flow

```mermaid
flowchart TD
    A[User Login] --> B[Server Receives Credentials]
    B --> C[Verify Password]
    C --> D[Generate JWT]
    D --> E[Store JWT in Cookie]
    E --> F[User Makes Request]
    F --> G[JWT Sent Automatically]
    G --> H[Server Verifies JWT]
    H --> I[Protected Route Access Granted]
```

Understanding Hashing, Cookies, and JWT is essential for building secure authentication systems.
