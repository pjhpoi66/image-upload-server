## 🖼️ Nest.JS 이미지 업로드 서버

Nest.JS와 PostgreSQL을 사용하여 구현한 간단한 이미지 업로드 및 리소스 제공 서버입니다. 사용자는 특정 폴더를 지정하여 이미지를 업로드할 수 있으며, 업로드된 이미지는 정적 URL을 통해 접근할 수 있습니다.

## ✨ 주요 기능
동적 폴더 생성: 이미지 업로드 시 지정한 이름으로 폴더를 생성합니다.

- 이미지 파일 업로드: multipart/form-data 형식의 이미지 파일을 서버에 저장합니다.

- 리소스 서버: 업로드된 이미지를 정적 경로로 제공하여 웹에서 바로 접근할 수 있습니다.

- 환경 변수 관리: 데이터베이스 등 민감한 정보는 .env 파일을 통해 안전하게 관리합니다.

## 사전 요구 사항

- Node.js (v16 이상 권장)

- npm 또는 yarn

- PostgreSQL 데이터베이스

1. 프로젝트 설치

```bash
# Git 저장소 복제 (있을 경우)
# git clone [저장소 URL]
# cd [프로젝트 폴더]

# 의존성 패키지 설치
$ npm install
```

2. 환경변수 설정

```bash
# .env

# PostgreSQL Database
DB_HOST=localhost
DB_PORT=port
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_DATABASE=image_db
```

3. 애플리케이션 실행

```bash
# 개발 모드로 실행 (파일 변경 시 자동 재시작)
$ npm run start:dev

# 애플리케이션이 http://localhost:3000 에서 실행됩니다.
```

## API 사용법

### 이미지 업로드
지정한 폴더에 이미지를 업로드합니다.

- URL: /uploads

- Method: POST

- Content-Type: multipart/form-data

### Form Fields
- folder (Text): 이미지를 저장할 폴더 이름 (예: cats, landscapes)

- image (File): 업로드할 이미지 파일

### Response
- status: 201 Created
- body:
  {
  "message": "File uploaded successfully!",
  "filePath": "/uploads/cats/랜덤파일명.jpg"
  }
