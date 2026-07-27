# 🚀 Backend Concepts Handbook

> **Note:** This handbook is designed for beginners while also covering
> production-level concepts in simple language.

# Table of Contents

1.  Token Blacklisting
2.  Database Throughput
3.  Why Redis is Not Used as a Primary Database
4.  MongoDB BSON vs Redis Key-Value Model

------------------------------------------------------------------------

# 1. Token Blacklisting

## What is a JWT?

A JSON Web Token (JWT) is a self-contained token that stores user
information and is digitally signed by the server.

Example:

``` text
Header.Payload.Signature
```

After login:

1.  User enters email and password.
2.  Server verifies credentials.
3.  Server generates a JWT.
4.  Client stores the JWT (cookie or local storage).
5.  Every protected request includes the token.

### Why JWT is Stateless

The server does **not** store the token.

Instead:

-   The client stores it.
-   The server only verifies its signature.

This makes JWT fast and scalable.

------------------------------------------------------------------------

## The Logout Problem

If a JWT expires after 7 days and the user logs out today, the token is
**still valid** until it expires.

That means someone with the stolen token can continue using it.

This is why **Token Blacklisting** exists.

------------------------------------------------------------------------

## Token Blacklisting

Token blacklisting means storing invalid tokens so the server rejects
them even if they haven't expired.

Flow:

``` mermaid
flowchart TD
A[Login] --> B[JWT Issued]
B --> C[Protected API]
C --> D{Logout?}
D -- No --> C
D -- Yes --> E[Store Token in Blacklist]
E --> F[Future Request]
F --> G{Blacklisted?}
G -- Yes --> H[401 Unauthorized]
G -- No --> I[Allow Request]
```

------------------------------------------------------------------------

## MongoDB Approach

### Blacklist Schema

``` js
import mongoose from "mongoose";

const blacklistSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true
  },
  expiresAt: {
    type: Date,
    required: true
  }
});

export default mongoose.model("Blacklist", blacklistSchema);
```

### Logout

-   Read JWT.
-   Save it in MongoDB.
-   Save its expiry time.

Every protected route:

1.  Read JWT.
2.  Search blacklist collection.
3.  If found → Reject.
4.  Otherwise verify JWT.

### Pros

-   Persistent
-   Easy to debug
-   Works without Redis

### Cons

-   Database query on every request
-   Slower than memory

------------------------------------------------------------------------

## Redis Approach

Redis stores data in RAM.

Logout:

``` text
SET blacklist:<token> true EX 3600
```

The TTL automatically deletes the token after expiry.

Authentication:

1.  Read JWT.
2.  Check Redis.
3.  If exists → Reject.
4.  Else verify JWT.

### Advantages

-   Extremely fast
-   Automatic expiry
-   Ideal for millions of requests

### Why Companies Prefer Redis

-   O(1) lookups
-   Memory-based
-   Automatic cleanup
-   Reduces database load

------------------------------------------------------------------------

## MongoDB vs Redis

  Feature       MongoDB             Redis
  ------------- ------------------- -------------------
  Storage       Disk                RAM
  Speed         Fast                Extremely Fast
  Persistence   Yes                 Optional
  TTL           Yes                 Native
  Best For      Long-term storage   Cache & blacklist

------------------------------------------------------------------------

# 2. Database Throughput

## What is Throughput?

Throughput is the amount of work a database performs in a given amount
of time.

Examples:

-   Requests per Second (RPS)
-   Transactions per Second (TPS)
-   Reads/sec
-   Writes/sec

Formula

``` text
Throughput = Completed Operations / Time
```

Example:

1000 queries in 10 seconds

``` text
100 TPS
```

------------------------------------------------------------------------

## Read Throughput

Number of successful read operations per second.

Examples:

-   Login
-   Get Profile
-   Fetch Products

------------------------------------------------------------------------

## Write Throughput

Number of successful write operations.

Examples:

-   Registration
-   Orders
-   Payments

------------------------------------------------------------------------

## Factors Affecting Throughput

-   CPU
-   RAM
-   Indexes
-   Network
-   Query Optimization
-   Database Engine
-   Storage Device

------------------------------------------------------------------------

## MongoDB Throughput

MongoDB writes data to disk.

Advantages:

-   Durable
-   Reliable

