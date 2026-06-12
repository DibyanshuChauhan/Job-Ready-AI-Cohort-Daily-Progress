# 📘 MongoDB + Mongoose Complete Notes

A beginner-friendly guide to understanding **MongoDB**, **MongoDB Atlas**, and **Mongoose** with simple examples and explanations.

---

# 1️⃣ What is MongoDB?

MongoDB is a **NoSQL Database** that stores data in the form of **documents** instead of tables and rows.

Unlike SQL databases, MongoDB is flexible and does not require a fixed table structure.

### Example Document

```json
{
  "title": "Learn MongoDB",
  "description": "MongoDB basics"
}
```

Think of a document as a JavaScript object stored inside the database.

---

# 2️⃣ MongoDB Terminology

| SQL      | MongoDB    |
| -------- | ---------- |
| Database | Database   |
| Table    | Collection |
| Row      | Document   |
| Column   | Field      |

### Example

Collection: `notes`

Document:

```json
{
  "title": "MongoDB",
  "description": "Learn CRUD"
}
```

---

# 3️⃣ What is MongoDB Atlas?

MongoDB Atlas is MongoDB's cloud database service.

It allows you to:

* Store data online
* Access your database from anywhere
* Scale applications easily
* Manage backups automatically

### Example Connection String

```text
mongodb+srv://username:password@cluster.mongodb.net/myDB
```

This URL tells your application how to connect to the database.

---

# 4️⃣ What is Mongoose?

Mongoose is an **ODM (Object Data Modeling)** library for Node.js.

It acts as a bridge between:

```text
Node.js ↔ Mongoose ↔ MongoDB
```

Mongoose helps us:

* Create schemas
* Validate data
* Perform CRUD operations
* Work with MongoDB using JavaScript

### Installation

```bash
npm install mongoose
```

---

# 5️⃣ Connecting MongoDB

### Purpose

Used to establish a connection between your Node.js application and MongoDB.

### Illustration

```javascript
mongoose.connect(MONGO_URI);
```

### What it does

* Connects your server to MongoDB
* Allows database operations
* Should be called before using models

---

# 6️⃣ What is a Schema?

A Schema defines:

* Fields
* Data Types
* Validation Rules

Think of it as a blueprint for documents.

### Illustration

```javascript
const noteSchema = new mongoose.Schema({
  title: String,
  description: String
});
```

### What it does

This schema tells MongoDB that every note should contain:

* title
* description

---

# 7️⃣ Common Schema Data Types

## String

```javascript
name: String
```

Stores text.

---

## Number

```javascript
age: Number
```

Stores numeric values.

---

## Boolean

```javascript
isAdmin: Boolean
```

Stores true or false.

---

## Date

```javascript
createdAt: Date
```

Stores dates and timestamps.

---

## Array

```javascript
skills: [String]
```

Stores multiple values.

---

## ObjectId

```javascript
userId: mongoose.Schema.Types.ObjectId
```

Used for relationships between collections.

---

# 8️⃣ Schema Validation

Validation helps ensure correct data is stored.

### Required Field

```javascript
title: {
  type: String,
  required: true
}
```

### What it does

Prevents saving a document without a title.

---

# 9️⃣ Timestamps

### Illustration

```javascript
{
  timestamps: true
}
```

### What it does

Automatically adds:

```javascript
createdAt
updatedAt
```

to every document.

---

# 🔟 What is a Model?

A Model is created from a Schema.

It is used to interact with MongoDB collections.

### Illustration

```javascript
const Note = mongoose.model("Note", noteSchema);
```

### What it does

Allows us to:

* Create documents
* Read documents
* Update documents
* Delete documents

---

# 1️⃣1️⃣ CREATE Operations

Used to insert new documents.

---

## create()

### Illustration

```javascript
Note.create(data);
```

### What it does

Creates and saves a document in one step.

---

## save()

### Illustration

```javascript
const note = new Note(data);
note.save();
```

### What it does

Creates an instance first and saves later.

Useful when you need to modify data before saving.

---

# 1️⃣2️⃣ READ Operations

Used to fetch data from MongoDB.

---

## find()

### Illustration

```javascript
Note.find();
```

### What it does

Returns all documents.

---

## findOne()

### Illustration

```javascript
Note.findOne({ title: "MongoDB" });
```

### What it does

Returns the first matching document.

---

## findById()

### Illustration

```javascript
Note.findById(id);
```

### What it does

Returns a document using its unique `_id`.

---

## find() with Filter

### Illustration

```javascript
Note.find({ title: "MongoDB" });
```

### What it does

Returns all matching documents.

---

# 1️⃣3️⃣ UPDATE Operations

Used to modify existing documents.

---

## findByIdAndUpdate()

### Illustration

```javascript
Note.findByIdAndUpdate(id, updateData);
```

### What it does

Finds a document by ID and updates it.

---

## Important Option: new

### Illustration

```javascript
{
  new: true
}
```

### What it does

Returns updated data instead of old data.

---

## Important Option: runValidators

### Illustration

```javascript
{
  runValidators: true
}
```

### What it does

Runs schema validation during updates.

---

# 1️⃣4️⃣ PATCH Requests

PATCH is used when updating only specific fields.

### Example

Suppose a document contains:

```json
{
  "title": "MongoDB",
  "description": "Basics",
  "age": 20
}
```

Updating only title:

```javascript
{
  title: "MongoDB Advanced"
}
```

### Result

```json
{
  "title": "MongoDB Advanced",
  "description": "Basics",
  "age": 20
}
```

Only the provided field changes.

---

# 1️⃣5️⃣ DELETE Operations

Used to remove documents.

---

## findByIdAndDelete()

### Illustration

```javascript
Note.findByIdAndDelete(id);
```

### What it does

Deletes a document using its ID.

---

## deleteOne()

### Illustration

```javascript
Note.deleteOne({ title: "MongoDB" });
```

### What it does

Deletes the first matching document.

---

## deleteMany()

### Illustration

```javascript
Note.deleteMany({ status: "inactive" });
```

### What it does

Deletes all matching documents.

---

# 1️⃣6️⃣ Understanding CRUD

CRUD stands for:

| Operation | Meaning     |
| --------- | ----------- |
| Create    | Insert Data |
| Read      | Fetch Data  |
| Update    | Modify Data |
| Delete    | Remove Data |

Every database application performs these four operations.

---

# 1️⃣7️⃣ Typical Flow in a Node.js Application

```text
Request
   ↓
Route
   ↓
Controller
   ↓
Model
   ↓
MongoDB
   ↓
Response
```

Example:

```text
User creates a note
↓
POST request
↓
Model creates document
↓
MongoDB stores data
↓
Success response returned
```

---

# 1️⃣8️⃣ Quick Revision

### MongoDB

* NoSQL Database
* Stores documents
* Flexible structure

### Atlas

* Cloud-hosted MongoDB
* Production-ready database

### Schema

* Defines document structure

### Model

* Performs database operations

### Create

* `create()`
* `save()`

### Read

* `find()`
* `findOne()`
* `findById()`

### Update

* `findByIdAndUpdate()`

### Delete

* `findByIdAndDelete()`
* `deleteOne()`
* `deleteMany()`

---

# 🚀 Final Thought

MongoDB stores data.

Mongoose provides structure and validation.

Schemas define how data should look.

Models allow us to perform CRUD operations.

Together, MongoDB + Mongoose make backend development in Node.js simple, organized, and scalable.
