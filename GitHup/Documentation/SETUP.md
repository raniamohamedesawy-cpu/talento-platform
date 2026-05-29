# 📋 Setup Guide - Talento

Complete step-by-step setup instructions for all environments.

---

## 🚀 Quick Setup (5 minutes with Docker)

### Prerequisites
- Docker 20.10+
- Docker Compose 2.0+
- Git

### Steps

```bash
# 1. Clone repository
git clone https://github.com/yourusername/talento.git
cd talento

# 2. Create environment file
cp .env.example .env

# 3. Start services
docker-compose up -d

# 4. Wait for health checks (30-60 seconds)
docker-compose ps

# 5. Access application
# Frontend:  http://localhost:5174
# Backend:   http://localhost:8080
```

✅ **Done!** All services running.

---

## 💻 Local Development Setup

### Prerequisites

**Node.js**
```bash
node --version  # Should be v20 or higher
npm --version   # Should be v10 or higher
```

**Java**
```bash
java -version   # Should be 21 or higher
mvn -version    # Maven 3.8+
```

**MySQL 8.1** (optional if using Docker for database)
```bash
mysql --version
```

**Redis** (optional if using Docker for cache)
```bash
redis-cli --version
```

### Frontend Setup

```bash
# Navigate to frontend
cd Talento/talento-frontend-fixed

# Install dependencies
npm install

# Create environment file
echo "VITE_API_URL=http://localhost:8080" > .env.local

# Start development server
npm run dev

# Output: http://localhost:5174
```

### Backend Setup

```bash
# Navigate to backend
cd Talento/talento-backend-fixed

# Ensure Java is installed
java -version

# Build project
mvn clean install

# Start Spring Boot
mvn spring-boot:run

# Or run as JAR
java -jar target/talento-1.0.0.jar

# Output: http://localhost:8080
```

### Database Setup (Local MySQL)

```bash
# 1. Start MySQL
# macOS: brew services start mysql
# Linux: sudo systemctl start mysql
# Windows: Use MySQL Workbench or XAMPP

# 2. Create database and user
mysql -u root -p << EOF
CREATE DATABASE talento;
CREATE USER 'talento_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON talento.* TO 'talento_user'@'localhost';
FLUSH PRIVILEGES;
EOF

# 3. Update .env
DB_USERNAME=talento_user
DB_PASSWORD=your_password

# 4. Update application.yml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/talento
```

### Redis Setup (Local)

```bash
# macOS
brew install redis
brew services start redis

# Linux
sudo apt-get install redis-server
sudo systemctl start redis-server

# Windows: Use WSL or Docker
docker run -d -p 6379:6379 redis:7

# Verify connection
redis-cli ping  # Should return PONG
```

---

## 🐳 Docker Detailed Setup

### Option 1: Docker Compose (All Services)

```bash
# 1. Clone and navigate
git clone https://github.com/yourusername/talento.git
cd talento

# 2. Create .env (copy from .env.example)
cp .env.example .env

# 3. Build images
docker-compose build

# 4. Start services
docker-compose up -d

# 5. Check status
docker-compose ps

# Output should show all containers as healthy:
# talento-frontend   ... (healthy)
# talento-backend    ... (healthy)
# talento-db         ... (healthy)
# talento-redis      ... (healthy)
```

### Option 2: Individual Docker Containers

```bash
# Start MySQL
docker run -d \
  --name talento-db \
  -e MYSQL_ROOT_PASSWORD=root \
  -e MYSQL_DATABASE=talento \
  -p 3306:3306 \
  mysql:8.1

# Start Redis
docker run -d \
  --name talento-redis \
  -p 6379:6379 \
  redis:7

# Start Backend
docker run -d \
  --name talento-backend \
  -e DB_HOST=talento-db \
  -e REDIS_HOST=talento-redis \
  -p 8080:8080 \
  talento-backend:latest

# Start Frontend
docker run -d \
  --name talento-frontend \
  -e VITE_API_URL=http://localhost:8080 \
  -p 5174:80 \
  talento-frontend:latest
```

### Docker Compose File Reference

```yaml
version: '3.8'
services:
  frontend:
    build: ./Talento/talento-frontend-fixed
    ports:
      - "5174:80"
    environment:
      - VITE_API_URL=http://localhost:8080

  backend:
    build: ./Talento/talento-backend-fixed
    ports:
      - "8080:8080"
    environment:
      - SPRING_DATASOURCE_URL=jdbc:mysql://db:3306/talento
      - SPRING_DATASOURCE_USERNAME=${DB_USERNAME}
      - SPRING_DATASOURCE_PASSWORD=${DB_PASSWORD}
      - REDIS_HOST=redis
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_healthy

  db:
    image: mysql:8.1
    ports:
      - "3307:3306"
    environment:
      - MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD}
      - MYSQL_DATABASE=talento
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5
```

