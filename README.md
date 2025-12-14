# 이벤트 스케줄러 & 작업 관리자  
(Event Scheduler & Task Manager)

이 프로젝트는 **Node.js와 Express**를 사용하여 개발한 **웹 애플리케이션**으로,  
**이벤트 스케줄러(Event Scheduler)**와 **작업 관리자(Task Manager)** 기능을 하나의 시스템으로 통합한 프로젝트입니다.

본 프로젝트는 *Web Application Programming* 과목의 과제로 개발되었습니다.

사용자는 로그인 후 개인 이벤트, 작업(Task), 과목(Course)을 관리할 수 있으며,  
세션 기반 인증을 사용합니다.

---

## 주요 기능

### 인증 (Authentication)
- 회원가입 및 로그인
- Passport.js를 이용한 세션 기반 인증
- 로그인한 사용자만 접근 가능한 보호된 라우트

### 이벤트 스케줄러 (Event Scheduler)
- 이벤트 생성, 수정, 삭제
- 이벤트는 로그인한 사용자와 연결됨
- 이벤트는 날짜와 시간 기준으로 정렬되어 표시됨

### 작업 관리자 (Task Manager)
- 다음 정보를 포함한 작업 생성:
  - 제목
  - 설명
  - 마감일
  - 우선순위 (1–3)
  - 선택적 과목 연결
- 작업 완료 처리
- 전체 작업 목록 조회
- **대시보드에서 오늘 마감 작업만 표시**

### 과목 관리 (Course Management)
- 과목 추가 및 조회
- 작업을 과목과 연결 가능
- 다른 사용자의 과목에 작업을 연결하지 못하도록 소유권 검증 수행

### 대시보드 (Dashboard)
- **오늘 마감 작업 표시**
- 작업 및 이벤트 페이지로 빠른 이동 가능

### RESTful API
작업 관리를 위한 RESTful API 엔드포인트를 제공합니다:

- `GET /api/tasks`
- `GET /api/tasks/today`
- `POST /api/tasks`
- `PATCH /api/tasks/:id`
- `DELETE /api/tasks/:id`

모든 API는 인증된 사용자만 접근할 수 있습니다.

---

## 사용 기술

- Node.js
- Express.js
- MySQL
- Passport.js (Local Strategy)
- Nunjucks (템플릿 엔진)
- Express-session
- bcrypt
- Morgan

---

## 프로젝트 구조
```
.
├── app.js
├── config/
│ └── db.js
├── controllers/
│ └── eventController.js
├── middleware/
│ └── auth.js
├── models/
│ ├── User.js
│ ├── Event.js
│ ├── Task.js
│ └── Course.js
├── routes/
│ ├── auth.js
│ ├── page.js
│ ├── events.js
│ ├── tasks.js
│ ├── courses.js
│ ├── apiTasks.js
│ └── apiTimetable.js
├── views/
│ ├── layout.html
│ ├── login.html
│ ├── register.html
│ ├── dashboard.html
│ ├── events.html
│ ├── editEvent.html
│ ├── tasks.html
│ └── courses.html
├── public/
│ └── style.css
└── README.md

```
---

## 데이터베이스 설정

본 프로젝트는 **MySQL**을 사용합니다.

### 필수 테이블
- `users`
- `events`
- `courses`
- `tasks`

MySQL Workbench 또는 터미널에서 SQL 스키마를 실행하세요:

```bash
mysql -u <user> -p <database_name> < schema.sql
환경 변수 설정
```

프로젝트 루트에 .env 파일을 생성하세요:
```
PORT=3000
SESSION_SECRET=your-secret-key
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your-password
DB_NAME=your-database-name
```

.env 파일은 GitHub에 커밋하지 마세요.

설치 및 실행 방법
```
git clone https://github.com/AuroraJohansen/event-scheduler-and-task-manager.git
cd event-scheduler-and-task-manager
npm install
npm start
```

애플리케이션은 다음 주소에서 실행됩니다:
```
http://localhost:3000
```
협업 및 역할 분담

본 프로젝트는 두 명의 학생이 협업하여 개발되었습니다.

- 이벤트 스케줄러 & UI 통합
  - 이벤트 기능 구현
  - 프론트엔드 레이아웃 및 스타일링
  - 대시보드 로직
  -  전체 프로젝트 통합 및 구조 정리

- 작업 관리자 & API
  - 작업 및 과목 모델 구현
  - RESTful API 라우트 개발
  - 입력값 검증 및 소유권 검증

두 프로젝트를 하나의 Express 애플리케이션으로 통합하였습니다.

참고 사항

로그인한 사용자만 작업, 이벤트, 과목에 접근할 수 있습니다

대시보드에는 오늘 마감 작업만 표시됩니다

본 프로젝트는 학습 및 과제용으로 제작되었습니다

라이선스

본 프로젝트는 과제 및 학습 목적의 프로젝트입니다.
