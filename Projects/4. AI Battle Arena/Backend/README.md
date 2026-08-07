<div align="center">

# ⚙️ DualMind AI Arena — Backend Architecture & API
### *High-Throughput 4-Layer Clean Architecture with LangGraph Orchestration & MongoDB Persistence*

[![Author](https://img.shields.io/badge/Author-Dibyanshu_Chauhan-6366F1?style=for-the-badge&logo=github&logoColor=white)](https://github.com/DibyanshuChauhan)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express-5.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose_8.x-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![LangChain](https://img.shields.io/badge/LangGraph-StateGraph-FF6B6B?style=for-the-badge&logo=graphql&logoColor=white)](https://langchain-ai.github.io/langgraphjs/)
[![Zod](https://img.shields.io/badge/Zod-Validation-3068B7?style=for-the-badge&logo=zod&logoColor=white)](https://zod.dev/)

<p align="center">
  The <b>DualMind AI Arena Backend</b> is an enterprise-grade RESTful API built on Express.js and TypeScript. It implements a strict <b>4-Layer Architecture</b>, orchestrates parallel multi-LLM generation via <b>LangGraph</b>, enforces structured JSON arbitration through <b>Google Gemini</b>, and provides non-blocking MongoDB persistence.
</p>

</div>

---

## 🏛️ 4-Layer Clean Architecture Breakdown

The backend is built around a Clean 4-Layer Architecture to guarantee separation of concerns, strict type safety, testability, and enterprise scalability:

```mermaid
graph TD
    subgraph Layer1 ["1. Presentation Layer (HTTP / Transport)"]
        Router["arena.routes.ts (/api/v1/arena)"]
        Controller["arena.controller.ts"]
        ErrorMW["error.middleware.ts"]
        ResponseUtil["api-response.ts"]
    end

    subgraph Layer2 ["2. Application / Service Layer"]
        Service["arena.service.ts (Business Logic & Orchestration)"]
    end

    subgraph Layer3 ["3. Domain / Model Layer"]
        Types["arena.types.ts (Domain Contracts)"]
        Schemas["arena.schema.ts (Zod Validation)"]
        DBModel["chat-history.model.ts (Mongoose Schema)"]
    end

    subgraph Layer4 ["4. Infrastructure & AI Engine Layer"]
        LLMFactory["llm.provider.ts (Gemini, Mistral, Cohere)"]
        GraphEngine["arena.graph.ts (LangGraph State Machine)"]
        DBManager["database.ts (MongoDB Connection Manager)"]
        Config["config.ts (Typed Environment Variables)"]
    end

    Router --> Controller
    Controller --> Service
    Service --> Types
    Service --> Schemas
    Service --> DBModel
    Service --> GraphEngine
    GraphEngine --> LLMFactory
    Service --> DBManager
```

---

## 🔗 How Backend Connects to Frontend (The Exact Execution Flow)

```mermaid
sequenceDiagram
    autonumber
    actor Frontend as Frontend (React / Axios)
    participant Express as Express App (app.ts)
    participant Router as Arena Router (arena.routes.ts)
    participant Controller as Arena Controller (arena.controller.ts)
    participant Service as Arena Service (arena.service.ts)
    participant Graph as LangGraph Engine (arena.graph.ts)
    participant Mistral as Mistral AI API
    participant Cohere as Cohere AI API
    participant Gemini as Gemini AI API (Judge)
    participant DB as MongoDB Atlas

    Frontend->>Express: HTTP POST http://localhost:3000/api/v1/arena/invoke { input: "..." }
    Express->>Express: Apply CORS & express.json() body parsing
    Express->>Router: Route to /invoke handler
    Router->>Controller: ArenaController.invoke(req, res, next)
    Controller->>Controller: Validate payload with Zod (ArenaInvokeSchema)
    alt Invalid Input
        Controller-->>Frontend: 400 Bad Request { success: false, error: "Validation error..." }
    end
    Controller->>Service: ArenaService.executeBattle(input)
    Service->>Graph: ArenaGraphEngine.execute(problem)
    
    par Parallel LLM Generation
        Graph->>Mistral: mistralModel.invoke(problem)
        Mistral-->>Graph: solution_1
    and
        Graph->>Cohere: cohereModel.invoke(problem)
        Cohere-->>Graph: solution_2
    end
    
    Graph->>Gemini: Evaluate & Score (providerStrategy with Zod Schema)
    Gemini-->>Graph: { solution_1_score, solution_2_score, reasonings }
    Graph-->>Service: Return ArenaGraphResult
    
    critical Non-blocking Persistence
        Service-)DB: ChatHistoryModel.create({ prompt, solution_1, solution_2, judge })
    end
    
    Service-->>Controller: Return Result
    Controller-->>Frontend: HTTP 200 OK { success: true, message: "...", result: { ... } }
```

---

## 🧩 Detailed Module Explanations

### 1. Presentation Layer (`src/arena/controllers/` & `src/arena/routes/`)
- **`arena.routes.ts`**: Defines REST endpoints mounted under `/api/v1/arena`:
  - `POST /invoke`: Triggers dual-model comparison and arbitration.
  - `GET /history`: Fetches past battles sorted by `createdAt: -1`.
  - `GET /history/:id`: Fetches a specific battle by ID.
  - `DELETE /history/:id`: Removes a specific battle.
  - `GET /health`: Healthcheck endpoint for monitoring uptime.
- **`arena.controller.ts`**: Extracts request payloads, runs Zod schema validation, dispatches execution to `ArenaService`, and formats responses with `ApiResponse.success`.
- **`error.middleware.ts`**: Global Express error handler that catches `AppError` instances and unknown runtime errors, returning sanitized error responses.

### 2. Service / Application Layer (`src/arena/services/`)
- **`arena.service.ts`**: The central orchestrator:
  - Invokes `ArenaGraphEngine.execute(prompt)`.
  - Asynchronously saves the battle document to MongoDB (`ChatHistoryModel.create()`).
  - Implements complete CRUD methods for chat history.

### 3. Domain / Model Layer (`src/arena/types/`, `src/arena/schemas/`, `src/arena/models/`)
- **`arena.types.ts`**: TypeScript contracts defining `JudgeEvaluation`, `ArenaGraphResult`, and `ChatHistoryItem`.
- **`arena.schema.ts`**: Zod validation schemas ensuring input strings are non-empty and within bounds (1–4000 characters).
- **`chat-history.model.ts`**: Mongoose Schema and Model with reverse-chronological indexing on `createdAt`.

### 4. Infrastructure & AI Engine Layer (`src/infrastructure/`)
- **`llm.provider.ts`**: Singleton factory maintaining long-lived client instances of `ChatMistralAI`, `ChatCohere`, and `ChatGoogle`.
- **`arena.graph.ts`**: Compiles the LangGraph `StateGraph` state machine.
- **`database.ts`**: Resilient Mongoose connection manager with reconnection listeners.

---

## 🤖 LangGraph State Machine Architecture

```mermaid
stateDiagram-v2
    [*] --> START
    START --> solution: Problem input
    
    state solution {
        [*] --> Mistral_Invoke
        [*] --> Cohere_Invoke
        Mistral_Invoke --> Solution_1_Output
        Cohere_Invoke --> Solution_2_Output
    }
    
    solution --> judge_node: Pipe Problem, Solution 1 & Solution 2
    
    state judge_node {
        [*] --> Gemini_Flash_Evaluation
        Gemini_Flash_Evaluation --> Zod_Structured_Output
    }
    
    judge_node --> END: Return ArenaGraphResult
    END --> [*]
```

---

## 🛠️ Step-by-Step Installation & Setup

### 1. Prerequisites
- Node.js `v18.0.0` or higher
- MongoDB (local or MongoDB Atlas connection string)
- API Keys:
  - Google AI Studio: [https://aistudio.google.com/](https://aistudio.google.com/)
  - Mistral AI: [https://console.mistral.ai/](https://console.mistral.ai/)
  - Cohere: [https://dashboard.cohere.com/](https://dashboard.cohere.com/)

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in `Backend/`:
```env
# AI Model API Keys
GOOGLE_API_KEY=your_gemini_api_key
MISTRALAI_API_KEY=your_mistral_api_key
COHERE_API_KEY=your_cohere_api_key

# MongoDB Connection URI
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/ai-battle-arena?retryWrites=true&w=majority

# Server Port
PORT=3000
```

### 4. Start Server
```bash
# Start in development mode with hot-reloading
npm run dev

# Run TypeScript typecheck
npx tsc --noEmit
```

---

## 📡 REST API Reference

Base URL: `http://localhost:3000/api/v1`

### 1. Execute Battle & Arbitration
```http
POST /api/v1/arena/invoke
Content-Type: application/json

{
  "input": "Explain the difference between TCP and UDP with code examples"
}
```

#### Response (`200 OK`):
```json
{
  "success": true,
  "message": "Graph executed successfully",
  "result": {
    "solution_1": "### TCP vs UDP\nTCP is connection-oriented...",
    "solution_2": "### Transport Protocols\nTCP provides guaranteed delivery...",
    "judge": {
      "solution_1_score": 9,
      "solution_2_score": 8,
      "solution_1_reasoning": "Solution 1 provided clear socket code examples and header overhead breakdown.",
      "solution_2_reasoning": "Solution 2 was accurate but had fewer practical implementations."
    }
  }
}
```

---

### 2. Fetch Chat History
```http
GET /api/v1/arena/history
```

#### Response (`200 OK`):
```json
{
  "success": true,
  "message": "Chat history retrieved successfully",
  "result": [
    {
      "_id": "66b3f8901234abcd5678ef90",
      "prompt": "Explain the difference between TCP and UDP with code examples",
      "solution_1": "...",
      "solution_2": "...",
      "judge": {
        "solution_1_score": 9,
        "solution_2_score": 8,
        "solution_1_reasoning": "...",
        "solution_2_reasoning": "..."
      },
      "createdAt": "2026-08-07T17:40:00.000Z"
    }
  ]
}
```

---

## 👨‍💻 Author

<div align="center">

### **Divyanshu Chauhan**
[![GitHub](https://img.shields.io/badge/GitHub-DibyanshuChauhan-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/DibyanshuChauhan)

</div>
