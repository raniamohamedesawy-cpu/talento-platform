# 🏗 Architecture & Design Document

Complete system architecture, design patterns, and technical decisions for Talento.

---

## Table of Contents

- [System Overview](#system-overview)
- [Frontend Architecture](#frontend-architecture)
- [Backend Architecture](#backend-architecture)
- [Database Design](#database-design)
- [API Architecture](#api-architecture)
- [Authentication & Security](#authentication--security)
- [Real-Time Communication](#real-time-communication)
- [Caching Strategy](#caching-strategy)
- [Deployment Architecture](#deployment-architecture)

---

## System Overview

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Client Layer                            │
│    Web Browser (React + TypeScript + Tailwind CSS)          │
│                   (Vite Build Tool)                          │
└────────────────────┬────────────────────────────────────────┘
                     │ HTTPS + WebSocket
                     │ (Port 5174 → 8080)
┌────────────────────▼────────────────────────────────────────┐
│                      API Layer                               │
│  Spring Boot REST API + WebSocket Gateway                   │
│      JWT Authentication + Security Filter Chain             │
│           (Port 8080, Java 21)                               │
└────────────────────┬─────────────────┬──────────────────────┘
                     │                 │
          Persistence│                 │Cache
                     │                 │
        ┌────────────▼─┐      ┌───────▼───────┐
        │  MySQL 8.1   │      │   Redis 7     │
        │  (Port 3306) │      │  (Port 6379)  │
        │  - Users     │      │ - Tokens      │
        │  - Skills    │      │ - Matches     │
        │  - Sessions  │      │ - Cache       │
        │  - Messages  │      │ - Sessions    │
        └──────────────┘      └───────────────┘
```

### Technology Stack Decision Matrix

| Layer | Technology | Why |
|-------|-----------|-----|
| Frontend | React 18.3 | Component-based, large ecosystem, performance |
| Language | TypeScript | Type safety, IDE support, maintainability |
| Build | Vite | Fast HMR, modern tooling, optimized bundles |
| Styling | Tailwind CSS | Utility-first, responsive, production-ready |
| Backend | Spring Boot 3.2 | Enterprise-grade, security, ecosystem |
| Language | Java 21 | Performance, stability, enterprise support |
| Database | MySQL 8.1 | ACID compliance, scalability, RDBMS |
| Cache | Redis 7 | High-performance, real-time, pub/sub support |
| Containerization | Docker | Consistency, portability, modern deployment |

---

## Frontend Architecture

### Project Structure

```
talento-frontend-fixed/
├── src/
│   ├── app/
│   │   ├── components/               # Reusable components
│   │   │   ├── ui/                   # Base UI components
│   │   │   ├── screens/              # Page components
│   │   │   ├── Navbar.tsx
│   │   │   ├── AuthModal.tsx
│   │   │   ├── Logo.tsx
│   │   │   ├── Toast.tsx
│   │   │   └── ...
│   │   ├── api/                      # API clients
│   │   │   ├── authApi.ts            # Auth endpoints
│   │   │   ├── matchesApi.ts         # Matching endpoints
│   │   │   └── ...
│   │   ├── context/                  # Global state
│   │   │   └── AppContext.tsx        # Centralized state
│   │   ├── hooks/                    # Custom hooks
│   │   │   ├── useAsyncData.ts
│   │   │   ├── useWebSocket.ts
│   │   │   └── ...
│   │   ├── types/                    # TypeScript types
│   │   │   └── index.ts
│   │   ├── data/                     # Mock data
│   │   │   └── ...
│   │   ├── App.tsx                   # Root component
│   │   ├── index.css                 # Global styles
│   │   └── LandingPage.tsx           # Landing page
│   └── main.tsx                      # Entry point
├── public/                           # Static assets
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
└── package.json
```

### State Management Architecture

```
AppContext (Global State)
├── User State
│   ├── authUser (current user)
│   ├── isAuthenticated
│   └── userPreferences
├── Conversations
│   ├── conversations (list)
│   ├── selectedConversation
│   └── messages
├── Matches
│   ├── matches (list)
│   ├── selectedMatch
│   └── matchDetails
├── Sessions
│   ├── sessions (list)
│   └── sessionDetails
└── UI State
    ├── loading states
    ├── error states
    └── toast notifications
```

### Component Hierarchy

```
App
├── LandingPage (if not authenticated)
└── MainLayout (if authenticated)
    ├── Navbar
    │   ├── Search bar
    │   ├── Premium AI badge
    │   ├── Credits display
    │   └── User menu
    ├── Sidebar
    │   ├── Dashboard
    │   ├── Matches
    │   ├── Sessions
    │   ├── Messages
    │   ├── Learning Paths
    │   ├── Achievements
    │   ├── Profile
    │   └── Settings
    └── Main Content Area
        ├── Dashboard
        │   ├── Trust Score
        │   ├── AI Matches
        │   ├── Stats Cards
        │   └── Credit Balance
        ├── Matches Page
        │   ├── Filter Panel
        │   └── Matches Grid
        ├── Chat Page
        │   ├── Conversation List
        │   └── Chat Window
        └── ... (other screens)
```

### Data Flow

```
User Action
    ↓
Component Event Handler
    ↓
API Call (Axios)
    ↓
Backend Processing
    ↓
API Response
    ↓
Context Update (setConversations, etc)
    ↓
Re-render (components listen to context)
    ↓
UI Update
```

### Key Features

✅ **TypeScript Strict Mode**
- All files use strict typing
- No implicit any types
- IDE autocompletion

✅ **Responsive Design**
- Mobile-first approach
- Tailwind breakpoints (sm, md, lg, xl)
- Tested on devices 375px - 2560px

✅ **Dark Mode**
- CSS variable based
- Automatic based on system preference
- Instant toggle via `.dark` class

✅ **Performance**
- Code splitting with React.lazy
- Vite HMR for fast development
- Production optimizations

---

## Backend Architecture

### Project Structure

```
talento-backend-fixed/
├── src/main/java/com/talento/
│   ├── TalentoApplication.java       # Entry point
│   ├── controller/                   # REST endpoints
│   │   ├── AuthController.java
│   │   ├── UserController.java
│   │   ├── MatchController.java
│   │   ├── SessionController.java
│   │   ├── ChatController.java
│   │   └── ...
│   ├── service/                      # Business logic
│   │   ├── AuthService.java
│   │   ├── UserService.java
│   │   ├── MatchService.java
│   │   ├── SessionService.java
│   │   ├── PasswordValidator.java
│   │   └── ...
│   ├── repository/                   # Data access
│   │   ├── UserRepository.java
│   │   ├── SessionRepository.java
│   │   ├── MessageRepository.java
│   │   └── ...
│   ├── entity/                       # JPA entities
│   │   ├── User.java
│   │   ├── Session.java
│   │   ├── Message.java
│   │   ├── Skill.java
│   │   └── ...
│   ├── config/                       # Spring configs
│   │   ├── SecurityConfig.java
│   │   ├── WebSocketConfig.java
│   │   ├── CorsOriginResolver.java
│   │   └── ...
│   ├── security/                     # Auth & security
│   │   ├── JwtUtil.java
│   │   ├── JwtAuthFilter.java
│   │   ├── SecurityHeadersFilter.java
│   │   ├── TokenRevocationService.java
│   │   └── ...
│   ├── dto/                          # Data transfer objects
│   │   ├── LoginRequest.java
│   │   ├── UserDTO.java
│   │   └── ...
│   └── util/                         # Utilities
│       ├── JwtUtil.java
│       └── ...
├── src/main/resources/
│   ├── application.yml
│   ├── application-local.yml
│   ├── application-docker.yml
│   └── application-prod.yml
└── pom.xml
```

### Layered Architecture

```
┌─────────────────────────────────────┐
│        Controller Layer              │
│  HTTP Request Handling & Routing    │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│        Service Layer                │
│  Business Logic & Validation        │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│      Repository Layer               │
│  Data Access & Queries              │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│      Entity Layer                   │
│  Domain Models (JPA)                │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│      Database Layer                 │
│  MySQL 8.1                          │
└─────────────────────────────────────┘
```

### Request/Response Flow

```
HTTP Request (POST /api/auth/login)
    ↓ [SecurityFilter - CORS, Headers]
    ↓ [DispatcherServlet]
    ↓ [AuthController.login()]
    ↓ [Service.authenticate()]
    ↓ [Repository.findByEmail()]
    ↓ [Database Query]
    ↓ [Password Verification]
    ↓ [JWT Generation]
    ↓ [Redis Storage]
    ↓ HTTP Response (200 OK + Token)
```

### Key Components

✅ **Controllers**
- REST endpoints with `@RestController`
- Request validation with `@Valid`
- Exception handling with `@ExceptionHandler`

✅ **Services**
- Business logic implementation
- Transaction management with `@Transactional`
- Async operations with `@Async`

✅ **Repositories**
- JPA `extends CrudRepository`
- Custom queries with `@Query`
- Pagination with `Pageable`

✅ **Entities**
- JPA annotations for mapping
- Lombok for boilerplate reduction
- Audit fields (createdAt, updatedAt)

✅ **Security**
- JWT token generation & validation
- Spring Security FilterChain
- Password hashing with BCrypt
- CORS configuration
- Security headers middleware

---

## Database Design

### Entity Relationship Diagram

```
┌──────────────┐
│    Users     │
├──────────────┤
│ id (PK)      │
│ email        │◄──┐
│ password     │   │
│ name         │   │
│ bio          │   │
│ avatar       │   │
│ trust_score  │   │ 1:Many
│ status       │   │
│ created_at   │   │
└──────────────┘   │
      ▲            │
      │            │
    1:Many        │
      │            │
┌─────┴──┐   ┌─────┴─────────┐
│ Skills │   │   Sessions    │
├────────┤   ├───────────────┤
│ id (PK)│   │ id (PK)       │
│ user_id│◄──┤ user_id_1 (FK)│
│ name   │   │ user_id_2 (FK)│
│ level  │   │ scheduled_at  │
│ verify │   │ duration      │
└────────┘   │ status        │
             │ rating        │
             └───────────────┘
                   ▲
                   │
                1:Many
                   │
             ┌─────┴─────────┐
             │   Messages    │
             ├───────────────┤
             │ id (PK)       │
             │ session_id(FK)│
             │ sender_id(FK) │
             │ content       │
             │ created_at    │
             └───────────────┘

┌──────────────┐       ┌────────────────┐
│   Matches    │──────►│  Match_Scores  │
├──────────────┤       ├────────────────┤
│ id (PK)      │       │ id (PK)        │
│ user_id_1(FK)│       │ match_id(FK)   │
│ user_id_2(FK)│       │ skill_match    │
│ score        │       │ level_match    │
│ reason       │       │ availability   │
│ status       │       │ mutual_benefit │
│ created_at   │       └────────────────┘
└──────────────┘
```

### Key Tables

**users**
- Primary key: `id` (UUID)
- Unique: `email`
- Indexes: `status`, `created_at`, `trust_score`
- Soft delete: `deleted_at` (nullable)

**sessions**
- Foreign keys: `user_id_1`, `user_id_2` → users
- Indexes: `scheduled_at`, `status`
- Enum: `status` (BOOKED, ONGOING, COMPLETED, CANCELLED)

**messages**
- Foreign keys: `session_id`, `sender_id`
- Indexes: `session_id`, `created_at`
- Partition by: `created_at` (for large message tables)

**skills**
- Foreign key: `user_id`
- Unique: `user_id` + `name`
- Index: `level`, `verified`

---

## API Architecture

### RESTful Design Principles

✅ **Resource-Oriented**
```
GET    /api/users              - List users
GET    /api/users/{id}         - Get user
POST   /api/users              - Create user
PUT    /api/users/{id}         - Update user
DELETE /api/users/{id}         - Delete user
```

✅ **Proper HTTP Methods**
- GET: Retrieve resource
- POST: Create resource
- PUT/PATCH: Update resource
- DELETE: Remove resource

✅ **Status Codes**
- 200: OK (success)
- 201: Created
- 204: No Content
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error

✅ **Response Format**
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful",
  "timestamp": "2026-05-29T12:00:00Z"
}
```

### API Versioning

```
/api/v1/users              - Version 1
/api/v2/users              - Version 2 (future)
```

### Rate Limiting

- **Default**: 120 requests/minute
- **Per IP**: Tracked via X-Forwarded-For
- **Headers**: `X-RateLimit-*` in response
- **Fallback**: 429 Too Many Requests

---

## Authentication & Security

### JWT Token Flow

```
1. User Login
   POST /api/auth/login
   { email, password }
        ↓
2. Credentials Validated
   Password hashed with BCrypt
   Checked against database
        ↓
3. Tokens Generated
   Access Token (15 min)
   Refresh Token (7 days)
        ↓
4. Tokens Stored
   Local Storage (access)
   HttpOnly Cookie (refresh)
        ↓
5. Token Included in Requests
   Authorization: Bearer <access_token>
        ↓
6. Token Validated
   JwtAuthFilter checks:
   - Signature validity
   - Expiration time
   - Revocation status (Redis)
        ↓
7. Request Processed
   User context set
   Endpoint accessed
```

### Password Security

**Requirements**
- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 digit
- At least 1 special character

**Storage**
- Hashed with BCrypt (strength 12)
- Salted automatically by BCrypt
- Never stored in plain text

### Security Headers

```
Strict-Transport-Security: max-age=31536000
Content-Security-Policy: default-src 'self'
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
```

### Token Revocation

```
Logout Request
    ↓
Token added to Redis
Key: token_<hash>
TTL: Token expiration
    ↓
On subsequent requests
Check: Redis.exists(token_<hash>)
If exists: Reject request (401)
```

---

## Real-Time Communication

### WebSocket Architecture

```
┌─────────────────────────────────────┐
│      Client (React)                 │
│   WebSocket Connection              │
└───────────────────┬─────────────────┘
                    │ ws://localhost:8080/ws
                    │ (STOMP Protocol)
┌───────────────────▼─────────────────┐
│   Spring WebSocket Gateway          │
│   - Message routing                 │
│   - Topic subscriptions             │
│   - Broadcast handling              │
└───────────────────┬─────────────────┘
                    │
        ┌───────────┼───────────┐
        │           │           │
    ┌───▼────┐ ┌────▼───┐ ┌────▼───┐
    │Message │ │Message │ │  Chat  │
    │Handler │ │Sender  │ │Service │
    └────────┘ └────────┘ └────────┘
        │
    ┌───▼────────────────┐
    │  MySQL Database    │
    │  - Store messages  │
    │  - Persist state   │
    └────────────────────┘
```

### STOMP Topics

```
/topic/messages/{conversationId}    - Chat messages
/user/queue/notifications           - Personal notifications
/topic/presence                     - User presence
/topic/typing                       - Typing indicators
```

### Message Flow

```
1. Client: /app/chat/send
   POST message to endpoint
        ↓
2. Server: MessageController
   @MessageMapping("/chat/send")
        ↓
3. Broadcast
   convertAndSend("/topic/messages/{id}", message)
        ↓
4. All Subscribed Clients
   Receive message update
   Update local state
   Re-render UI
```

---

## Caching Strategy

### Redis Architecture

```
┌─────────────────────────────────────┐
│      Application Layer              │
│   (Spring Boot Service)             │
└────────────────┬────────────────────┘
                 │
         ┌───────▼────────┐
         │ Cache Checking │
         └───────┬────────┘
                 │
        ┌────────┴────────┐
        │                 │
    Cache Hit         Cache Miss
        │                 │
        │          ┌──────▼──────┐
        │          │Database Call│
        │          └──────┬──────┘
        │                 │
        │          ┌──────▼──────┐
        │          │Store in     │
        │          │Redis        │
        │          └──────┬──────┘
        │                 │
        └─────────┬───────┘
                  │
         Return Result
```

### Cache Keys

```
users:{userId}                 - User profile
matches:{userId}               - User matches
tokens:{tokenHash}             - Token revocation
session:{sessionId}            - Session details
conversations:{userId}         - User conversations
```

### TTL (Time To Live)

```
User profiles:         3600s (1 hour)
Match results:         1800s (30 min)
Session data:          7200s (2 hours)
Token revocation:      <token expiration>
Conversations:         3600s (1 hour)
```

---

## Deployment Architecture

### Development Environment

```
Local Machine
├── Frontend (localhost:5174)
├── Backend (localhost:8080)
├── MySQL (localhost:3306)
└── Redis (localhost:6379)
```

### Docker Environment

```
Docker Host
├── talento-frontend      (nginx:alpine)
├── talento-backend       (openjdk:21-alpine)
├── talento-db           (mysql:8.1)
├── talento-redis        (redis:7-alpine)
└── Docker Network       (talento-network)
```

### Production Environment

```
Production Cluster
├── Frontend CDN
│   ├── Vercel / Netlify
│   └── CloudFlare
├── Backend Load Balancer
│   ├── Instance 1 (Spring Boot)
│   ├── Instance 2 (Spring Boot)
│   └── Instance N (Spring Boot)
├── Database Cluster
│   ├── Primary (Write)
│   ├── Replica 1 (Read)
│   └── Replica N (Read)
├── Redis Cluster
│   ├── Master
│   ├── Slave 1
│   └── Slave N
└── Monitoring
    ├── Prometheus
    ├── Grafana
    └── ELK Stack
```

### CI/CD Pipeline

```
Git Push
    ↓
GitHub Actions
    ├─ Lint Check
    ├─ Unit Tests
    ├─ Build Frontend
    ├─ Build Backend
    ├─ Integration Tests
    ├─ Security Scan
    ├─ Deploy to Staging
    └─ Deploy to Production
```

---

## Scalability Considerations

### Horizontal Scaling

✅ **Stateless Backend**
- No session state in backend
- All state in Redis/Database
- Easy to add instances

✅ **Load Balancer**
- Distributes requests
- Health checks
- Sticky sessions for WebSocket

✅ **Database Replication**
- Read replicas for queries
- Write master for mutations
- Automatic failover

### Performance Optimization

✅ **Frontend**
- Code splitting
- Lazy loading
- Image optimization
- Minification

✅ **Backend**
- Database indexing
- Query optimization
- Connection pooling
- Async processing

✅ **Cache Strategy**
- Frequently accessed data
- Short TTLs for consistency
- Invalidation on updates

---

**Architecture Document: Complete** ✅

For deployment details, see [DEPLOYMENT.md](DEPLOYMENT.md)
