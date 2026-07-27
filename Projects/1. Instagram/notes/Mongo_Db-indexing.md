# MongoDB Indexing

## 📖 Overview

Indexing is one of the most important performance optimization techniques in MongoDB.

An index allows MongoDB to locate data quickly without scanning every document in a collection.

Without indexes, MongoDB performs a **Collection Scan (COLLSCAN)** and checks every document one by one.

With indexes, MongoDB performs an **Index Scan (IXSCAN)** and directly jumps to the required data.

---

# 🎯 What is Indexing?

An index is a special data structure that stores field values in a sorted format along with references to the corresponding documents.

Think of it like a book index.

### Without an Index

To find a topic in a book:

* Start from page 1
* Read page by page
* Continue until the topic is found

### With an Index

* Open the index section
* Find the topic
* Jump directly to the required page

MongoDB works in a similar way.

---

# ❓ Why is Indexing Necessary?

Imagine a collection containing:

```text
10 Million Users
```

Query:

```js
db.users.find({
  email: "john@example.com"
})
```

Without an index, MongoDB checks:

```text
Document 1
Document 2
Document 3
...
Document 10,000,000
```

This process is called:

```text
COLLSCAN (Collection Scan)
```

### Time Complexity

```text
O(n)
```

As data grows, queries become slower.

---

# 🚀 How MongoDB Implements Indexing

MongoDB uses a data structure called a:

```text
B+ Tree
```

for storing indexes.

---

# 🌳 What is a B+ Tree?

A B+ Tree is a self-balancing tree structure optimized for databases.

It is designed for:

* Fast searches
* Efficient disk access
* Range queries
* Large datasets

---

## Key Features of B+ Tree

| Feature               | Benefit                            |
| --------------------- | ---------------------------------- |
| Balanced Structure    | Consistent search performance      |
| Ordered Keys          | Supports sorting and range queries |
| Linked Leaf Nodes     | Fast sequential traversal          |
| High Branching Factor | Smaller tree height                |

---

# 🔍 How Search Works Internally

Suppose we create an index:

```js
db.users.createIndex({
  email: 1
})
```

MongoDB stores email values in a B+ Tree.

When searching:

```js
db.users.find({
  email: "john@example.com"
})
```

MongoDB:

1. Starts at the root node
2. Compares the value
3. Moves to the correct branch
4. Reaches the leaf node
5. Retrieves the document pointer

Instead of scanning millions of documents, only a few comparisons are needed.

---

# 📊 Time Complexity Comparison

| Operation       | Complexity |
| --------------- | ---------- |
| Collection Scan | O(n)       |
| Indexed Search  | O(log n)   |

### Example

For 10 million records:

```text
Without Index → 10,000,000 checks
With Index → 3–4 tree traversals
```

Massive performance improvement.

---

# 🛠 Creating Indexes

## Single Field Index

```js
db.users.createIndex({
  email: 1
})
```

### Meaning

```js
1
```

Ascending order

```js
-1
```

Descending order

---

# 🛠 Compound Index

Used when queries involve multiple fields.

```js
db.users.createIndex({
  username: 1,
  age: -1
})
```

### Important Rule

Order matters.

MongoDB uses indexes from left to right.

---

## Example

Index:

```js
{
  username: 1,
  age: -1
}
```

Efficient:

```js
db.users.find({
  username: "Ankur"
})
```

Efficient:

```js
db.users.find({
  username: "Ankur",
  age: 25
})
```

Less efficient:

```js
db.users.find({
  age: 25
})
```

---

# 🔒 Unique Index

Prevents duplicate values.

```js
db.users.createIndex(
  { email: 1 },
  { unique: true }
)
```

### Example

Allowed:

```text
john@gmail.com
ankur@gmail.com
```

Not Allowed:

```text
john@gmail.com
john@gmail.com
```

MongoDB throws an error.

---

# ⚡ Query Performance Comparison

## Without Index

Query:

```js
db.users.find({
  email: "john@gmail.com"
})
```

Execution Plan:

```text
COLLSCAN
```

MongoDB checks every document.

---

## With Index

```js
db.users.createIndex({
  email: 1
})
```

Execution Plan:

```text
IXSCAN
```

MongoDB directly locates the record.

---

# 🔍 Checking Query Performance

Use:

