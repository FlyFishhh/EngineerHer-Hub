# 📘 EngineerHer Hub

## 🔹 Project Overview
**EngineerHer Hub** is a community platform designed for female engineers, supporting user registration, login, posting, commenting, liking, and notification features.  
The project follows a **frontend-backend separation architecture**, with React on the frontend, Spring Boot + MyBatis on the backend, and MySQL as the database.  

---

## 🔹 Tech Stack
- **Frontend**: React, Axios  
- **Backend**: Spring Boot 2.7.17, MyBatis 2.2.2, Maven 3.6.1  
- **Database**: MySQL 8.0  
- **Build Tools**: Maven, npm  
- **Others**: Google SMTP (for email verification codes)  

---

## 🔹 Features
- User registration & login (with email verification)  
- Posts, comments, likes, and favorites  
- Notifications (system messages + comment replies)  
- User profile management (avatar, nickname, bio)  
- RESTful API for frontend-backend communication  

---

## 🔹 Setup Instructions

### 1. Clone the project
```bash
git clone https://github.com/FlyFishhh/EngineerHer-Hub.git
cd EngineerHer-Hub
```

### 2. Start the backend
From the project root:
```bash
mvn clean install
mvn spring-boot:run
```

### 3. Start the frontend
Go into the frontend folder `boke2/`:
```bash
npm install
npm start
```

### 4. Configure the database
Edit backend configuration:
```
src/main/resources/application.properties
```
Create the database:
```sql
CREATE DATABASE tech_ladies;
```
Import the initialization SQL:
```sql
source sql/tech_ladies.sql;
```

### 5. Configure email verification
In `application.properties`, set:
```properties
spring.mail.from=your_gmail_address
spring.mail.password=your_app_password
```
> Note: `spring.mail.password` must be a **Google App Password**, not your regular Gmail password.  

---

## 🔹 Running the Project
- Backend default:  
  👉 `http://127.0.0.1:8789`  
- Frontend default:  
  👉 `http://localhost:3000`  
- Run packaged JAR:  
  ```bash
  java -jar target/Techladies-0.0.1-SNAPSHOT.jar
  ```

---

## 📂 Project Structure
```plaintext
EngineerHer-Hub/
├── boke2/                   # React frontend
│   ├── public/              # Static assets
│   ├── src/                 # Frontend source code
│   └── package.json         # Frontend dependencies
│
├── sql/                     # Database scripts
│   └── tech_ladies.sql
│
├── src/                     # Spring Boot backend
│   ├── main/
│   │   ├── java/com/...     # Backend source (Controller, Service, Mapper)
│   │   └── resources/       # Configs & MyBatis mappers
│   │       ├── application.properties
│   │       └── mapper/
│   └── test/                # Unit tests
│
├── target/                  # Backend build output
├── pom.xml                  # Maven config
└── README.md
```

---

## 🔹 Changelog
- ✅ Added: Detailed setup instructions (Maven, npm)  
- ✅ Improved: Database initialization with `tech_ladies` schema  
- ✅ Added: Gmail App Password configuration for email verification  