Disadvantage:

-   Slower than RAM

------------------------------------------------------------------------

## Redis Throughput

Redis stores everything in memory.

Advantages:

-   Millions of operations per second
-   Very low latency

------------------------------------------------------------------------

## Real-world Analogy

Imagine:

MongoDB = Library

Redis = Whiteboard

Looking at a whiteboard is much faster than searching through books.

------------------------------------------------------------------------

# 3. Why Redis is NOT Used as Primary Database

Many beginners ask:

"If Redis is faster, why don't we store everything in Redis?"

## Reason 1: Memory

Redis stores data in RAM.

RAM is expensive.

Example:

-   1 TB SSD → Affordable
-   1 TB RAM → Extremely expensive

------------------------------------------------------------------------

## Reason 2: Data Loss

If persistence is disabled and the server crashes,

Redis loses everything in memory.

MongoDB stores data permanently on disk.

------------------------------------------------------------------------

## Reason 3: Relationships

MongoDB supports rich document structures and indexing.

Redis focuses on speed, not complex querying.

------------------------------------------------------------------------

## Reason 4: Cost

Keeping terabytes of RAM is much more expensive than SSD storage.

------------------------------------------------------------------------

## Production Architecture

``` mermaid
flowchart LR
Client --> API
API --> Redis
Redis -->|Cache Miss| MongoDB
MongoDB --> Redis
Redis --> Client
```

Redis acts as a cache.

MongoDB remains the source of truth.

------------------------------------------------------------------------

## Best Practice

Never replace MongoDB with Redis.

Use:

-   MongoDB → Permanent Data
-   Redis → Cache
-   Redis → Sessions
-   Redis → OTP
-   Redis → Token Blacklist

------------------------------------------------------------------------

# 4. MongoDB BSON vs Redis Key-Value

## What is BSON?

MongoDB stores data in BSON.

BSON = Binary JSON

Example JSON

``` json
{
  "name":"Divyanshu",
  "age":25
}
```

Internally MongoDB stores it in binary format.

Advantages:

-   Faster parsing
-   More data types
-   Better indexing

Supported Types:

-   String
-   Number
-   Boolean
-   Date
-   ObjectId
-   Binary
-   Decimal128
-   Array
-   Object

------------------------------------------------------------------------

## Redis Storage

Redis stores data as key-value pairs.

Example:

``` text
user:101

↓

{
 name:"Divyanshu",
 age:25
}
```

Common Data Structures:

-   String
-   Hash
-   List
-   Set
-   Sorted Set
-   Stream
-   Bitmap
-   HyperLogLog

------------------------------------------------------------------------

## BSON vs Key-Value

  Feature    MongoDB            Redis
  ---------- ------------------ ----------------
  Format     BSON               Key-Value
  Queries    Rich               Limited
  Storage    Disk               RAM
  Speed      Fast               Extremely Fast
  Best Use   Primary Database   Cache

------------------------------------------------------------------------

# Production Recommendation

A modern backend typically follows this architecture:

``` mermaid
flowchart TD
Client --> Express
Express --> Redis
Redis -->|Cache Miss| MongoDB
MongoDB --> Redis
Redis --> Express
Express --> Client
```

MongoDB stores permanent data.

Redis accelerates frequently accessed data.

------------------------------------------------------------------------

# Interview Questions

## Token Blacklisting

-   Why is JWT logout difficult?
-   Why do we blacklist tokens?
-   Why is Redis preferred over MongoDB?

## Throughput

-   What is TPS?
-   Difference between latency and throughput?
-   How can throughput be increased?

## Redis

-   Why isn't Redis a primary database?
-   What is TTL?
-   Explain Redis persistence.

## MongoDB

-   What is BSON?
-   Difference between JSON and BSON?
-   Why does MongoDB use BSON?

------------------------------------------------------------------------

# Key Takeaways

-   JWT is stateless.
-   Token blacklisting prevents reuse of logged-out tokens.
-   MongoDB can blacklist tokens but Redis is much faster.
-   Throughput measures how much work a database completes over time.
-   Redis is an in-memory data store, not a replacement for a primary
    database.
-   MongoDB stores BSON documents; Redis stores key-value data.
-   Production systems commonly use **MongoDB + Redis** together for the
    best balance of durability and performance.