```js
db.users.find({
  email: "john@gmail.com"
}).explain("executionStats")
```

Important Fields:

| Field             | Meaning           |
| ----------------- | ----------------- |
| COLLSCAN          | No index used     |
| IXSCAN            | Index used        |
| totalDocsExamined | Documents scanned |

---

### Good Result

```js
totalDocsExamined: 1
```

Excellent indexing.

---

### Bad Result

```js
totalDocsExamined: 500000
```

Index is not helping effectively.

---

# 📈 Range Queries

Suppose:

```js
db.orders.find({
  price: {
    $gte: 1000,
    $lte: 5000
  }
})
```

Create Index:

```js
db.orders.createIndex({
  price: 1
})
```

MongoDB:

1. Finds 1000
2. Traverses leaf nodes sequentially
3. Stops at 5000

This is one reason B+ Trees are powerful.

---

# 📚 Types of Indexes in MongoDB

| Index Type   | Purpose                    |
| ------------ | -------------------------- |
| Single Field | Search by one field        |
| Compound     | Multiple fields            |
| Multikey     | Array fields               |
| Text         | Full-text search           |
| Hashed       | Sharding                   |
| TTL          | Auto-delete documents      |
| Sparse       | Index only existing values |

---

# 🛠 Indexing in Mongoose

## Method 1

```js
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    index: true
  }
});
```

---

## Method 2

```js
userSchema.index({
  username: 1,
  age: -1
});
```

---

# ⚖️ Indexing Trade-Offs

Indexes improve reads but impact writes.

### Advantages

✅ Faster Queries

✅ Better Filtering

✅ Efficient Sorting

✅ Improved Scalability

---

### Disadvantages

❌ More RAM Usage

❌ More Disk Space

❌ Slower Inserts

❌ Slower Updates

---

# 📝 Why Writes Become Slower

Suppose a collection has:

```text
5 Indexes
```

When inserting a document:

1. Insert document
2. Update Index #1
3. Update Index #2
4. Update Index #3
5. Update Index #4
6. Update Index #5

More indexes = more write work.

---

# 🚀 Real World Example

Follower System:

```js
followSchema.index(
  {
    follower: 1,
    following: 1
  },
  {
    unique: true
  }
);

followSchema.index({
  follower: 1
});

followSchema.index({
  following: 1
});
```

---

### Benefits

#### Find Who User Follows

```js
Follow.find({
  follower: userId
})
```

Uses:

```js
{ follower: 1 }
```

---

#### Find User Followers

```js
Follow.find({
  following: userId
})
```

Uses:

```js
{ following: 1 }
```

---

#### Prevent Duplicate Follows

```js
{ follower: 1, following: 1 }
```

Unique compound index.

---

# 🧠 Why Databases Prefer B+ Trees

## Binary Search Tree

Problems:

* Can become very tall
* Inefficient for disk access

---

## Hash Tables

Problems:

* No range queries
* No sorting support

---

## B+ Trees

Advantages:

* Balanced structure
* Efficient range queries
* Better disk utilization
* Predictable performance

Because of these benefits, databases such as:

* MongoDB
* MySQL
* PostgreSQL

use B+ Trees for indexing.

---

# 📊 Impact at Scale

| Records | Without Index  | With Index |
| ------- | -------------- | ---------- |
| 10K     | Fast           | Fast       |
| 100K    | Slower         | Fast       |
| 1M      | Very Slow      | Fast       |
| 10M+    | Extremely Slow | Manageable |

At large scale, indexing becomes mandatory.

---

# 🎤 Interview Question

### What is Indexing in MongoDB?

Indexing is a technique used to improve query performance by storing field values in a separate sorted data structure. MongoDB uses B+ Trees for indexing, allowing it to locate documents quickly without scanning the entire collection.

---

# 🎯 Final Summary

```text
Without Index
-------------
Query
  ↓
Scan Entire Collection
  ↓
Find Result

With Index
----------
Query
  ↓
Navigate B+ Tree
  ↓
Jump Directly to Document
  ↓
Return Result
```

### Key Takeaways

* MongoDB uses B+ Trees for indexing
* Indexes reduce search complexity from O(n) to O(log n)
* Range queries become highly efficient
* Read operations become significantly faster
* Writes become slightly slower
* Index only fields frequently used in queries
* Proper indexing is essential for scalable applications

```
```