---

## ⚙️ Environment Configuration

### Create .env File

```bash
cp .env.example .env
```

### Production Configuration

```bash
# Database (Use managed service in production)
MYSQL_ROOT_PASSWORD=strong_random_password
DB_USERNAME=talento_user
DB_PASSWORD=strong_random_password

# JWT (Generate secure secret)
JWT_SECRET=$(openssl rand -base64 32)
JWT_EXPIRATION_MS=86400000
JWT_REFRESH_EXPIRATION_MS=604800000

# CORS (Production domain)
CORS_ALLOWED_ORIGINS=https://talento.example.com

# Environment
SPRING_PROFILES_ACTIVE=production
NODE_ENV=production
REACT_ENV=production

# Security
SSL_ENABLED=true
RATE_LIMIT_PER_MINUTE=120
LOG_LEVEL=WARN
AUDIT_LOGGING=true

# Cache
REDIS_HOST=redis.example.com  # Managed Redis service
REDIS_PORT=6379

# API
VITE_API_URL=https://api.talento.example.com
```

### Generate Secure JWT Secret

```bash
# Linux/macOS
openssl rand -base64 32

# Or use Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

## 🔍 Verification Checklist

### After Initial Setup

- [ ] Frontend loads at http://localhost:5174
- [ ] Backend API responds at http://localhost:8080/api/health
- [ ] Database connected and tables created
- [ ] Redis connection established
- [ ] Can see login page
- [ ] No console errors in browser
- [ ] No errors in backend logs

### Health Checks

```bash
# Frontend health
curl http://localhost:5174

# Backend health
curl http://localhost:8080/api/health

# Database connection
docker-compose exec db mysql -u talento_user -p talento -e "SELECT 1"

# Redis connection
docker-compose exec redis redis-cli ping  # Should return PONG
```

---

## 📝 Database Initialization

### Automatic (Development)

Spring Boot automatically creates tables when `ddl-auto: update` is set.

```yaml
spring:
  jpa:
    hibernate:
      ddl-auto: update  # auto, create, create-drop, validate, update
```

### Manual (Production)

```bash
# Create schema
mysql -u root -p talento < schema.sql

# Verify tables
mysql -u talento_user -p talento -e "SHOW TABLES;"
```

### Seed Sample Data

```bash
mysql -u talento_user -p talento < seeds.sql
```

---

## 🧪 Testing Setup

### Frontend Tests

```bash
# Run tests
npm run test

# Run with coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

### Backend Tests

```bash
# Run all tests
mvn test

# Run specific test class
mvn test -Dtest=UserControllerTest

# With coverage
mvn test jacoco:report
```

---

## 🚨 Troubleshooting Setup

### Port Conflicts

```bash
# Find process using port 5174
lsof -i :5174
kill -9 <PID>

# Find process using port 8080
lsof -i :8080
kill -9 <PID>
```

### Docker Issues

```bash
# Clear Docker images
docker-compose down -v
docker system prune -a

# Rebuild from scratch
docker-compose build --no-cache
docker-compose up -d
```

### Database Issues

```bash
# Reset database (development only!)
docker-compose exec db mysql -u root -p -e "DROP DATABASE talento; CREATE DATABASE talento;"

# Backup database
docker-compose exec db mysqldump -u root -p talento > backup.sql

# Restore database
docker-compose exec -T db mysql -u root -p talento < backup.sql
```

### Node Modules Issues

```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Java Build Issues

```bash
# Clean Maven cache
mvn clean
rm -rf ~/.m2/repository

# Rebuild
mvn clean install
```

---

## 📚 Next Steps

After successful setup:

1. **Read** [README.md](README.md) for project overview
2. **Explore** [ARCHITECTURE.md](ARCHITECTURE.md) for system design
3. **Check** [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines
4. **Review** [API.md](API.md) for API documentation

---

## 💡 Quick Commands Reference

```bash
# Docker
docker-compose up -d              # Start
docker-compose down               # Stop
docker-compose logs -f frontend   # Logs

# Frontend
npm run dev                        # Dev server
npm run build                      # Production build
npm run lint                       # Linting

# Backend
mvn spring-boot:run              # Dev server
mvn test                          # Run tests
mvn clean install                 # Build

# Database
mysql -u talento_user -p talento  # Connect
SHOW TABLES;                       # List tables
SELECT * FROM users;              # Query
```

---

**Status: ✅ Setup Guide Complete**

Questions? Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md) or open an issue.
