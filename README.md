> Connect with experts, share what you know, and let AI match you with the right people to grow together.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://reactjs.org/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.5-green.svg)](https://spring.io/projects/spring-boot)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://www.docker.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue.svg)](https://www.typescriptlang.org/)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running Locally](#running-locally)
- [Docker Setup](#docker-setup)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [Security](#security)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## 📖 Overview

**Talento** is a modern, full-stack web application that revolutionizes skill exchange by combining:

- **AI-Powered Matching**: Algorithm-driven recommendations based on complementary skills and availability
- **Real-Time Communication**: WebSocket-powered chat and notifications
- **Trust & Transparency**: Credibility scores, verified skills, and peer reviews
- **Session Management**: Book, manage, and track skill exchange sessions
- **Learning Paths**: Structured learning for career development
- **Credit System**: Gamified rewards for active participation
- **Premium Features**: Advanced analytics, priority support, unlimited matches

Perfect for:
- Students learning new skills
- Professionals expanding expertise
- Career changers getting mentorship
- Teams building cross-functional knowledge

---

## ✨ Key Features

### 🤖 AI Matching
- **Intelligent Algorithm**: Matches users based on skill complementarity, experience level, and availability
- **Explainable Recommendations**: Shows why each match is recommended
- **Trust Scoring**: Visual credibility indicators with metric breakdown

### 💬 Real-Time Communication
- **WebSocket Chat**: Instant messaging with STOMP protocol
- **Message History**: Persistent conversation management
- **Typing Indicators**: Real-time presence detection

### 📚 Learning Management
- **Structured Paths**: Pre-defined learning roadmaps
- **Progress Tracking**: Achievements and completion metrics
- **Skill Verification**: Peer-reviewed skill endorsements

### 👥 Session Booking
- **Flexible Scheduling**: Calendar-based availability management
- **Contract Fairness**: Balance indicators for equitable exchanges
- **Session Notes**: Documentation and follow-up management

### 🎮 Gamification
- **Credit System**: Earn credits for completed exchanges
- **Achievements**: Badges and milestones
- **Leaderboards**: Community recognition

### 🔒 Security
- **JWT Authentication**: Secure token-based auth with refresh tokens
- **Token Revocation**: Immediate logout capability
- **Password Strength Validation**: OWASP-compliant requirements
- **CORS Protection**: Origin validation
- **Security Headers**: HSTS, CSP, X-Frame-Options
- **Rate Limiting**: DDoS protection (120 req/min)

### 🌗 Premium UI/UX
- **Glassmorphism Design**: Modern frosted glass effects
- **Dark Mode Support**: Automatic theme switching
- **Responsive Design**: Mobile-first approach
- **Accessibility**: AAA color contrast, keyboard navigation
- **Smooth Animations**: 60fps micro-interactions

---

## 🛠 Tech Stack

### Frontend
- **Framework**: React 18.3 + TypeScript 5.6
- **Build Tool**: Vite 5.4
- **Styling**: Tailwind CSS 3.4
- **State**: Context API + custom hooks
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **HTTP**: Axios with interceptors
- **Real-time**: WebSocket (STOMP)

### Backend
- **Framework**: Spring Boot 3.2.5
- **Language**: Java 21
- **Authentication**: JWT with Spring Security
- **WebSocket**: STOMP over SockJS
- **ORM**: JPA/Hibernate
- **Caching**: Redis
- **Async**: Spring @Async with thread pool
- **Validation**: Spring Validation API

### Database & Cache
- **Database**: MySQL 8.1
- **Cache**: Redis 7
- **Migration**: JPA auto-DDL (development)

### DevOps & Infrastructure
- **Containerization**: Docker & Docker Compose
- **Base Images**: 
  - Frontend: node:20-alpine → nginx:alpine (multi-stage)
  - Backend: eclipse-temurin:21-jre-alpine (multi-stage)

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 20+ or Docker
- **Java** 21 (if running backend locally)
- **MySQL** 8.1 (if not using Docker)
- **Redis** 7 (if not using Docker)

### 5-Minute Docker Setup

```bash
# Clone repository
git clone https://github.com/yourusername/talento.git
cd talento

# Copy environment template
cp .env.example .env

# Start all services
docker-compose up -d

# Wait for services to be healthy (30-60 seconds)
docker-compose ps

# Application is ready
echo "Frontend:  http://localhost:5174"
echo "Backend:   http://localhost:8080"
echo "Database:  localhost:3307"
echo "Cache:     localhost:6379"
```

---

## 📦 Installation

### Option 1: Docker (Recommended)

**Requirements:**
- Docker 20.10+
- Docker Compose 2.0+

```bash
# Clone
git clone https://github.com/yourusername/talento.git
cd talento

# Setup environment
cp .env.example .env

# Build and start
docker-compose build
docker-compose up -d

# View logs
docker-compose logs -f frontend
docker-compose logs -f backend
```

### Option 2: Local Development

#### Frontend Setup

```bash
cd Talento/talento-frontend-fixed

# Install dependencies
npm install

# Set environment
echo "VITE_API_URL=http://localhost:8080" > .env.local

# Start dev server
npm run dev

# Production build
npm run build
npm run preview
```

#### Backend Setup

```bash
cd Talento/talento-backend-fixed

# Prerequisites: Java 21 installed
java -version

# Build with Maven
mvn clean install

# Run Spring Boot
mvn spring-boot:run

# Or run JAR
java -jar target/talento-1.0.0.jar
```

---

## ⚙️ Configuration

### Environment Variables

**Frontend** (`.env.local`):
```bash
VITE_API_URL=http://localhost:8080
REACT_ENV=development
```

**Backend** (`.env`):
```bash
# Database
DB_USERNAME=talento_user
DB_PASSWORD=your_secure_password

# JWT
JWT_SECRET=your_32_char_secret_key
JWT_EXPIRATION_MS=86400000

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:5174

# Environment
SPRING_PROFILES_ACTIVE=local
LOG_LEVEL=DEBUG
```

### Key Application Properties

**Backend** (`application.yml`):
```yaml
server:
  port: 8080
  servlet:
    context-path: /api

spring:
  datasource:
    url: jdbc:mysql://localhost:3306/talento
    username: ${DB_USERNAME}
    password: ${DB_PASSWORD}
  
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: false
  
  redis:
    host: ${REDIS_HOST}
    port: ${REDIS_PORT}
```

---

## 🏃 Running Locally

### Start Frontend Only

```bash
cd Talento/talento-frontend-fixed
npm install
npm run dev
# Access at http://localhost:5174
```

### Start Backend Only (Requires MySQL + Redis)

```bash
cd Talento/talento-backend-fixed
mvn spring-boot:run
# Access at http://localhost:8080
```

### Full Stack with Docker Compose

```bash
docker-compose up -d
# Frontend:  http://localhost:5174
# Backend:   http://localhost:8080
# Adminer:   http://localhost:8081
```

### Verify All Services

```bash
docker-compose ps
docker-compose logs --tail=20 frontend
docker-compose logs --tail=20 backend
```

---

## 🐳 Docker Setup

### Building Images

```bash
# Build all services
docker-compose build

# Build specific service
docker-compose build frontend
docker-compose build backend

# Build without cache
docker-compose build --no-cache
```

### Starting Services

```bash
# Start in background
docker-compose up -d

# Start with logs
docker-compose up

# Rebuild and start
docker-compose up -d --build
```

### Stopping Services

```bash
# Stop containers
docker-compose stop

# Stop and remove containers
docker-compose down

# Remove volumes too (careful!)
docker-compose down -v
```

### Viewing Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f frontend
docker-compose logs -f backend

# Recent 50 lines
docker-compose logs --tail=50
```

### Database Management

```bash
# Access MySQL
docker-compose exec db mysql -u root -p

# View database
USE talento;
SHOW TABLES;

# Backup database
docker-compose exec db mysqldump -u root -p talento > backup.sql

# Restore database
docker-compose exec -T db mysql -u root -p < backup.sql
```

---

## 📁 Project Structure

```
talento/
├── Talento/
│   ├── talento-frontend-fixed/          # React Frontend
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── components/          # React components
│   │   │   │   ├── screens/             # Page screens
│   │   │   │   ├── api/                 # API clients
│   │   │   │   ├── context/             # Global state
│   │   │   │   ├── hooks/               # Custom hooks
│   │   │   │   ├── types/               # TypeScript types
│   │   │   │   ├── data/                # Mock data
│   │   │   │   ├── App.tsx              # Root component
│   │   │   │   └── index.css            # Global styles
│   │   │   └── main.tsx
│   │   ├── public/                      # Static assets
│   │   ├── Dockerfile                   # Multi-stage build
│   │   ├── package.json
│   │   ├── vite.config.ts
│   │   ├── tsconfig.json
│   │   └── tailwind.config.js
│   │
│   ├── talento-backend-fixed/           # Spring Boot Backend
│   │   ├── src/main/java/com/talento/
│   │   │   ├── controller/              # REST endpoints
│   │   │   ├── service/                 # Business logic
│   │   │   ├── repository/              # Data access
│   │   │   ├── entity/                  # JPA entities
│   │   │   ├── config/                  # Spring configs
│   │   │   ├── security/                # JWT & auth
│   │   │   ├── util/                    # Utilities
│   │   │   └── TalentoApplication.java
│   │   ├── src/main/resources/
│   │   │   ├── application.yml          # Config
│   │   │   └── application-docker.yml   # Docker config
│   │   ├── pom.xml                      # Maven dependencies
│   │   ├── Dockerfile                   # Multi-stage build
│   │   └── .mvn/
│   │
│   └── docs/                            # Project documentation
│
├── docker-compose.yml                   # Docker orchestration
├── .env.example                         # Environment template
├── .gitignore                           # Git exclusions
├── README.md                            # This file
├── ARCHITECTURE.md                      # System design
├── SETUP.md                             # Setup guide
├── CONTRIBUTING.md                      # Contribution guide
└── LICENSE                              # MIT License
```

---

## 🏗 Architecture

### System Design

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (React)                      │
│              Vite + TypeScript + Tailwind                │
│                   WebSocket + Axios                      │
└────────────────────┬────────────────────────────────────┘
                     │ HTTP/WebSocket
                     │ Port 8080
┌────────────────────▼────────────────────────────────────┐
│                 Backend (Spring Boot)                    │
│        Java 21 + Spring Security + WebSocket            │
│            JWT Auth + CORS Protection                   │
└────────────────────┬──────────────────────┬─────────────┘
                     │                      │
            MySQL 8.1│                      │Redis 7
         Port 3306   │                      │Port 6379
         (Database)  │                      │(Cache)
```

### Data Flow

1. **Authentication**: 
   - User login → JWT token → stored in localStorage
   - Token included in all requests
   - Redis tracks token revocation

2. **Matching**:
   - User profile → skill analysis
   - Algorithm processes compatibility
   - Results cached in Redis

3. **Real-time Chat**:
   - WebSocket connection (STOMP)
   - Messages stored in MySQL
   - Notifications via WebSocket

4. **Session Management**:
   - Booking created → calendar update
   - Notifications sent
   - History tracked in database

---

## 📚 API Documentation

### Authentication Endpoints

```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh
POST /api/auth/logout
GET  /api/auth/verify
```

### User Endpoints

```
GET    /api/users/{id}
PUT    /api/users/{id}
POST   /api/users/{id}/skills
DELETE /api/users/{id}/skills/{skillId}
GET    /api/users/{id}/reviews
```

### Matching Endpoints

```
GET  /api/matches/recommended
GET  /api/matches/{id}
POST /api/matches/{id}/connect
```

### Chat Endpoints

```
GET  /api/conversations
GET  /api/conversations/{id}
POST /api/conversations/{id}/messages
GET  /api/conversations/{id}/messages
```

### Session Endpoints

```
POST /api/sessions
GET  /api/sessions/{id}
PUT  /api/sessions/{id}
POST /api/sessions/{id}/complete
```

---

## 💾 Database Schema

### Key Tables

**users**
```sql
- id (PK)
- email (UNIQUE)
- password_hash
- full_name
- bio
- avatar_url
- trust_score
- status
- created_at
- updated_at
```

**skills**
```sql
- id (PK)
- user_id (FK)
- name
- level (beginner/intermediate/advanced)
- verified
- endorsements
```

**matches**
```sql
- id (PK)
- user_id_1 (FK)
- user_id_2 (FK)
- match_score
- reason
- status
- created_at
```

**sessions**
```sql
- id (PK)
- match_id (FK)
- scheduled_at
- duration_minutes
- status
- notes
- rating
```

**messages**
```sql
- id (PK)
- conversation_id (FK)
- sender_id (FK)
- content
- read_at
- created_at
```

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

### Quick Start for Contributors

```bash
# 1. Fork the repository
# 2. Clone your fork
git clone https://github.com/yourusername/talento.git

# 3. Create a feature branch
git checkout -b feature/your-feature-name

# 4. Make changes and commit
git add .
git commit -m "feat: description of your feature"

# 5. Push and create PR
git push origin feature/your-feature-name
```

### Development Standards

- **TypeScript**: Strict mode enabled
- **Formatting**: Prettier configured
- **Linting**: ESLint configured
- **Testing**: Jest + React Testing Library (recommended)
- **Commit Messages**: Conventional commits format

---

## 🔒 Security

### Security Features

✅ JWT with secure tokens and refresh rotation  
✅ Password hashing with bcrypt  
✅ CORS origin validation  
✅ Rate limiting (120 req/min)  
✅ Security headers (HSTS, CSP, X-Frame-Options)  
✅ Input validation and sanitization  
✅ CSRF protection via state tokens  
✅ Token revocation tracking  
✅ Audit logging  
✅ OWASP password requirements  

### Reporting Security Issues

**DO NOT** open public issues for security vulnerabilities.

Email: security@talento.dev with:
- Description of vulnerability
- Steps to reproduce
- Potential impact

---

## 🚀 Deployment

### Production Environment Checklist

- [ ] All environment variables set securely
- [ ] JWT_SECRET is strong (32+ chars, random)
- [ ] Database backups configured
- [ ] SSL/TLS certificate installed
- [ ] CORS origins restricted to production domain
- [ ] Rate limiting configured
- [ ] Monitoring and logging enabled
- [ ] Error tracking (Sentry) integrated
- [ ] Database migrations reviewed

### Deploy to Render

```yaml
# render.yaml
services:
  - type: web
    name: talento-backend
    env: java
    buildCommand: mvn clean install
    startCommand: java -jar target/talento-1.0.0.jar
    envVars:
      - key: DATABASE_URL
        scope: all
      - key: JWT_SECRET
        scope: all
```

### Deploy to Vercel (Frontend)

```bash
vercel --prod
```

### Deploy to Railway/Render

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed guides.

---

## 🐛 Troubleshooting

### Docker Issues

**Port already in use:**
```bash
# Find process using port
lsof -i :8080
# Kill process
kill -9 <PID>
```

**Container won't start:**
```bash
docker-compose logs backend
docker-compose down -v
docker-compose up -d --build
```

**Database connection refused:**
```bash
# Wait for MySQL to be ready
docker-compose logs db
# Check MySQL is running
docker-compose exec db mysql -u root -p
```

### Frontend Issues

**Blank page or 404:**
```bash
# Clear cache
rm -rf node_modules/.vite
npm run dev
```

**API not connecting:**
```bash
# Check VITE_API_URL
echo $VITE_API_URL
# Verify backend is running
curl http://localhost:8080/api/health
```

### Backend Issues

**Compilation errors:**
```bash
mvn clean compile
mvn test
```

**Database migration issues:**
```bash
# Reset schema (development only!)
# Edit application.yml: ddl-auto: create
mvn spring-boot:run
```

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors & Contributors

- **Created for**: Full-stack skill exchange platform
- **Technologies**: React + Spring Boot + MySQL
- **Status**: Production-ready
- **Last Updated**: 2026

---

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by professional matching platforms
- Community feedback and contributions

---

## 📞 Support

- **Documentation**: [GitHub Wiki](https://github.com/yourusername/talento/wiki)
- **Issues**: [GitHub Issues](https://github.com/yourusername/talento/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/talento/discussions)

---

<div align="center">

**[⬆ back to top](#-talento---ai-powered-skill-exchange-platform)**

Made with ❤️ for the learning community

</div>
