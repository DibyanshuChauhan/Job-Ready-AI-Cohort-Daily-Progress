# Edge Collection in MongoDB

## 📖 Overview

An **Edge Collection** is a separate collection used to store relationships between documents instead of embedding those relationships directly inside documents.

It is commonly used in:

- Followers / Following Systems
- Friend Requests
- Likes & Reactions
- LinkedIn Connections
- Social Media Platforms
- Any Many-to-Many Relationship

---

# 📌 What is an Edge Collection?

An Edge Collection stores connections between two documents.

### Example

Instead of storing followers inside a user document:

```js
{
  username: "virat",
  followers: ["user1", "user2", "user3"]
}
```

Store relationships separately:

```js
{
  follower: user1,
  following: virat
}
```

This separate collection becomes the **Edge Collection**.

---

# 🎯 Why Not Store Followers Inside User Document?

## Problem 1: Large Arrays

Popular users can have millions of followers.

```js
followers: [id1, id2, id3, ...]
```

This array can become extremely large.

---

## Problem 2: MongoDB Document Size Limit

MongoDB documents have a maximum size limit of:

```text
16 MB
```

A large followers array can exceed this limit.

---

## Problem 3: Poor Scalability

Every follow/unfollow operation updates the same user document.

This creates performance bottlenecks.

---

## Problem 4: Concurrency Issues

Multiple users following the same account simultaneously can cause:

- Heavy document updates
- Lock contention
- Reduced performance

---

# ✅ Edge Collection Solution

## Users Collection

```js
{
  _id: ObjectId,
  username: String,
  email: String
}
```

## Follows Collection

```js
{
  _id: ObjectId,
  follower: ObjectId,
  following: ObjectId,
  createdAt: Date
}
```

Each relationship is stored as a separate document.

---

# 🔄 Relationship Flow

```text
User A follows User B
```

Stored as:

```js
{
  follower: UserA,
  following: UserB
}
```

### Terminology

| Field | Meaning |
|---------|---------|
| follower | User who follows |
| following | User being followed |

---

# 🛠 User Schema

```js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String
});

module.exports = mongoose.model("User", userSchema);
```

---

# 🛠 Follow Schema

```js
const mongoose = require("mongoose");

const followSchema = new mongoose.Schema({
  follower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  following: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Follow", followSchema);
```

---

# 🔒 Prevent Duplicate Follows

```js
followSchema.index(
  { follower: 1, following: 1 },
  { unique: true }
);
```

### Why?

Prevents:

```text
User A → User B
User A → User B
User A → User B
```

Only one follow relationship can exist.

---

# 🚀 Follow User API

```js
router.post("/follow/:id", async (req, res) => {

  const followerId = req.user.id;
  const followingId = req.params.id;

  if (followerId === followingId) {
    return res.status(400).json({
      message: "You can't follow yourself"
    });
  }

  await Follow.create({
    follower: followerId,
    following: followingId
  });

  res.json({
    message: "Followed Successfully"
  });
});
```

---

# 🚀 Unfollow User API

```js
router.delete("/unfollow/:id", async (req, res) => {

  await Follow.findOneAndDelete({
    follower: req.user.id,
    following: req.params.id
  });

  res.json({
    message: "Unfollowed Successfully"
  });
});
```

---

# 👥 Get Followers List

### Who follows a specific user?

```js
const followers = await Follow.find({
  following: userId
})
.populate("follower", "username email");
```

---

# 👤 Get Following List

### Who does a user follow?

```js
const following = await Follow.find({
  follower: userId
})
.populate("following", "username email");
```

---

# 📊 Count Followers Efficiently

### Recommended

```js
const count = await Follow.countDocuments({
  following: userId
});
```

### Avoid

```js
const followers = await Follow.find({
  following: userId
});

const count = followers.length;
```

---

# ⚡ Performance Optimization

## Add Indexes

```js
followSchema.index({ follower: 1 });

followSchema.index({ following: 1 });
```

### Benefits

Most queries are:

- Who follows User X?
- Who does User X follow?

Indexes make these queries significantly faster.

---

# 🎁 Benefits of Edge Collection

| Benefit | Description |
|----------|-------------|
| Scalable | Handles millions of relationships |
| Efficient | Fast querying |
| Clean Architecture | Separates relationship data |
| Flexible | Supports complex relations |
| Analytics Friendly | Easy counting & reporting |
| Production Ready | Used by large-scale applications |

---

# 🤝 Mutual Followers Example

Edge Collections allow graph-like queries.

Example:

```js
db.follows.aggregate([
  {
    $match: {
      follower: userA
    }
  },
  {
    $lookup: {
      from: "follows",
      localField: "following",
      foreignField: "follower",
      as: "mutual"
    }
  }
]);
```

Used for:

- Mutual Friends
- Suggested Connections
- Social Graph Features

---

# 📌 When to Use Edge Collections

### Use When

✅ Followers System

✅ Friends System

✅ Likes

✅ Reactions

✅ LinkedIn Connections

✅ Many-to-Many Relationships

✅ Large Scale Applications

---

# ❌ When Not to Use

Avoid Edge Collections when:

- Relationship count is very small
- Data is tightly coupled
- Relationship will never grow significantly

Example:

```text
User → Profile
```

A direct reference is usually enough.

---

# 🧠 Interview Answer

### What is an Edge Collection?

An Edge Collection is a dedicated collection that stores relationships between documents instead of embedding those relationships inside documents. It is commonly used for many-to-many relationships such as followers, friends, likes, and connections because it provides better scalability, performance, and flexibility.

---

# 🎯 Final Summary

```text
Users Collection (Nodes)
------------------------
User A
User B
User C

Follows Collection (Edges)
--------------------------
A → B
A → C
B → C
```

### Key Takeaways

- Users = Nodes
- Relationships = Edges
- Follows = Edge Collection
- Better Scalability
- Better Performance
- Industry Standard Design
- Ideal for Social Media Applications
````
