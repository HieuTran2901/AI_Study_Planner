# 📘 AI Study Planner - Backend

## 🚀 Introduction
AI Study Planner Backend is a Spring Boot-based RESTful API that powers an intelligent learning platform.  
It provides features like AI-generated study plans, Pomodoro sessions, progress tracking, and AI assistant support.

---

## 🏗️ Tech Stack
- Java 17+
- Spring Boot
- Spring Security + JWT
- Spring Data JPA (Hibernate)
- MySQL / PostgreSQL
- Lombok
- MapStruct (optional)
- OpenAI / Gemini / Ollama (AI Integration)

---

## 🔐 Authentication
- Uses JWT (JSON Web Token)
- Flow:
  1. Login → returns access token & refresh token
  2. Send token in header:

Authorization: Bearer <token>

---

## 🌐 Base URL
/api/v1

---

## 📡 API Endpoints

### 1. Authentication & User

| Method | Endpoint | Description |
|--------|----------|------------|
| POST | /auth/register | Register |
| POST | /auth/login | Login |
| POST | /auth/refresh | Refresh token |
| GET | /auth/me | Get current user |
| PUT | /users/profile | Update profile |
| PUT | /users/preferences | Update learning preferences |

---

### 2. AI Study Plan

| Method | Endpoint | Description |
|--------|----------|------------|
| POST | /plans/generate | Generate AI study plan |
| GET | /plans | Get all plans |
| GET | /plans/{id} | Get plan detail |
| PUT | /plans/{id} | Update plan |
| DELETE | /plans/{id} | Delete plan |
| POST | /plans/{planId}/tasks/{taskId}/complete | Complete task |

---

### 3. Study Sessions (Pomodoro)

| Method | Endpoint | Description |
|--------|----------|------------|
| POST | /sessions | Create session |
| GET | /sessions | Get session history |
| GET | /sessions/today | Get today's sessions |
| GET | /sessions/stats | Get statistics |

---

### 4. Progress & Statistics

| Method | Endpoint | Description |
|--------|----------|------------|
| GET | /stats/overview | Overview stats |
| GET | /stats/subjects | Stats by subject |
| GET | /achievements | Achievements list |

---

### 5. AI Assistant

| Method | Endpoint | Description |
|--------|----------|------------|
| POST | /ai/chat | Chat with AI |
| POST | /ai/suggest | Suggest daily tasks |
| POST | /ai/analyze | Analyze progress |

---

### 6. Course Discovery

| Method | Endpoint | Description |
|--------|----------|------------|
| GET | /courses/recommend | Recommend courses |
| GET | /courses/search | Search courses |
| POST | /courses/{courseId}/enroll | Enroll course |

---

## 📦 Important DTOs

### RegisterRequest
{
  "email": "user@example.com",
  "password": "123456",
  "name": "John Doe"
}

### LoginRequest
{
  "email": "user@example.com",
  "password": "123456"
}

### PlanGenerateRequest
{
  "subject": "Backend Java",
  "goal": "Become Backend Developer",
  "level": "BEGINNER",
  "weeklyHours": 20
}

### AiChatRequest
{
  "message": "How should I learn Spring Boot?"
}

---

## ⚙️ Setup & Run

### 1. Clone repository
git clone https://github.com/your-username/ai-study-planner-backend.git
cd ai-study-planner-backend

### 2. Configure database (application.yml)

spring:
  datasource:
    url: jdbc:mysql://localhost:3306/aistudyplanner
    username: root
    password: 123456
  jpa:
    hibernate:
      ddl-auto: update

---

### 3. Run application
mvn spring-boot:run

---

## 🔒 Security (JWT)
- JwtAuthenticationFilter
- SecurityConfig
- Custom UserDetailsService
- JwtService

---

## 🧠 AI Integration
Supported providers:
- OpenAI
- Google Gemini
- Ollama (local AI)

Features:
- Generate study plans
- AI chat assistant
- Learning progress analysis

---

## 📈 Key Features
- Personalized study roadmap
- Pomodoro tracking
- Progress analytics
- AI-powered assistant
- Course recommendation

---

## 🚀 Future Improvements
- Notification system (study reminders)
- Social features (share plans)
- Mobile app (React Native / Flutter)
- Realtime tracking (WebSocket)

---

## 👨‍💻 Author
AI Study Planner Team

---

## 📄 License
MIT License
