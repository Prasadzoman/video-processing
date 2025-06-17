# 🎬 Video Processing Service

This is a full-featured backend service that handles video uploads, queues jobs for processing with FFmpeg, and returns processed downloadable formats like `.mp4` and `.webm`.

---

## 🚀 Features

- ✅ Video Upload (with size/type validation)
- 🧵 Job Queue using **Bull** and **Redis**
- 🛠️ Video Processing using **FFmpeg**
- 🔐 Authentication Middleware (JWT-based)
- 📥 Downloadable processed formats
- 📦 Organized using MVC pattern

---



---

## ⚙️ Tech Stack

- **Node.js** + **Express**
- **MongoDB** + **Mongoose**
- **Bull** + **Redis** for job queueing
- **Multer** for file uploads
- **Fluent-FFmpeg** for video processing

---

## 🧪 API Endpoints

### 🔐 Auth
- `POST /api/auth/register` – Register user
- `POST /api/auth/login` – Login user

### ⬆️ Upload
- `POST /api/upload` – Upload a video (authenticated)

### 📊 Status
- `GET /api/videos/status/:videoId` – Get video processing status

### ⬇️ Download
- `GET /api/download/:videoId/:format` – Download `mp4` or `webm` formats

---

